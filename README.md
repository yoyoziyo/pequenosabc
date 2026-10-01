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

Cada produto é um item dentro de `data/products.json`. Para cadastrar um material, coloque a capa em `assets/products/` no formato WebP e adicione:

```json
[
  {
    "slug": "nome-do-material",
    "name": "Nome do material",
    "description": "Descrição clara do conteúdo e de como ele ajuda o educador.",
    "price": 7.9,
    "cover": "assets/products/nome-do-material.webp"
  }
]
```

Esses cinco campos são suficientes. A home, a busca, o carrinho e a página individual serão criados automaticamente.

Campos opcionais:

- `short`: texto menor para o card; se não existir, usa a descrição.
- `oldPrice`: preço anterior para mostrar uma oferta.
- `badge`: selo como “Novo”.
- `color`: cor usada caso ainda não exista uma capa.
- `keywords`: termos adicionais encontrados pela busca.
- `contents`: lista do que acompanha o material.

Para cadastrar mais de um produto, separe os objetos por vírgula dentro dos colchetes do JSON.

Depois de alterar o catálogo, execute `node scripts/generate-product-pages.js`. O gerador cria uma página estática para cada produto com título, descrição, preço e capa próprios para compartilhamento no WhatsApp e nas redes sociais.

Capas e prévias públicas ficam em `assets/products/`. PDFs pagos não devem ser enviados para este repositório público. A entrega é feita diretamente ao cliente após a confirmação do pagamento.

## Pedidos pelo WhatsApp

O cliente escolhe os materiais, abre o carrinho e clica em **Fazer compra pelo WhatsApp**. O site monta uma mensagem com o número do pedido, os produtos, os valores e o total. O atendimento, o envio da chave PIX, a confirmação e a entrega são feitos no WhatsApp.

O número de atendimento e o prefixo dos pedidos ficam em `data/store.json`.

## Evolução planejada

As áreas Pequenos Leitores, Pequenos Matemáticos, Pequenos Cientistas e Pequenos Mistérios estão registradas em `data/areas.json`, mas permanecem ocultas até existir uma coleção consistente para cada uma. O catálogo continua único e a busca encontra os materiais por tema.

O carrinho funciona no navegador e guarda os materiais escolhidos. No futuro, o fluxo poderá ganhar pagamento integrado, confirmação automática e links privados de entrega.

© 2026 PequenosABC.
