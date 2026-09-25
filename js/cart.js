(() => {
  const root = document.body.dataset.root || ".";
  const storageKey = "pequenosabc-cart";
  const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const icon = id => `<svg aria-hidden="true"><use href="${root}/assets/icons.svg#${id}"/></svg>`;
  let products = [];
  let items = JSON.parse(localStorage.getItem(storageKey) || "[]");

  document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" data-cart-close></div>
    <aside class="cart-drawer" aria-hidden="true" aria-labelledby="cart-title">
      <header><div><span>Seu carrinho</span><h2 id="cart-title">Materiais escolhidos</h2></div><button type="button" data-cart-close aria-label="Fechar carrinho">${icon("close")}</button></header>
      <div class="cart-items" data-cart-items></div>
      <footer class="cart-summary"><div><span>Subtotal</span><strong data-cart-total>${money(0)}</strong></div><button class="checkout-button" type="button" disabled>Finalização em breve</button><small>O pagamento e a entrega segura serão ativados na próxima etapa da loja.</small></footer>
    </aside>
    <div class="toast" role="status" aria-live="polite"></div>`);

  const drawer = document.querySelector(".cart-drawer");
  const toast = document.querySelector(".toast");
  const save = () => localStorage.setItem(storageKey, JSON.stringify(items));
  const updateCounts = () => document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = items.length);

  function render() {
    const container = document.querySelector("[data-cart-items]");
    const selected = items.map(slug => products.find(product => product.slug === slug)).filter(Boolean);
    if (!selected.length) {
      container.innerHTML = `<div class="cart-empty">${icon("cart")}<h3>Seu carrinho está vazio</h3><p>Escolha um material para continuar.</p><button type="button" data-cart-close>Ver materiais</button></div>`;
    } else {
      container.innerHTML = selected.map(product => `<article class="cart-item"><a href="${root}/produto.html?produto=${product.slug}" style="--cover:${product.color}">${icon("book")}</a><div><a href="${root}/produto.html?produto=${product.slug}"><strong>${product.name}</strong></a><span>Material digital em PDF</span><b>${money(product.price)}</b></div><button type="button" data-remove-cart="${product.slug}" aria-label="Remover ${product.name}">${icon("trash")}</button></article>`).join("");
    }
    document.querySelector("[data-cart-total]").textContent = money(selected.reduce((sum, product) => sum + product.price, 0));
    updateCounts();
  }

  function openCart() {
    drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); document.body.classList.add("cart-open"); drawer.querySelector("[data-cart-close]").focus();
  }
  function closeCart() { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("cart-open"); }
  function add(slug) {
    if (!items.includes(slug)) items.push(slug);
    save(); render(); toast.textContent = "Material adicionado ao carrinho"; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-cart]");
    const removeButton = event.target.closest("[data-remove-cart]");
    if (addButton) add(addButton.dataset.addCart);
    if (removeButton) { items = items.filter(slug => slug !== removeButton.dataset.removeCart); save(); render(); }
    if (event.target.closest("[data-cart-open]")) openCart();
    if (event.target.closest("[data-cart-close]")) closeCart();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
  fetch(`${root}/data/products.json`).then(response => response.json()).then(data => { products = data; render(); }).catch(updateCounts);
  updateCounts();
  window.PequesCart = { add, open: openCart };
})();
