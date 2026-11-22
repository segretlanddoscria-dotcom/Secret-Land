// Servidor do "Vila em Chamas" — serve o jogo (pasta public/) e faz o multiplayer por WebSocket.
// Sem dependências: precisa só do Node 18 ou mais novo.   Rodar:  node server.js
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = +process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');
const MAX_PLAYERS = 3, MAX_ROOMS = 500, TICK_MS = 60, MAX_MSG = 4096, MAX_PRES = 2600, MAX_MSGS_PER_SEC = 40;
const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.css': 'text/css' };

// ---------- HTTP (arquivos estáticos) ----------
const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('ok'); }
  let u; try { u = decodeURIComponent(req.url.split('?')[0]); } catch (_) { res.writeHead(400); return res.end(); }
  if (u.endsWith('/')) u += 'index.html';
  const f = path.normalize(path.join(ROOT, u));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => {
    if (e) { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('404'); }
    res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(d);
  });
});

// ---------- WebSocket mínimo (RFC 6455) ----------
function frame(op, payload) {
  const b = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  let h;
  if (b.length < 126) h = Buffer.from([0x80 | op, b.length]);
  else if (b.length < 65536) { h = Buffer.alloc(4); h[0] = 0x80 | op; h[1] = 126; h.writeUInt16BE(b.length, 2); }
  else { h = Buffer.alloc(10); h[0] = 0x80 | op; h[1] = 127; h.writeBigUInt64BE(BigInt(b.length), 2); }
  return Buffer.concat([h, b]);
}
const send = (c, obj) => { if (!c.dead) { try { c.sock.write(frame(1, JSON.stringify(obj))); } catch (_) { drop(c); } } };

const rooms = new Map();           // código -> { clients:Set, dirty:boolean }
const clients = new Set();

function drop(c) {
  if (c.dead) return; c.dead = true; clients.delete(c);
  try { c.sock.destroy(); } catch (_) {}
  if (c.room) { const r = rooms.get(c.room); if (r) { r.clients.delete(c); r.dirty = true; if (!r.clients.size) rooms.delete(c.room); } }
}

function onMessage(c, text) {
  let m; try { m = JSON.parse(text); } catch (_) { return; }
  if (!m || typeof m !== 'object') return;
  if (m.t === 'join') {
    if (c.room) return;
    const code = String(m.room || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'vila';
    let r = rooms.get(code);
    if (!r) { if (rooms.size >= MAX_ROOMS) { send(c, { t: 'full' }); return drop(c); } r = { clients: new Set(), dirty: false }; rooms.set(code, r); }
    if (r.clients.size >= MAX_PLAYERS) { send(c, { t: 'full' }); return drop(c); }
    c.room = code; c.id = crypto.randomBytes(4).toString('hex'); c.p = {};
    r.clients.add(c); r.dirty = true;
    send(c, { t: 'joined', id: c.id, n: r.clients.size });
  } else if (m.t === 'pres') {
    if (!c.room || !m.p || typeof m.p !== 'object' || Array.isArray(m.p)) return;
    const merged = Object.assign({}, c.p, m.p);
    let s; try { s = JSON.stringify(merged); } catch (_) { return; }
    if (s.length > MAX_PRES) return;
    c.p = JSON.parse(s);
    const r = rooms.get(c.room); if (r) r.dirty = true;
  }
}

function parse(c) {
  for (;;) {
    const b = c.buf; if (b.length < 2) return;
    const fin = (b[0] & 0x80) !== 0, op = b[0] & 0x0f, masked = (b[1] & 0x80) !== 0;
    let len = b[1] & 0x7f, off = 2;
    if (len === 126) { if (b.length < 4) return; len = b.readUInt16BE(2); off = 4; }
    else if (len === 127) { if (b.length < 10) return; const big = b.readBigUInt64BE(2); if (big > BigInt(MAX_MSG)) return drop(c); len = Number(big); off = 10; }
    if (!masked || len > MAX_MSG || !fin) return drop(c);               // clientes sempre mascaram; sem fragmentação
    if (b.length < off + 4 + len) return;
    const mask = b.subarray(off, off + 4), data = Buffer.from(b.subarray(off + 4, off + 4 + len));
    for (let i = 0; i < data.length; i++) data[i] ^= mask[i & 3];
    c.buf = b.subarray(off + 4 + len);
    c.seen = Date.now();
    if (op === 8) { try { c.sock.write(frame(8, Buffer.alloc(0))); } catch (_) {} return drop(c); }
    if (op === 9) { try { c.sock.write(frame(10, data)); } catch (_) {} continue; }
    if (op === 10) continue;
    if (op === 1) {
      const now = Date.now(); if (now - c.win > 1000) { c.win = now; c.cnt = 0; }
      if (++c.cnt > MAX_MSGS_PER_SEC) continue;                          // limite de mensagens por segundo
      onMessage(c, data.toString('utf8'));
    } else return drop(c);
  }
}

server.on('upgrade', (req, sock) => {
  const key = req.headers['sec-websocket-key'];
  if (!key || String(req.headers.upgrade).toLowerCase() !== 'websocket') { sock.destroy(); return; }
  const accept = crypto.createHash('sha1').update(key + GUID).digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.setNoDelay(true);
  const c = { sock, buf: Buffer.alloc(0), room: null, id: '', p: {}, dead: false, seen: Date.now(), win: 0, cnt: 0 };
  clients.add(c);
  sock.on('data', d => { c.buf = Buffer.concat([c.buf, d]); if (c.buf.length > MAX_MSG * 2) return drop(c); parse(c); });
  sock.on('close', () => drop(c)); sock.on('error', () => drop(c));
  setTimeout(() => { if (!c.room) drop(c); }, 10000);                    // quem não entra em sala em 10s é desconectado
});

// ---------- difusão da sala (10x por segundo, só quando algo mudou) ----------
setInterval(() => {
  for (const r of rooms.values()) {
    if (!r.dirty) continue; r.dirty = false;
    const peers = [...r.clients].map(c => ({ id: c.id, p: c.p }));
    for (const c of r.clients) send(c, { t: 'peers', peers });
  }
}, TICK_MS);
// batimento: derruba conexões mortas
setInterval(() => {
  const now = Date.now();
  for (const c of [...clients]) { if (now - c.seen > 60000) drop(c); else { try { c.sock.write(frame(9, Buffer.alloc(0))); } catch (_) { drop(c); } } }
}, 25000);

server.listen(PORT, () => console.log('Vila em Chamas rodando em http://localhost:' + PORT));
