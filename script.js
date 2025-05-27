document.addEventListener('DOMContentLoaded', function() {
  // Classe para gerenciar produtos
  class ProductManager {
    constructor() {
      this.products = [
        {
          id: 1,
          name: " Redragon Kumara Pro Magnético",
          price: 4999.99,
          category: "teclado",
          brand: "Redragon",
          image: "Redragon.avif",
          description: "Switches: SWITCH MAGNÉTICO REDRAGON, Acionamento: MAGNÉTICO, Hotswap DIY: SIM, COR: PRETO"
        },
        {
          id: 2,
          name: "Notebook Dell XPS 15",
          price: 8999.99,
          category: "notebooks",
          brand: "Dell",
          image: "https://via.placeholder.com/300x300?text=Dell+XPS+15",
          description: "Notebook premium com tela 4K e processador Intel Core i9."
        },
        {
          id: 3,
          name: "Fone Sony WH-1000XM5",
          price: 1999.99,
          category: "perifericos",
          brand: "Sony",
          image: "https://via.placeholder.com/300x300?text=Sony+WH-1000XM5",
          description: "Fone com cancelamento de ruído líder do mercado."
        },
        {
          id: 4,
          name: "Teclado Razer BlackWidow",
          price: 899.99,
          category: "perifericos",
          brand: "Razer",
          image: "https://via.placeholder.com/300x300?text=Razer+BlackWidow",
          description: "Teclado mecânico para jogos com switches Razer Green."
        },
        {
          id: 5,
          name: "Mouse Logitech MX Master 3",
          price: 599.99,
          category: "perifericos",
          brand: "Logitech",
          image: "https://via.placeholder.com/300x300?text=Logitech+MX+Master+3",
          description: "Mouse ergonômico para produtividade."
        },
        {
          id: 6,
          name: "Monitor LG UltraWide 34'",
          price: 3499.99,
          category: "perifericos",
          brand: "LG",
          image: "https://via.placeholder.com/300x300?text=LG+UltraWide+34",
          description: "Monitor curvado UltraWide 3440x1440."
        },
        {
          id: 7,
          name: "Mouse Pad HyperX Fury S",
          price: 149.99,
          category: "perifericos",
          brand: "HyperX",
          image: "https://via.placeholder.com/300x300?text=HyperX+Fury+S",
          description: "Mouse pad de tecido para jogos."
        },
        {
          id: 8,
          name: "Memória RAM Corsair 32GB",
          price: 1299.99,
          category: "componentes",
          brand: "Corsair",
          image: "https://via.placeholder.com/300x300?text=Corsair+32GB+DDR5",
          description: "Kit de memória RAM DDR5 5200MHz."
        }
      ];
    }

    getFeaturedProducts() {
      return this.products.slice(0, 8); // Retorna os 8 primeiros como mais vendidos
    }

    getProductById(id) {
      return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category) {
      return this.products.filter(product => product.category === category);
    }
  }

  // Classe para gerenciar o carrinho
  class CartManager {
    constructor() {
      this.cart = [];
    }

    addProduct(product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({
          ...product,
          quantity: 1
        });
      }
    }

    removeProduct(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
    }

    getTotal() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
      this.cart = [];
    }
  }

  // Classe para gerenciar a interface
  class UI {
    constructor() {
      this.productManager = new ProductManager();
      this.cartManager = new CartManager();
      
      // Elementos do DOM
      this.elements = {
        loginBtn: document.getElementById('loginBtn'),
        cartBtn: document.getElementById('cartBtn'),
        authModal: document.getElementById('authModal'),
        cartModal: document.getElementById('cartModal'),
        productModal: document.getElementById('productModal'),
        closeButtons: document.querySelectorAll('.close'),
        showRegister: document.getElementById('showRegister'),
        showLogin: document.getElementById('showLogin'),
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        productsGrid: document.querySelector('.products-grid'),
        cartItems: document.getElementById('cartItems'),
        cartTotal: document.getElementById('cartTotal'),
        checkoutBtn: document.getElementById('checkoutBtn'),
        productDetails: document.getElementById('productDetails'),
        carouselContainer: document.querySelector('.carousel-container'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        categoryCards: document.querySelectorAll('.category-card')
      };

      // Estado do carrossel
      this.currentSlide = 0;
      this.slides = document.querySelectorAll('.carousel-slide');
      this.totalSlides = this.slides.length;

      // Inicialização
      this.init();
    }

    init() {
      this.loadFeaturedProducts();
      this.setupEventListeners();
      this.updateCarousel();
    }

    // Carregar produtos na página
    loadFeaturedProducts() {
      this.elements.productsGrid.innerHTML = '';
      const featuredProducts = this.productManager.getFeaturedProducts();
      
      featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p class="product-price">R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
          </div>
        `;
        this.elements.productsGrid.appendChild(productCard);
        
        // Adicionar evento de clique para ver detalhes
        productCard.addEventListener('click', () => this.showProductDetails(product.id));
      });
    }

    // Mostrar detalhes do produto
    showProductDetails(productId) {
      const product = this.productManager.getProductById(productId);
      if (!product) return;
      
      this.elements.productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-modal-image">
        <div class="product-modal-info">
          <h3>${product.name}</h3>
          <p class="product-modal-price">R$ ${product.price.toFixed(2)}</p>
          <p class="product-modal-description">${product.description}</p>
          <button class="buy-now-btn" data-id="${product.id}">Comprar Agora</button>
        </div>
      `;
      
      // Adicionar evento ao botão de comprar
      const buyNowBtn = document.querySelector('.buy-now-btn');
      buyNowBtn.addEventListener('click', () => {
        this.addToCart(product.id);
        this.hideModal(this.elements.productModal);
        this.showModal(this.elements.cartModal);
      });
      
      this.showModal(this.elements.productModal);
    }

    // Adicionar produto ao carrinho
    addToCart(productId) {
      const product = this.productManager.getProductById(productId);
      if (!product) return;
      
      this.cartManager.addProduct(product);
      this.updateCart();
    }

    // Atualizar visualização do carrinho
    updateCart() {
      this.elements.cartItems.innerHTML = '';
      
      if (this.cartManager.cart.length === 0) {
        this.elements.cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        this.elements.cartTotal.textContent = '0,00';
        return;
      }
      
      this.cartManager.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="60">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.quantity} x R$ ${item.price.toFixed(2)}</p>
          </div>
          <p class="cart-item-price">R$ ${(item.quantity * item.price).toFixed(2)}</p>
          <button class="remove-item" data-id="${item.id}">&times;</button>
        `;
        this.elements.cartItems.appendChild(cartItem);
        
        // Adicionar evento para remover item
        const removeBtn = cartItem.querySelector('.remove-item');
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeFromCart(item.id);
        });
      });
      
      this.elements.cartTotal.textContent = this.cartManager.getTotal().toFixed(2);
    }

    // Remover produto do carrinho
    removeFromCart(productId) {
      this.cartManager.removeProduct(productId);
      this.updateCart();
    }

    // Finalizar compra
    checkout() {
      alert('Compra finalizada com sucesso! Obrigado por comprar na TechStore.');
      this.cartManager.clearCart();
      this.updateCart();
    }

    // Carrossel
    updateCarousel() {
      this.elements.carouselContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarousel();
    }

    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.updateCarousel();
    }

    // Mostrar modal
    showModal(modal) {
      modal.style.display = 'block';
    }

    // Esconder modal
    hideModal(modal) {
      modal.style.display = 'none';
    }

    // Configurar event listeners
    setupEventListeners() {
      // Login e Carrinho
      this.elements.loginBtn.addEventListener('click', () => {
        this.showModal(this.elements.authModal);
        this.elements.loginForm.style.display = 'block';
        this.elements.registerForm.style.display = 'none';
      });

      this.elements.cartBtn.addEventListener('click', () => {
        this.showModal(this.elements.cartModal);
      });

      // Fechar modais
      this.elements.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.hideModal(this.elements.authModal);
          this.hideModal(this.elements.cartModal);
          this.hideModal(this.elements.productModal);
        });
      });

      // Alternar entre login e registro
      this.elements.showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        this.elements.loginForm.style.display = 'none';
        this.elements.registerForm.style.display = 'block';
      });

      this.elements.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.elements.registerForm.style.display = 'none';
        this.elements.loginForm.style.display = 'block';
      });

      // Fechar modais ao clicar fora
      window.addEventListener('click', (e) => {
        if (e.target === this.elements.authModal) {
          this.hideModal(this.elements.authModal);
        }
        if (e.target === this.elements.cartModal) {
          this.hideModal(this.elements.cartModal);
        }
        if (e.target === this.elements.productModal) {
          this.hideModal(this.elements.productModal);
        }
      });

      // Adicionar ao carrinho - evento delegado
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
          const productId = parseInt(e.target.getAttribute('data-id'));
          this.addToCart(productId);
          
          // Feedback visual
          e.target.textContent = 'Adicionado!';
          e.target.style.backgroundColor = '#4CAF50';
          setTimeout(() => {
            e.target.textContent = 'Adicionar ao Carrinho';
            e.target.style.backgroundColor = '#4a6fa5';
          }, 1000);
        }
      });

      // Finalizar compra
      this.elements.checkoutBtn.addEventListener('click', () => this.checkout());

      // Carrossel
      this.elements.nextBtn.addEventListener('click', () => this.nextSlide());
      this.elements.prevBtn.addEventListener('click', () => this.prevSlide());

      // Categorias
      this.elements.categoryCards.forEach(card => {
        card.addEventListener('click', () => {
          const category = card.getAttribute('data-category');
          this.loadProductsByCategory(category);
        });
      });
    }

    // Carregar produtos por categoria
    loadProductsByCategory(category) {
      this.elements.productsGrid.innerHTML = '<h2 style="grid-column: 1 / -1;">' + 
        category.charAt(0).toUpperCase() + category.slice(1) + '</h2>';
      
      const categoryProducts = this.productManager.getProductsByCategory(category);
      
      if (categoryProducts.length === 0) {
        this.elements.productsGrid.innerHTML += '<p style="grid-column: 1 / -1;">Nenhum produto encontrado nesta categoria.</p>';
        return;
      }
      
      categoryProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p class="product-price">R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
          </div>
        `;
        this.elements.productsGrid.appendChild(productCard);
        
        productCard.addEventListener('click', () => this.showProductDetails(product.id));
      });
    }
  }

  // Inicializar a aplicação
  const app = new UI();
});