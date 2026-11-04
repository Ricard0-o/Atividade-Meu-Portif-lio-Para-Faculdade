# CP4 — Site pessoal de Ricardo Nelber

## Requisitos conferidos no Blackboard em 04/11/2026
Fonte: https://bb.cruzeirodosulvirtual.com.br/ultra/courses/_1170052_1/assessment/_23702939_1/attempt/_237013942_1?courseId=_1170052_1
Prazo: 17/11/2026 às 23h59 (Brasília).
- Versão final consolidada e tag `cp4-entrega`.
- Site HTTPS com todas as páginas, CSS, JavaScript e Bootstrap (mínimo três classes).
- Acessibilidade: contraste, textos alternativos, foco e teclado.
- Vídeo obrigatório entre 1min30 e 2min30: navegar no site publicado, demonstrar JavaScript, explicar evolução CP1–CP4, justificar layout, responsividade, acessibilidade e Bootstrap e explicar uso e revisão de IA.
- Entregar vídeo/arquivo, repositório com tag e site. Conferir links em janela anônima.
ATENÇÃO: segundo a atividade, ausência do vídeo zera todo o trabalho individual (2,0 pontos da A2).

## Prompt refinado de execução
Inspecione o portfólio existente e o enunciado oficial do CP4. Preserve a identidade visual e os dados pessoais já fornecidos. Consolide as cinco páginas; integre Bootstrap com ao menos três classes reais; corrija acessibilidade, navegação por teclado e validação. Verifique recursos, fluxos JavaScript e responsividade. Documente alterações e limitações, publique no GitHub Pages e identifique a versão por `cp4-entrega`. Prepare resposta de entrega e roteiro de dois minutos. A gravação deve ser feita por Ricardo, demonstrando seu próprio domínio; não invente vídeo, testes ou histórico. Deixe o envio final do Blackboard para Ricardo.

## Passo a passo
1. Ler requisitos e revisar estado do Git.
2. Corrigir código e integrar Bootstrap sem alterar a identidade visual.
3. Conferir páginas, acessibilidade, formulário, persistência e menu.
4. Documentar decisões, publicar e criar tag.
5. Ricardo revisa o código, grava o vídeo e disponibiliza o link.
6. Conferir os três links sem autenticação e enviar a atividade.

## Decisões e evidências no código
- Cinco páginas: início, currículo, formulário, multimídia e gráficos.
- `css/vendor/bootstrap-utilities.min.css`: Bootstrap 5.3.3, cópia local oficial, licença incluída no arquivo. Usamos somente utilitários; não há componente que exija o JS do Bootstrap.
- Classes `d-flex`, `align-items-center`, `justify-content-between` no cabeçalho de todas as páginas; `flex-wrap` e `gap-3` nas ações do formulário.
- `css/estilos.css`: identidade azul-marinho/dourado, grades adaptativas, foco visível, tema claro e redução de movimento.
- `js/scripts.js`: menu com Escape, tema em localStorage, formulário com erros associados aos campos e rascunho persistente. Validação rejeita espaços em campos obrigatórios.
- Formulário é uma demonstração local: não envia mensagens a servidor.
- Imagens de projetos: textos alternativos corrigidos para descrever as capturas reais.

## Evolução: confirmar ao preparar a fala
O Git disponível comprova a base do portfólio (639a32f), organização dos caminhos (a66fe59), cinco páginas (2994a44) e formulário/tema persistentes (ef6fe21, CP3). O CP4 consolida Bootstrap e correções finais. Os commits não identificam explicitamente CP1 e CP2: conferir os enunciados e suas entregas antes de atribuir uma mudança a cada checkpoint.

## IA e autoria
A IA auxiliou na revisão do HTML/CSS/JS, integração dos utilitários e elaboração desta documentação. Ricardo deve revisar os trechos, reproduzir as demonstrações e explicar apenas o que compreende. Não alegar revisão pessoal já concluída.
