# PequenosABC

Loja estática de materiais pedagógicos digitais, preparada para funcionar diretamente no GitHub Pages.

## Estrutura

- `index.html`: página inicial e vitrine completa.
- `produto.html`: página individual preenchida pelo produto selecionado.
- `data/products.json`: cadastro central de produtos.
- `data/areas.json`: planejamento das futuras coleções “Pequenos…”. Áreas com `status: planned` não aparecem no site.
- `js/`: busca, montagem dos cards e página individual.
- `css/style.css`: todo o visual responsivo.
- `pages/`: páginas institucionais e legais.
- `assets/`: logotipo, ícones SVG e imagens WebP.

## Adicionar um produto

Duplique um item dentro de `data/products.json`, escolha um `slug` único e preencha seus dados. A home, a busca, o carrinho e a página individual passarão a usar o novo produto automaticamente.

Capas e prévias públicas podem ser colocadas em `assets/products/<slug>/`. PDFs pagos não devem ser enviados para este repositório público; futuramente ficarão em armazenamento privado e serão liberados após o pagamento.

## Evolução planejada

As áreas Pequenos Leitores, Pequenos Matemáticos, Pequenos Cientistas e Pequenos Mistérios estão registradas em `data/areas.json`, mas permanecem ocultas até existir uma coleção consistente para cada uma. O catálogo continua único e a busca encontra os materiais por tema.

O carrinho já funciona no navegador e guarda os materiais escolhidos. A finalização permanece claramente desativada até a integração do pagamento, da confirmação e dos links privados de entrega.

© 2026 PequenosABC.
