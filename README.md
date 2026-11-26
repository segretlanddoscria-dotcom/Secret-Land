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

## Novidades (Etapas 1 e 2)
- **Classes:** só Guerreiro, Clérigo, Lanceiro, Mago e Paladino no início; as demais são desbloqueadas na aventura (Status → Classes). Magias exclusivas por classe.
- **Reputação e títulos** (Status), com efeito nos diálogos, preços e pequenas vantagens.
- **Construção de base (menu → 🏗️ Construir):** casa, muro, fazenda, torre, ferreiro, mercado, quartel, igreja e castelo. Escolha a estrutura, toque no mapa (verde = válido) e confirme com ✔.
- **Vila (🏘️ Vila):** com 4 casas chegam viajantes pedindo para morar. Eles têm profissão (ferreiro, agricultor, comerciante, guarda, cozinheiro, padre), rotina (trabalham de dia, dormem em casa à noite), pagam impostos por dia e guardas e torres defendem a vila.
- **Estágios:** Acampamento → Pequena vila → Vila desenvolvida → Cidade → Grande reino. Na Vila desenvolvida dá para fundar o seu reino (200🪙).
- Camas permitem dormir à noite; altar da igreja dá bênção.
- Modo horizontal, toque para atacar e toque duplo para dash.

## Inventário e itens (atualização)
- Inventário compacto (grade 8 colunas + hotbar): **segure e arraste** um item para outro slot (como no Minecraft); se o destino tiver item, eles trocam de lugar. Funciona também entre inventário e hotbar.
- Novas armas craftáveis em 5 níveis (Madeira → Adamantita): arco, lança, martelo, adaga e cajado, cada um com alcance/dano/velocidade próprios. Segure na hotbar para usar.
- Ferramentas: enxada (cria plantações), vara de pesca (peixes comuns e raros), bússola, calendário, cama e fogueira.
- Poções: vida maior, regeneração, resistência, fogo, XP e invisibilidade; encantos de arma (fogo, gelo, raio, veneno, vida); comidas (ensopado, torta, peixe assado); livros antigos com lendas.
- A aba Fabricar agora tem categorias.
- **Dar itens a amigos (online):** no inventário, toque no item → *Dar a um amigo* → 1 ou Tudo. O item sai da sua mochila e chega na do amigo.

## Etapa 3 (correções e visual)
- **Casas e construções corrigidas:** a porta agora é passável (dá para entrar e sair), o interior tem **chão** (madeira nas casas, ferreiro e mercado; pedra no quartel, igreja e castelo) e as paredes foram redesenhadas em pixel art (tábuas de madeira, tijolos de pedra com ameias, porta em arco, cama, altar).
- Construções antigas são consertadas automaticamente ao carregar o jogo (chão e porta).
- **Ícones em pixel art** para armas, ferramentas, comidas, poções, minérios, lingotes, materiais, livros e artefatos (inventário, hotbar, loja, receitas e item na mão).
- **Online mais estável:** código de sala duplicado é refeito sozinho, reconexão automática com o servidor, tempo limite ao entrar, mensagens de erro claras, botão **Sair da sala** e proteção contra mensagens inválidas.
- Lembrete: o `sw.js` foi para a versão `v7` para os celulares baixarem a atualização.

## Personagens e mundos separados
- Menu inicial: **👤 Novo personagem** (cria só o herói), **🌍 Novo mundo** (nome + seed) e depois escolha um personagem e um mundo e toque em **▶ Jogar**.
- O progresso (nível, itens, construções) é guardado por combinação personagem + mundo. O mesmo personagem pode entrar em vários mundos, cada um com seu próprio progresso.
- Cada lista tem seu botão **🗑️**: excluir personagem (apaga o progresso dele em todos os mundos) ou excluir mundo (apaga as construções e o progresso nele; os personagens continuam). A confirmação é própria do jogo, então funciona também dentro de apps e navegadores que bloqueiam janelas de confirmação.
- Jogos salvos antes desta atualização são convertidos automaticamente em um personagem + um mundo.
- No modo online, quem entra numa sala usa o personagem selecionado no menu.

## Cooldown de armas, mana e stamina
- Toda arma tem **cooldown próprio** (adaga rápida, martelo lento) e cada ataque **gasta recurso**.
- **Magos, clérigos, necromantes, invocadores e contratadores** usam **mana (barra azul)**. As outras classes (guerreiro, lanceiro, paladino, etc.) usam **stamina (barra laranja)**.
- Logo abaixo da barra de vida: a barra azul/laranja do recurso e uma fina barra branca que mostra o cooldown da arma. Sem recurso suficiente o ataque não sai ("Sem mana!" / "Sem stamina!").
- O recurso volta sozinho depois de uma breve pausa nos ataques e o máximo cresce com o nível. As habilidades (botões de skill) continuam com seus próprios cooldowns.

