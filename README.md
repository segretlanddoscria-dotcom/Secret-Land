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
