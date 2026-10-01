const fs = require("node:fs");
const path = require("node:path");

const project = path.resolve(__dirname, "..");
const products = JSON.parse(fs.readFileSync(path.join(project, "data", "products.json"), "utf8"));
const baseUrl = "https://yoyoziyo.github.io/pequenosabc";
const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

for (const product of products) {
  const title = escape(product.name);
  const description = escape(product.description);
  const productUrl = `${baseUrl}/produtos/${encodeURIComponent(product.slug)}/`;
  const imageUrl = `${baseUrl}/${product.cover}`;
  const price = Number(product.price).toFixed(2);
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrl,
    offers: { "@type": "Offer", priceCurrency: "BRL", price, availability: "https://schema.org/InStock", url: productUrl }
  }).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#fffaf2">
  <title>${title} | PequenosABC</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${productUrl}">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="PequenosABC">
  <meta property="og:url" content="${productUrl}">
  <meta property="og:title" content="${title} | PequenosABC">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="Capa de ${title}">
  <meta property="product:price:amount" content="${price}">
  <meta property="product:price:currency" content="BRL">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} | PequenosABC">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <link rel="icon" href="../../assets/pequenosabc-logo.webp">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../css/style.css?v=20261001-6">
  <script type="application/ld+json">${structuredData}</script>
  <script src="../../js/cart.js?v=20261001-6" defer></script>
  <script src="../../js/produto.js?v=20261001-6" defer></script>
</head>
<body data-root="../.." data-product="${escape(product.slug)}">
  <a class="skip-link" href="#product">Ir para o material</a>
  <header class="header"><div class="shell header-main product-header"><a class="brand-link" href="../../" aria-label="PequenosABC — página inicial"><img class="logo" src="../../assets/pequenosabc-logo.webp" alt="PequenosABC" width="120" height="72"></a><a class="back" href="../../"><svg aria-hidden="true"><use href="../../assets/icons.svg#arrow"/></svg> Voltar aos materiais</a><button class="cart" type="button" data-cart-open aria-label="Abrir carrinho"><svg aria-hidden="true"><use href="../../assets/icons.svg#cart"/></svg><span data-cart-count>0</span><b>Carrinho</b></button></div></header>
  <main class="shell product-page" id="product"><div class="product-loading"><div class="skeleton"></div><div class="skeleton"></div></div></main>
  <footer><div class="shell copyright">© 2026 PequenosABC. Todos os direitos reservados.</div></footer>
</body>
</html>`;

  const destination = path.join(project, "produtos", product.slug);
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, "index.html"), html);
}

console.log(`${products.length} página(s) de produto gerada(s).`);