## Rolagem no inventário
- O inventário e todas as abas do painel agora **rolam para baixo/cima** com o dedo (deslize em qualquer lugar, inclusive sobre os slots), com a roda do mouse e com a barra de rolagem dourada.
- Para mover um item: **segure ~0,25s** no slot (vibra e o slot acende) e arraste. Deslizar rápido rola a lista.
- A posição da rolagem é mantida ao selecionar itens, usar ou largar; ao trocar de aba volta ao topo.
- `sw.js` foi para a versão `v12`.

## Mega atualização — Etapa 1: Eventos dinâmicos
- Todo dia o mundo sorteia um evento para aquela noite/dia. **Converse com os moradores** para receber o aviso (ex.: Jack: "A noite será muito ruim hoje...").
- 🩸 **Lua de Sangue:** tela avermelhada, mais monstros, mais fortes (vida +50%, dano +40%, XP em dobro) e moedas extras; 4% de chance de monstro **Elite** (👑) com recompensa grande. Moradores ficam assustados. Sobreviver até o amanhecer dá +1 de reputação.
- 🎃 **Halloween:** no dia 30 de Outubro a Lua de Sangue vira a Noite de Halloween.
- ☄️ **Chuva de meteoros (noite):** meteoros caem perto de você por ~50s; chegue perto para pegar fragmentos de minério raro.
- ⚔️ **Invasão de monstros (dia):** hordas aparecem ao redor por ~45s e deixam moedas.
- O evento ativo aparece no HUD, e o progresso é salvo junto com o mundo. `sw.js` → `v13`.

### Já existia antes (não foi refeito)
Classes iniciais/secretas, reputação, títulos, construção de base, vila e estágios, calendário e estações, clima, pesca, ovos, bosses de masmorra, masmorras, online.

### Próximas etapas planejadas
2. Merlin e combinação de magias • 3. Raças e altura • 4. Profissões e Guilda dos Caçadores • 5. Companheiros, ovos de dragão e montarias • 6. Reinos prontos com rotinas e guerras • 7. Novos biomas, portais e chefes mundiais.

## Pescaria melhorada
- **Fisgada com timing:** lance a linha na água; quando aparecer ❗ (vibra no celular), **toque na água ou na vara da hotbar** para puxar. Puxar cedo demais cancela; demorar deixa o peixe escapar.
- **Água funda x rasa:** água rasa dá camarão, truta, peixe comum e enguia (só à noite); água funda dá baiacu, lula, polvo e lagosta, além do raro **filhote de tubarão** 🦈.
- **Nível de pesca (até 20):** quanto mais pesca, menos espera e mais chance de raros. Chuva e tempestade fisgam mais rápido.
- **Surpresas:** baú do fundo (moedas, equipamento, às vezes livro) e bota velha.
- **Diário de pesca** na aba Status, com as espécies descobertas.
- **Vara de aço** (vara reforçada + 2 lingotes de aço): mais raros e janela de puxar maior. Os novos peixes podem ser assados na fornalha/fogueira e vendidos.
- `sw.js` → `v14`.

## Correção: "scr is not defined"
- Os botões do menu agora ficam disponíveis no escopo global (`window`) mesmo em visualizadores que isolam o script (como a prévia de arquivo dentro de apps). Se o erro aparecer de novo, abra o jogo pelo link do GitHub Pages no navegador (Chrome). `sw.js` → `v15`.

## Peixes em pixel art e controles menores
- Todos os peixes novos (camarão, truta, enguia, baiacu, lula, polvo, lagosta, filhote de tubarão), além do peixe comum, dourado e assado, e a bota velha agora têm **ícone em pixel art** próprio. A vara muda a cor do carretel conforme o nível.
- **Controles menores:** tamanho padrão dos botões reduzido (de 115% para 75%) e opacidade 70%; o HUD de texto ficou menor; botões de dash/usar item ficaram ao lado do ataque sem se sobrepor, e Mochila/Config abaixo do minimapa. Quem já tinha o layout salvo tem o layout resetado uma vez para os novos padrões. Ainda dá ajustar em Config (Tamanho dos botões / Editar posição). `sw.js` → `v16`.

## Dash corrigido e botão de auto-ataque
- **Dash em movimento:** o botão 💨 agora responde ao toque na hora, mesmo com o outro dedo segurando o joystick (antes dependia de "clique", que o celular ignora no segundo dedo). O dash sai na direção em que você está andando; parado, sai para onde você estava virado. O mesmo vale para os botões de habilidade e ✋ Usar item.
- **🤖 Botão de auto-ataque:** liga/desliga o "atacar sozinho inimigos por perto" direto na tela (verde = ligado, cinza/vermelho = desligado). Também dá para mudar em Config e o botão pode ser movido/redimensionado em "Editar posição". `sw.js` → `v17`.

