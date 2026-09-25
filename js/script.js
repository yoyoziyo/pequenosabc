const list = document.querySelector("#product-list");
const input = document.querySelector("#search");
const empty = document.querySelector("#empty");
const count = document.querySelector("#result-count");
let products = [];
const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const icon = id => `<svg aria-hidden="true"><use href="assets/icons.svg#${id}"/></svg>`;
const normalize = value => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

function card(product) {
  return `<article class="product-card"><a class="product-cover" href="produto.html?produto=${product.slug}" style="--cover:${product.color}">${product.badge ? `<span class="badge">${product.badge}</span>` : ""}<span class="cover-art">${icon("book")}</span><strong>${product.name}</strong><span class="cover-type">Material digital</span></a><div class="product-info"><a href="produto.html?produto=${product.slug}"><h3>${product.name}</h3></a><p>${product.short}</p><div><strong>${money(product.price)}</strong><button class="add" type="button" data-add-cart="${product.slug}" aria-label="Adicionar ${product.name} ao carrinho">${icon("cart")}</button></div></div></article>`;
}
function render(items) {
  list.classList.remove("products-loading"); list.setAttribute("aria-busy", "false"); list.innerHTML = items.map(card).join(""); empty.hidden = items.length > 0; count.textContent = `${items.length} ${items.length === 1 ? "material encontrado" : "materiais encontrados"}`;
}
function search() {
  const query = normalize(input.value.trim());
  render(products.filter(product => normalize([product.name, product.short, product.description, ...product.keywords].join(" ")).includes(query)));
}
fetch("data/products.json").then(response => { if (!response.ok) throw new Error(); return response.json(); }).then(data => { products = data; render(products); }).catch(() => {
  list.classList.remove("products-loading"); list.innerHTML = ""; empty.hidden = false; empty.querySelector("h3").textContent = "Não foi possível carregar os materiais"; empty.querySelector("p").textContent = "Atualize a página e tente novamente.";
});
input.addEventListener("input", search);
document.querySelector("#search-form").addEventListener("submit", event => { event.preventDefault(); search(); document.querySelector("#materiais").scrollIntoView(); });
document.querySelector("#clear-search").addEventListener("click", () => { input.value = ""; render(products); input.focus(); });
document.querySelector("#newsletter-form").addEventListener("submit", event => { event.preventDefault(); const button = event.currentTarget.querySelector("button"); button.textContent = "Novidades em breve"; button.disabled = true; });
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
} else document.querySelectorAll(".reveal").forEach(element => element.classList.add("revealed"));
