document.addEventListener('DOMContentLoaded', function () {

    // Classe para gerenciar produtos
    class ProductManager {
        constructor() {
            this.products = [
                // Celulares
                {
                    id: 1,
                    name: "Samsung Galaxy S21",
                    price: 4999.99,
                    category: "celulares",
                    brand: "Samsung",
                    image: "s23.jpg",
                    description: "Smartphone com câmera de 64MP e tela AMOLED."
                },
                {
                    id: 2,
                    name: "iPhone 13",
                    price: 6999.99,
                    category: "celulares",
                    brand: "Apple",
                    image: "iphone 13.jpg",
                    description: "Smartphone com chip A15 e câmera dupla."
                },

                // Notebooks
                {
                    id: 11,
                    name: "Notebook Dell XPS 15",
                    price: 8999.99,
                    category: "notebooks",
                    brand: "Dell",
                    image: "dell.jpg",
                    description: "Notebook premium com tela 4K e processador Intel Core i9."
                },
                {
                    id: 12,
                    name: "MacBook Pro 16",
                    price: 12999.99,
                    category: "notebooks",
                    brand: "Apple",
                    image: "macbook.jpg",
                    description: "Notebook com chip M1 Pro e tela Retina."
                },

                // Componentes
                {
                    id: 31,
                    name: "Memória RAM Corsair 32GB",
                    price: 1299.99,
                    category: "componentes",
                    brand: "Corsair",
                    image: "ram.jpg",
                    description: "Kit de memória RAM DDR5 5200MHz."
                },
                {
                    id: 32,
                    name: "Placa de Vídeo NVIDIA RTX 3080",
                    price: 7999.99,
                    category: "componentes",
                    brand: "NVIDIA",
                    image: "rtx.jpg",
                    description: "Placa de vídeo para jogos em 4K."
                }
            ];
        }

        getFeaturedProducts() {
            return this.products.slice(0, 40);
        }

        getProductById(id) {
            return this.products.find(product => product.id === id);
        }

        getProductsByCategory(category) {
            return this.products.filter(product => product.category === category).slice(0, 10);
        }
    }

    // Classe para o carrinho
    class Cart {
        constructor() {
            this.items = [];
        }

        addItem(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
        }

        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
        }

        getItems() {
            return this.items;
        }

        getTotal() {
            return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }

    // Classe de interface
    class UI {
        constructor() {
            this.productManager = new ProductManager();
            this.cart = new Cart();
            this.elements = {
                productsGrid: document.querySelector('.products-grid'),
                brandsGrid: document.querySelector('.brands-grid'),
                cartModal: document.getElementById('cartModal'),
                cartItems: document.getElementById('cartItems'),
                cartTotal: document.getElementById('cartTotal'),
                loginModal: document.getElementById('authModal'),
                loginForm: document.getElementById('loginForm'),
                registerForm: document.getElementById('registerForm'),
            };
            this.init();
        }

        init() {
            this.loadFeaturedProducts();
            this.setupEventListeners();
        }

        loadFeaturedProducts() {
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
            });
        }

        setupEventListeners() {
            // Abrir modal do carrinho
            document.getElementById('cartBtn').addEventListener('click', () => {
                this.loadCartItems();
                this.elements.cartModal.style.display = 'block';
            });

            // Fechar modal do carrinho
            this.elements.cartModal.querySelector('.close').addEventListener('click', () => {
                this.elements.cartModal.style.display = 'none';
            });

            // Adicionar ao carrinho
            this.elements.productsGrid.addEventListener('click', (event) => {
                if (event.target.classList.contains('add-to-cart')) {
                    const productId = parseInt(event.target.getAttribute('data-id'));
                    const product = this.productManager.getProductById(productId);
                    this.cart.addItem(product);
                    this.updateCartCount();
                }
            });

            // Abrir login
            document.getElementById('loginBtn').addEventListener('click', () => {
                this.elements.loginModal.style.display = 'block';
            });

            // Fechar login
            this.elements.loginModal.querySelector('.close').addEventListener('click', () => {
                this.elements.loginModal.style.display = 'none';
            });

            // Alternar login/registro
            document.getElementById('showRegister').addEventListener('click', () => {
                this.elements.loginForm.style.display = 'none';
                this.elements.registerForm.style.display = 'block';
            });

            document.getElementById('showLogin').addEventListener('click', () => {
                this.elements.loginForm.style.display = 'block';
                this.elements.registerForm.style.display = 'none';
            });

            // Formulário de login
            this.elements.loginForm.querySelector('form').addEventListener('submit', (event) => {
                event.preventDefault();
                const username = this.elements.loginForm.querySelector('input[type="email"]').value;
                const password = this.elements.loginForm.querySelector('input[type="password"]').value;
                this.login(username, password);
            });
        }

        loadCartItems() {
            this.elements.cartItems.innerHTML = '';
            const items = this.cart.getItems();

            if (items.length === 0) {
                this.elements.cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
                this.elements.cartTotal.textContent = '0,00';
                return;
            }

            items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">X</button>
                `;
                this.elements.cartItems.appendChild(cartItem);
            });

            this.elements.cartTotal.textContent = this.cart.getTotal().toFixed(2);

            // Remover itens
            this.elements.cartItems.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = parseInt(event.target.getAttribute('data-id'));
                    this.cart.removeItem(productId);
                    this.loadCartItems();
                    this.updateCartCount();
                });
            });
        }

        updateCartCount() {
            const totalItems = this.cart.getItems().reduce((total, item) => total + item.quantity, 0);
            const countSpan = document.querySelector('.cart-count');
            if (countSpan) {
                countSpan.textContent = totalItems;
            }
        }

        login(username, password) {
            if (username === 'admin' && password === '1234') {
                alert('Login bem-sucedido!');
                this.elements.loginModal.style.display = 'none';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        }
    }

    // Inicializar app
    const app = new UI();

    // -------------------- CARROSSEL --------------------
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Inicializa carrossel
    showSlide(currentSlide);

    // Botões
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Troca automática (5 segundos)
    setInterval(nextSlide, 5000);
});