## Correção: erro ao construir casas
- Corrigido o travamento (`Cannot read properties of undefined (reading '2'/'3')`) que acontecia ao construir uma casa: o **chão** das construções (casa, ferreiro, mercado, quartel, igreja, castelo) não tinha desenho e, além disso, tocar em chão, paredes, portas ou camas era tratado como se fosse minério. Agora o chão é desenhado normalmente e toques em paredes/portas/camas funcionam (paredes e portas podem ser quebradas, como descrito acima). Esse erro já existia antes das atualizações recentes. `sw.js` → `v18`.

## 📦 Baú compartilhado (online)
- Novo item em **Construir → Baú compartilhado 📦** (10 tábuas + 2 lingotes de ferro, 1x1). Ele aparece para todos os amigos da sala (como os outros blocos).
- **Toque no baú** para abrir: guarde e retire itens (1 ou tudo). Todos os jogadores da sala veem e usam o **mesmo conteúdo**, atualizado na hora quando um amigo guarda ou pega algo.
- O conteúdo fica salvo no mundo do **host**. Offline, funciona como um baú pessoal. Dica: não dá para quebrar o baú (seus itens ficam seguros). Equipamentos equipados/na bolsa de equipamentos não vão no baú, apenas itens da mochila. `sw.js` → `v19`.

## Portas de verdade e desmontar a casa
- **Portas automáticas:** a porta agora fica **fechada e sólida**; abre sozinha quando você (ou um morador) chega perto e fecha 2s depois que ninguém está por perto. **Monstros não atravessam portas fechadas**, então a casa protege de verdade (ótimo na Lua de Sangue).
- **Drops ao quebrar:** parede de madeira → 🪵, parede de pedra → 🪨, **porta → 2 tábuas**, torre/canto → 2 pedras.
- **Móveis:** segure uma **picareta ou machado** e toque para desmontar: **cama → devolve a cama**, fornalha → devolve a fornalha, banca de mercado → 4 tábuas, estante do quartel → 2 pedras, altar da igreja → 6 pedras + 15 moedas. Sem ferramenta, o toque continua usando o móvel (dormir, bênção, fornalha). `sw.js` → `v20`.

## Menu bonito e porta que abre/fecha
- **Título do menu redesenhado:** cristal em pixel art, letras SECRET (roxo) e LAND (dourado) com brilho que passa, divisor com losango, faixa com o subtítulo, estrelinhas piscando, brilho de fundo e brasas subindo. (Respeita o modo "reduzir movimento" do aparelho.) O nome oficial continua **Secret Land**.
- **Porta manual:** toque na porta (sem picareta/machado na mão) para **abrir** (fica aberta) e toque de novo para **fechar 🔒** (fica trancada: não abre sozinha, protege a casa). Segure picareta ou machado para quebrar a porta (cai 2 tábuas). Sem toque, ela continua abrindo sozinha quando você chega perto, se não tiver sido fechada manualmente. `sw.js` → `v21`.

## v22 — Atualização de bugs
- Menu: não corta mais (título e botões cabem em telas baixas; rola se preciso). Título refeito em pixel art.
- Painéis: botões ▲ ▼ e ⏬ (ir ao final) para rolar, com repetição ao segurar.
- Online: o host compartilha dia/noite, clima, eventos, monstros e animais; guests atacam e recebem dano/drops pelo host.
- Eventos bem mais raros (mín. 6 dias entre eventos). Lua de Sangue avermelha a tela; meteoros caem em chamas e deixam crateras/chão queimado (toque para limpar).
- Minérios: cores novas, visual pixel art e 6 novos (Estanho, Prata, Ametista, Safira, Topázio, Obsidiana); afloramentos nas montanhas.
- Cama define o ponto de renascimento.
- Hitbox: só o tronco de árvores/pedras/cactos bloqueia; tocar na copa seleciona a árvore.
- Tochas podem ser fixadas em paredes de casa (segure a tocha e toque na parede); piso da casa quebra com o Machado.
- Habilidades: todas bloqueadas no início. Nv 10 (rank D) libera a 1ª da classe; Nv 25 (C) a 1ª da raça; Nv 45 (B) a 2ª da classe; Nv 65 (A) a 2ª da raça; Nv 85 (S) a 3ª da raça. Dano, cura, buffs e invocações rebalanceados (custam mana/stamina).
- Efeitos de habilidades e eventos desenhados em baixa resolução (pixel art).
- sw.js: cache v22.
