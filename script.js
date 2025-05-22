// Dados dos produtos organizados por marca
const productsData = {
  Samsung: [
    { id: "s1", name: "Galaxy S23 Ultra", price: 6799, img: "gg" },
    { id: "s2", name: "Galaxy S22", price: 3999, img: "https://images.samsung.com/is/image/samsung/p6pim/br/galaxy-s22/gallery/br-galaxy-s22-ultra-5g-s908-sm-s908ezgdzto-530331983?$730_584_PNG$" },
    { id: "s3", name: "Galaxy A53", price: 1799, img: "https://images.samspim/br/galaxy-a53-5g/gallery/br-galaxy-a53-5g-a536-396261-sm-a536ezgdzto-530276509?$730_584_PNG$" },
    { id: "s4", name: "Galaxy Z Fold4", price: 8999, img: "https://images.samsung.com/is/image/samsung/p6pim/br/2208/gallery/br-galaxy-z-fold4-5g-f936-sm-f936blgdzto-530049013?$730_584_PNG$" },
    { id: "s5", name: "Galaxy Tab S8", price: 3399, img: "https://images.samsung.com/is/image/samsung/p6pim/br/tablets/galaxy-tab-s8/gallery/br-galaxy-tab-s8-ultra-5g-navy-600236-sm-x906nznzbrl-530309088?$730_584_PNG$" }
  ],
  Iphone: [
    { id: "i1", name: "iPhone 13", price: 7999, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKjSwZ0N2EgMIZ3UM8S8gFYwrt18WBLQjvgbDyfyf3fPGWXMW9jkhfCDzxpdItcrrFouk&usqp=CAU" },
    { id: "i2", name: "iPhone 14", price: 4999, img: "https://acdn-us.mitiendanube.com/stores/003/635/363/products/ca89ce230229051caa417a575fec341b-915f3a7f2721c5e80317083859114231-1024-1024.jpg" },
    { id: "i3", name: "iPhone 13 Pro", price: 5999, img: "https://m.media-amazon.com/images/I/41yGCey9asL._AC_UF1000,1000_QL80_.jpg" },
    { id: "i4", name: "iPhone 16", price: 5500, img: "https://cf-images.dustin.eu/cdn-cgi/image/fit=contain,format=auto,quality=75,width=828,fit=contain/image/d2000012787115/apple-iphone-16-128gb-wit.jpg" },
    { id: "i5", name: "iPhone 12 Mini", price: 3999, img: "https://m.media-amazon.com/images/I/61xjsVCiLVL._AC_UF1000,1000_QL80_.jpg" }
  ],
  Motorola: [
    { id: "m1", name: "Motorola Edge 30 Pro", price: 3999, img: "https://motorolaus.vtexassets.com/arquivos/ids/157942-1600-auto?v=637978464020630000&width=1600&height=auto&aspect=true" },
    { id: "m2", name: "Moto G200", price: 2699, img: "ggg" },
    { id: "m3", name: "Moto G71", price: 1699, img: "ggg" },
    { id: "m4", name: "Moto E40", price: 899, img: "https://motorolaus.vtexassets.com/arquivos/ids/161032-1600-auto?v=638363848301030000&width=1600&height=auto&aspect=true" },
    { id: "m5", name: "Razr 5G", price: 7499, img: "ggg" }
  ],
  Redmi: [
    { id: "r1", name: "Redmi Note 11 Pro", price: 1849, img: "https://cdn.shopify.com/s/files/1/2321/2136/products/RedmiNote11Pro_1_grande.png?v=1667481743" },
    { id: "r2", name: "Redmi 10", price: 1099, img: "https://i01.appmifile.com/webfile/globalimg/products/pc/redmi10/specs-header.png" },
    { id: "r3", name: "Redmi Note 10", price: 1299, img: "https://cdn.shopify.com/s/files/1/2321/2136/products/RedmiNote10_1_grande.png?v=1631886767" },
    { id: "r4", name: "Redmi K40", price: 2499, img: "https://cdn.shopify.com/s/files/1/2321/2136/products/K40-5G-Specs.png?v=1628172605" },
    { id: "r5", name: "Redmi 9", price: 799, img: "https://cdn.shopify.com/s/files/1/2321/2136/products/Redmi9_Note9_2021_21.png?v=1616702121" }
  ],
  Poco: [
    { id: "p1", name: "Poco X5 Pro 5G", price: 1999, img: "https://images-na.ssl-images-amazon.com/images/I/61ZUHXn2UQL._AC_SL1500_.jpg" },
    { id: "p2", name: "Poco F4", price: 2499, img: "https://cdn-images-1.medium.com/max/1200/1*VaMk8eYiMMO0tpPHNQ-utw.jpeg" },
    { id: "p3", name: "Poco M4 Pro", price: 1399, img: "https://fdn2.gsmarena.com/vv/pics/poco/poco-m4-pro-5g-1.jpg" },
    { id: "p4", name: "Poco X3 Pro", price: 1699, img: "https://fdn2.gsmarena.com/vv/pics/poco/poco-x3-pro-1.jpg" },
    { id: "p5", name: "Poco C40", price: 799, img: "https://fdn2.gsmarena.com/vv/pics/poco/poco-c40-1.jpg" }
  ]
};

// Estado do app
let allProducts = [];
let filteredProducts = [];
let cart = {};

const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const cartToggleBtn = document.getElementById("cartToggleBtn");
const cartSidebar = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElem = document.getElementById("cartTotal");
const cartCountElem = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const brandLogos = document.querySelectorAll(".brand-logo");

// Inicializa o app carregando todos os produtos
function initialize() {
  // Junta todos os produtos em um array único
  allProducts = [].concat(...Object.values(productsData));
  filteredProducts = allProducts;
  renderProducts(filteredProducts);
  updateCartCount();
  setupEventListeners();
  startCarousel();
}
  
// Renderiza os produtos na tela (array de produtos)
function renderProducts(products) {
  productsContainer.innerHTML = "";
  if(products.length === 0){
    productsContainer.innerHTML = `<p style="color:#ccc;text-align:center;">Nenhum produto encontrado.</p>`;
    return;
  }
  for (const p of products) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-image" loading="lazy" />
      <div class="product-name">${p.name}</div>
      <div class="product-price">R$ ${p.price.toFixed(2)}</div>
      <button class="add-cart-btn" data-id="${p.id}">Adicionar ao Carrinho</button>
    `;
    productsContainer.appendChild(card);
  }
  // Add event listeners para botões adicionar
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", addToCartHandler);
  });
}

// Filtra produtos por marca
function filterByBrand(brand) {
  brandLogos.forEach(logo => {
    if (logo.dataset.brand === brand) {
      logo.classList.add("active");
    } else {
      logo.classList.remove("active");
    }
  });
  filteredProducts = allProducts.filter(p => getBrandById(p.id) === brand);
  renderProducts(filteredProducts);
}

// Detecta marca a partir do id (prefixo)
function getBrandById(id) {
  const prefix = id[0];
  switch (prefix) {
    case "s": return "Samsung";
    case "i": return "Iphone";
    case "m": return "Motorola";
    case "r": return "Redmi";
    case "p": return "Poco";
    default: return "";
  }
}

// Pesquisa produtos pelo nome (substring)
function searchProducts() {
  const query = searchInput.value.toLowerCase().trim();
  if(query === ""){
    // se pesquisa vazia, mostra produtos filtrados pela marca ativa ou todos
    const activeBrandLogo = document.querySelector(".brand-logo.active");
    if(activeBrandLogo) filterByBrand(activeBrandLogo.dataset.brand);
    else {
      filteredProducts = allProducts;
      renderProducts(filteredProducts);
    }
  } else {
    const result = filteredProducts.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(result);
  }
}

// Adiciona produto ao carrinho
function addToCartHandler(e) {
  const id = e.target.dataset.id;
  if (!cart[id]) {
    const product = allProducts.find(p => p.id === id);
    cart[id] = { ...product, quantity: 1 };
  } else {
    cart[id].quantity++;
  }
  updateCartCount();
  renderCart();
}

// Atualiza contador total de itens no carrinho
function updateCartCount() {
  const totalQty = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  cartCountElem.textContent = totalQty;
}

// Renderiza itens do carrinho no sidebar
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (Object.keys(cart).length === 0) {
    cartItemsContainer.innerHTML = `<p style="color:#999;text-align:center;">Carrinho vazio.</p>`;
    cartTotalElem.textContent = "0.00";
    return;
  }
  let total = 0;
  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.quantity;
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-id="${id}" data-action="increase">+</button>
        </div>
        <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  }
  cartTotalElem.textContent = total.toFixed(2);

  // add event buttons increase/decrease
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", qtyBtnHandler);
  });
}

// Manipula aumentos e reduções da quantidade no carrinho
function qtyBtnHandler(e) {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (action === "increase") {
    cart[id].quantity++;
  } else if (action === "decrease") {
    cart[id].quantity--;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
  }
  updateCartCount();
  renderCart();
}

// Alterna visibilidade do carrinho
function toggleCart() {
  cartSidebar.classList.toggle("open");
}

// Finalizar compra
function checkout() {
  if(Object.keys(cart).length === 0){
    alert("O carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso! Obrigado.");
  cart = {};
  updateCartCount();
  renderCart();
  toggleCart();
}

// Configura eventos da UI
function setupEventListeners() {
  // Pesquisa produtos
  searchInput.addEventListener("input", searchProducts);

  // Toggle carrinho
  cartToggleBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);

  // Finalizar compra
  checkoutBtn.addEventListener("click", checkout);

  // Clicar na marca
  brandLogos.forEach(logo => {
    logo.addEventListener("click", () => {
      if(logo.classList.contains("active")){
        // desativa filtro
        logo.classList.remove("active");
        filteredProducts = allProducts;
        renderProducts(filteredProducts);
      } else {
        filterByBrand(logo.dataset.brand);
      }
      // limpa pesquisa
      searchInput.value = "";
    });
  });
}

// CARROSSEL
let carouselIndex = 0;
const carouselImages = document.querySelectorAll(".carousel-image");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

function showSlide(index) {
  carouselImages.forEach((img, i) => {
    img.classList.toggle("hidden", i !== index);
  });
}

function nextSlide() {
  carouselIndex++;
  if(carouselIndex >= carouselImages.length) carouselIndex = 0;
  showSlide(carouselIndex);
}

function prevSlide() {
  carouselIndex--;
  if(carouselIndex < 0) carouselIndex = carouselImages.length - 1;
  showSlide(carouselIndex);
}

function startCarousel() {
  showSlide(carouselIndex);
  prevSlideBtn.addEventListener("click", prevSlide);
  nextSlideBtn.addEventListener("click", nextSlide);
  // Auto slide a cada 5s
  setInterval(nextSlide, 5000);
}

// Inicializa aplicação
initialize();
