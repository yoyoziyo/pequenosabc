# PequenosABC

Loja estática de materiais pedagógicos digitais, preparada para funcionar diretamente no GitHub Pages.

## Estrutura

- `index.html`: página inicial e vitrine completa.
- `produto.html`: página individual preenchida pelo produto selecionado.
- `data/products.json`: cadastro central de produtos.
- `js/`: busca, montagem dos cards e página individual.
- `css/style.css`: todo o visual responsivo.
- `pages/`: páginas institucionais e legais.
- `assets/`: logotipo, ícones SVG e imagens WebP.

## Adicionar um produto

Duplique um item dentro de `data/products.json`, escolha um `slug` único e preencha seus dados. A home, a busca e a página individual passarão a usar o novo produto automaticamente.

Capas e prévias públicas podem ser colocadas em `assets/products/<slug>/`. PDFs pagos não devem ser enviados para este repositório público; futuramente ficarão em armazenamento privado e serão liberados após o pagamento.

© 2026 PequenosABC.
