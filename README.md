# Secret Land

RPG 2D de mundo aberto em pixel art, em um único arquivo (`index.html`). Funciona no celular e no PC.

## Publicar no GitHub Pages
1. Crie um repositório novo no GitHub (ex.: `secret-land`).
2. Envie `index.html` e `README.md` para a raiz (Add file → Upload files).
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Abra `https://SEU-USUARIO.github.io/secret-land/`.

## Jogar online (até 3 jogadores)
Usa PeerJS (WebRTC), então precisa de internet e da página aberta por `https` (GitHub Pages serve).
- Host: entre em um mundo → menu `— — —` → **Online** → *Criar sala* e passe o código.
- Amigos: no menu inicial → **Online** → digite o código → *Entrar na sala*.
- Sincroniza jogadores e blocos quebrados. Monstros e itens são individuais.

## Seeds
Cada seed gera um mundo diferente (biomas, mares, estruturas). Seeds iguais geram o mesmo mundo.

## Instalar como app (PWA)
Depois de publicar no GitHub Pages, abra o link no celular:
- **Android (Chrome):** menu ⋮ → **Instalar app** (ou *Adicionar à tela inicial*).
- **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.
- **PC (Chrome/Edge):** ícone de instalar na barra de endereço.

O app abre em tela cheia, na horizontal, com o ícone do Secret Land, e funciona offline (o modo online precisa de internet).

### Arquivos que precisam estar juntos na raiz do repositório
`index.html`, `manifest.json`, `sw.js`, `icon-180.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`

### Gerar APK (opcional, para Play Store ou instalar fora do navegador)
Entre em https://www.pwabuilder.com, cole o link do seu GitHub Pages e escolha **Android**. Ele gera o APK/AAB a partir deste mesmo PWA.

### Atualizações
Ao mudar o jogo, aumente o número em `const V='secret-land-v1'` no `sw.js` (ex.: `v2`) para que os celulares baixem a versão nova.
Jogo online
