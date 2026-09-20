# Portfólio Luciano P. de Moura — v10

Site estático (HTML, CSS e JavaScript puros). Não precisa de build.

## Estrutura

```
index.html            página única: projetos, como trabalho, competências, formação, contato
dashboard.html        painel de formação (totais calculados)
css/style.css         estilos das duas páginas
js/main.js            menu, compartilhar, destaque de seção
js/analytics.js       contagem de acessos no Firestore (respeita DNT/GPC)
js/dashboard.js       renderiza o painel
js/formacao-data.js   dados da formação (edite só este arquivo)
firestore.rules       bloco de regras para MESCLAR no projeto Firebase
favicon.svg  robots.txt  sitemap.xml
```

Coloque na mesma pasta os arquivos que já existem no site: `cognivus.mp4` e `luciano.jpg`.
Para testar localmente, abra com uma extensão de servidor local (ex.: Live Server) ou `python3 -m http.server`.

## O que mudou e por quê

**Conteúdo**
- Novo título: "Do problema jurídico ao sistema no ar", com descrição objetiva do que você faz.
- Nova seção **Projetos**, com as 4 aplicações reais da Cognivus e link para cada uma. Antes, o portfólio não mostrava nenhum projeto.
- **Barras de porcentagem removidas.** Elas se contradiziam (Direito 100% e Direito/LGPD 20%; "Privacy by Design 100%"). Entrou uma tabela "o que faço / evidência", ligada aos cursos e projetos reais.
- Tom ajustado: sai "substituindo a fragmentação de equipes", entra "assumo um produto do começo ao fim e me integro a equipes quando o escopo pede".
- Direito e Jurimetria aparecem como **em andamento**, coerente com o painel.
- Contato claro (LinkedIn, GitHub, Consultoria Cognivus).

**Dashboard**
- Os KPIs antigos não batiam com a lista (64+ formações e 9.540h no topo; 43 itens e cerca de 10.200h nos dados; 910h e 860h de imersão). Agora os totais são calculados dos dados.
- As 3.700h de Direito e as 420h da pós, ainda em andamento, deixaram de contar como carga acumulada.
- Horas de prática autodeclarada são mostradas separadas das horas certificadas.
- O bloco "Diagnóstico Executivo: Perfil Disruptivo" virou "Como ler este painel", que explica os critérios.
- A duração do estágio, que aparecia como "horas: Taubaté-SP", virou um campo próprio.

**Técnico, acessibilidade e privacidade**
- Corrigido o `<<li>` do menu antigo.
- Página única com âncoras (antes o conteúdo ficava atrás de abas em JavaScript, ruim para busca e compartilhamento).
- Sem Google Fonts nem Font Awesome: fontes do sistema e ícones inline. Isso melhora a velocidade e sustenta a promessa de privacidade.
- Link de pular para o conteúdo, foco visível, alvos de toque de 44px, `prefers-reduced-motion`, contraste acima de 8:1, vídeo com controles.
- `<details>` nativo no painel (teclado e leitor de tela funcionam sem JS).
- Efeito de máquina de escrever removido (acessibilidade) e uma única animação de entrada.
- SEO: meta description, Open Graph, JSON-LD (Person), canonical, sitemap e robots.
- Analytics: corrigido o `try/catch` que não capturava a rejeição da Promise, adicionado respeito a DNT/GPC e aviso no rodapé.

## O que só você pode completar (maior impacto primeiro)

1. **Capturas de tela e stack de cada projeto.** Para cada aplicação, adicione uma imagem e uma linha de "problema, solução, tecnologia". Não inventei stack por projeto porque não tenho como confirmar.
2. **Um resultado mensurável por projeto**, se existir (usuários, horas economizadas, questões respondidas). Sem número inventado, melhor nenhum.
3. **Descrições do CoreMaster e do Axion Rhetorical.** O hub da Cognivus as descreve de forma genérica; escrevi o texto com base nisso. Confira e detalhe.
4. **Imagem de compartilhamento** `og-image.png` (1200x630) na raiz. O LinkedIn a usa ao compartilhar o link (você tem um botão Compartilhar).
5. **E-mail ou formulário de contato** direto, se quiser um canal além do LinkedIn.
6. **Dois itens do painel estão vagos** e podem gerar perguntas: "Auditoria de Qualidade e Processos, 80h, Certificações internas" e "Arquitetura de microsserviços e APIs para IA, 180h, Curso técnico". Diga o que foram (curso, instituição ou projeto) ou reclassifique.
7. **"88+ projetos HTML"**: aponte para um repositório ou pasta no GitHub onde o leitor possa ver.
8. **Sobre o título "Arquiteto de Software"**: usei "desenvolvedor". Volte ao antigo só quando houver diagramas e decisões de arquitetura documentados em pelo menos um repositório.
9. Confirme a frase "me integro a equipes quando o escopo pede" (seção Como trabalho): ela precisa refletir a sua realidade.

## Firebase: segurança

A configuração web do Firebase em `js/analytics.js` **não é um segredo**; é normal ela ficar pública. O que protege o banco são as **Regras de Segurança do Firestore**.

- Use o bloco de `firestore.rules` para `visitas_site` (só permite criar um documento com `pagina` e `data_acesso`).
- O projeto `cognivus-platform` é compartilhado com outras aplicações. **Mescle** o bloco às regras atuais e teste no Playground de regras antes de publicar. Não substitua tudo, ou você pode derrubar outros apps.
- Considere ativar o **Firebase App Check** para limitar escrita a seus domínios.

## Arquivos enviados que não foram usados

`style.css` e `script.js` (página de "manifesto" com player, GSAP, 63 imagens e 25 GIFs) não são referenciados por `index.html` nem por `dashboard.html`. Se pertencem a outra página, mantenha-os lá e não os publique junto com este portfólio, para não carregar peso desnecessário.

## Deploy

Suba a pasta como está no GitHub e publique no Vercel (ou GitHub Pages). O domínio `luciano.cognivus.com.br` continua apontando para o mesmo projeto.
