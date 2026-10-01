(() => {
  const root = document.body.dataset.root || ".";
  const storageKey = "pequenosabc-cart";
  const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const icon = id => `<svg aria-hidden="true"><use href="${root}/assets/icons.svg#${id}"/></svg>`;
  let products = [];
  let store = { whatsapp: "", orderPrefix: "PABC" };
  let items = JSON.parse(localStorage.getItem(storageKey) || "[]");

  document.body.insertAdjacentHTML("beforeend", `
    <div class="cart-overlay" data-cart-close></div>
    <aside class="cart-drawer" aria-hidden="true" aria-labelledby="cart-title">
      <header><div><span>Seu carrinho</span><h2 id="cart-title">Materiais escolhidos</h2></div><button type="button" data-cart-close aria-label="Fechar carrinho">${icon("close")}</button></header>
      <div class="cart-items" data-cart-items></div>
      <footer class="cart-summary"><div><span>Total do pedido</span><strong data-cart-total>${money(0)}</strong></div><button class="checkout-button" type="button" data-whatsapp-checkout disabled>${icon("whatsapp")} Fazer compra pelo WhatsApp</button><small>Você falará diretamente conosco para receber a chave PIX e concluir o pagamento.</small></footer>
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
      container.innerHTML = selected.map(product => `<article class="cart-item"><a href="${root}/produtos/${product.slug}/" style="--cover:${product.color || "#dff3ff"}">${product.cover ? `<img src="${root}/${product.cover}" alt="">` : icon("book")}</a><div><a href="${root}/produtos/${product.slug}/"><strong>${product.name}</strong></a><span>Material digital em PDF</span><b>${money(product.price)}</b></div><button type="button" data-remove-cart="${product.slug}" aria-label="Remover ${product.name}">${icon("trash")}</button></article>`).join("");
    }
    document.querySelector("[data-cart-total]").textContent = money(selected.reduce((sum, product) => sum + product.price, 0));
    document.querySelector("[data-whatsapp-checkout]").disabled = !selected.length || !store.whatsapp;
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

  function checkout() {
    const selected = items.map(slug => products.find(product => product.slug === slug)).filter(Boolean);
    if (!selected.length || !store.whatsapp) return;
    const total = selected.reduce((sum, product) => sum + product.price, 0);
    const orderId = `${store.orderPrefix}-${Date.now().toString(36).toUpperCase()}`;
    const lines = selected.map(product => `• ${product.name} — ${money(product.price)}`).join("\n");
    const message = `Olá! Quero fazer um pedido na PequenosABC.\n\nPedido: *${orderId}*\n${lines}\n\n*Total: ${money(total)}*\n\nPode me enviar a chave PIX e as instruções para pagamento? Após o pagamento, vou enviar o comprovante por aqui.`;
    window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-cart]");
    const removeButton = event.target.closest("[data-remove-cart]");
    if (addButton) add(addButton.dataset.addCart);
    if (removeButton) { items = items.filter(slug => slug !== removeButton.dataset.removeCart); save(); render(); }
    if (event.target.closest("[data-cart-open]")) openCart();
    if (event.target.closest("[data-cart-close]")) closeCart();
    if (event.target.closest("[data-whatsapp-checkout]")) checkout();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
  Promise.all([
    fetch(`${root}/data/products.json`, { cache: "no-store" }).then(response => response.json()),
    fetch(`${root}/data/store.json`, { cache: "no-store" }).then(response => response.json())
  ]).then(([productData, storeData]) => { products = productData; store = storeData; items = items.filter(slug => products.some(product => product.slug === slug)); save(); render(); }).catch(updateCounts);
  updateCounts();
  window.PequesCart = { add, open: openCart };
})();
