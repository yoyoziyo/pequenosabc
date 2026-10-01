const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const icon = id => `<svg aria-hidden="true"><use href="assets/icons.svg#${id}"/></svg>`;
const slug = new URLSearchParams(location.search).get("produto");
const prepare = product => ({ short: product.description, color: "#dff3ff", contents: [], ...product });

fetch("data/products.json", { cache: "no-store" }).then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(products => {
  const found = products.find(item => item.slug === slug);
  if (!found) throw new Error();
  const product = prepare(found);
  const visual = product.cover
    ? `<img class="detail-cover-image" src="${product.cover}" alt="Capa do material ${product.name}" fetchpriority="high" decoding="async">`
    : `<span class="cover-art">${icon("book")}</span><span>Material pedagógico digital</span><h1>${product.name}</h1><small>Arquivo em PDF</small>`;
  const contents = product.contents.length
    ? `<ul>${product.contents.map(item => `<li>${icon("check")} ${item}</li>`).join("")}</ul>`
    : "";

  document.title = `${product.name} | PequenosABC`;
  document.querySelector('meta[name="description"]').content = product.description;
  document.querySelector("#product").innerHTML = `<nav class="breadcrumb" aria-label="Navegação estrutural"><a href="index.html">Materiais</a><span aria-hidden="true">›</span><span>${product.name}</span></nav><section class="product-detail"><div class="detail-cover${product.cover ? " has-image" : ""}" style="--cover:${product.color}">${product.badge ? `<span class="badge">${product.badge}</span>` : ""}${visual}</div><div class="detail-copy"><span class="kicker">Material digital</span><h1>${product.name}</h1><p>${product.description}</p><div class="price">${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}<strong>${money(product.price)}</strong><small>Pagamento único</small></div><button class="buy" type="button" data-add-cart="${product.slug}">${icon("cart")} Adicionar ao carrinho</button><p class="safe">${icon("shield")} Pedido e atendimento direto pelo WhatsApp.</p></div></section><section class="product-content"><article><h2>O que você vai receber</h2><p>${product.short}</p>${contents}</article><aside><h3>Sobre o material</h3><p>${icon("file")}<span><small>Formato</small><b>PDF digital</b></span></p><p>${icon("download")}<span><small>Entrega</small><b>Pelo WhatsApp</b></span></p><p>${icon("shield")}<span><small>Liberação</small><b>Após confirmação</b></span></p></aside></section>`;
}).catch(() => {
  document.querySelector("#product").innerHTML = `<div class="empty product-error"><h1>Material não encontrado</h1><p>Este endereço pode estar incorreto ou o material ainda não foi publicado.</p><a class="primary" href="index.html">Voltar à loja</a></div>`;
});
