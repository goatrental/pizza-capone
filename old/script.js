// Pizza Capone - Interactive JavaScript
// Load menu data
let menuData = null;

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initScrollAnimations();
    loadMenuData();
    initOrderSystem();
    initNewsletterForm();
    initSmoothScrolling();
    initParallaxEffects();
    initSearchSystem();
});

// Load menu data from JSON file
async function loadMenuData() {
    try {
        const response = await fetch('scraped_data.json');
        menuData = await response.json();

        // Process the data to use placeholder images for missing ones
        menuData.categories.forEach(category => {
            category.products.forEach(product => {
                if (!product.image || !product.image.startsWith('./images/')) {
                    product.image = 'pizza-cappone-placeholder-500x500.jpg';
                }
            });
        });

        initMenuSystem();
    } catch (error) {
        console.error('Error loading menu data:', error);
        // Use a simple fallback if JSON loading fails
        menuData = {
            categories: [
                {
                    name: "Pizza",
                    products: [
                        {
                            name: "Margherita",
                            description: "tomati, sýr",
                            image: "pizza-cappone-placeholder-500x500.jpg",
                            price: "159 Kč",
                            sizes: { "Ø 30 cm": "159 Kč", "Ø 45 cm": "259 Kč" },
                            ingredients: []
                        }
                    ]
                }
            ]
        };
        initMenuSystem();
    }
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.menu-category, .value-item, .info-item, .vintage-photo');
    animateElements.forEach(el => observer.observe(el));

    // Special animations for hero elements
    const heroElements = document.querySelectorAll('.hero-text, .don-silhouette');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add(index === 0 ? 'fade-in-left' : 'fade-in-right');
        }, 500 + (index * 200));
    });
}

// Order System
function initOrderSystem() {
    const deliveryTypeSelect = document.getElementById('deliveryType');
    const addressGroup = document.getElementById('addressGroup');
    const quickItems = document.querySelectorAll('.quick-item');
    const orderForm = document.getElementById('orderForm');
    const orderItemsList = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('totalPrice');

    let orderItems = [];
    let totalPrice = 0;

    // Show/hide address field based on delivery type
    deliveryTypeSelect.addEventListener('change', function () {
        if (this.value === 'delivery') {
            addressGroup.style.display = 'block';
            addressGroup.querySelector('textarea').required = true;
        } else {
            addressGroup.style.display = 'none';
            addressGroup.querySelector('textarea').required = false;
        }
    });

    // Quick order items
    quickItems.forEach(item => {
        item.addEventListener('click', function () {
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);

            addToOrder(name, price);

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add item to order
    function addToOrder(name, price) {
        const existingItem = orderItems.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            orderItems.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateOrderDisplay();
    }

    // Remove item from order
    function removeFromOrder(name) {
        const itemIndex = orderItems.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            if (orderItems[itemIndex].quantity > 1) {
                orderItems[itemIndex].quantity -= 1;
            } else {
                orderItems.splice(itemIndex, 1);
            }
        }
        updateOrderDisplay();
    }

    // Update order display
    function updateOrderDisplay() {
        if (orderItems.length === 0) {
            orderItemsList.innerHTML = '<p class="empty-order">Zatím nemáte vybrané žádné položky</p>';
            totalPrice = 0;
        } else {
            let html = '';
            totalPrice = 0;

            orderItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;

                html += `
                    <div class="order-item">
                        <div class="order-item-info">
                            <span class="order-item-name">${item.name}</span>
                            <span class="order-item-quantity">
                                <button type="button" class="quantity-btn minus" data-name="${item.name}">-</button>
                                ${item.quantity}x
                                <button type="button" class="quantity-btn plus" data-name="${item.name}">+</button>
                            </span>
                        </div>
                        <span class="order-item-price">${itemTotal} Kč</span>
                    </div>
                `;
            });

            orderItemsList.innerHTML = html;

            // Add event listeners to quantity buttons
            orderItemsList.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const name = this.dataset.name;
                    if (this.classList.contains('plus')) {
                        addToOrder(name, orderItems.find(item => item.name === name).price);
                    } else {
                        removeFromOrder(name);
                    }
                });
            });
        }

        totalPriceElement.textContent = `${totalPrice} Kč`;
    }

    // Order form submission
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (orderItems.length === 0) {
            showNotification('Prosím vyberte alespoň jednu položku do objednávky.', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(this);
        const orderData = {
            customer: {
                name: formData.get('customerName'),
                phone: formData.get('customerPhone'),
                email: formData.get('customerEmail')
            },
            delivery: {
                type: formData.get('deliveryType'),
                address: formData.get('deliveryAddress'),
                time: formData.get('deliveryTime')
            },
            items: orderItems,
            total: totalPrice,
            notes: formData.get('orderNotes'),
            timestamp: new Date().toISOString()
        };

        // Simulate order processing
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Odesílám objednávku...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Objednávka byla úspěšně odeslána! Brzy vás budeme kontaktovat.', 'success');

            // Reset form and order
            this.reset();
            orderItems = [];
            updateOrderDisplay();
            addressGroup.style.display = 'none';

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Log order data (in real app, this would be sent to server)
            console.log('Order submitted:', orderData);
        }, 2000);
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Přihlašuji...';
        button.disabled = true;

        setTimeout(() => {
            showNotification('Děkujeme za přihlášení k odběru novinek!', 'success');
            this.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const smokeEffect = document.querySelector('.smoke-effect');
    const donSilhouette = document.querySelector('.don-silhouette');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (smokeEffect) {
            smokeEffect.style.transform = `translateY(${rate}px)`;
        }

        if (donSilhouette && scrolled < window.innerHeight) {
            donSilhouette.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Menu Item Hover Effects
document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// Vintage Photo Rotation Effect
document.addEventListener('DOMContentLoaded', function () {
    const photoFrame = document.querySelector('.photo-frame');

    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', function () {
            this.style.transform = 'rotate(0deg) scale(1.05)';
        });

        photoFrame.addEventListener('mouseleave', function () {
            this.style.transform = 'rotate(-2deg) scale(1)';
        });
    }
});

// Easter Egg - Konami Code
document.addEventListener('DOMContentLoaded', function () {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated
                showNotification('🍕 Gratulujeme! Našli jste tajný kód! Získáváte 10% slevu na příští objednávku. Kód: FAMIGLIA10', 'success');
                konamiIndex = 0;

                // Add special effect
                document.body.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// Add shake animation to CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrolled >= sectionTop - window.innerHeight / 2 &&
            scrolled < sectionTop + sectionHeight) {
            section.classList.add('in-view');
        }
    });
}, 10));

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add CSS for order items dynamically
const orderItemsStyle = document.createElement('style');
orderItemsStyle.textContent = `
    .order-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--brown-medium);
    }
    
    .order-item:last-child {
        border-bottom: none;
    }
    
    .order-item-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .order-item-name {
        font-weight: 500;
        color: var(--cream);
    }
    
    .order-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--brown-light);
    }
    
    .quantity-btn {
        background: var(--brown-medium);
        color: var(--cream);
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        transition: background 0.3s ease;
    }
    
    .quantity-btn:hover {
        background: var(--gold);
        color: var(--primary-dark);
    }
    
    .order-item-price {
        font-weight: 600;
        color: var(--gold);
    }
`;
document.head.appendChild(orderItemsStyle);

// Global variables for menu system
let currentProduct = null;
let currentPrice = 0;
let currentQuantity = 1;

// Menu System
function initMenuSystem() {
    if (!menuData) return;

    const categoryNav = document.querySelector('.category-nav');
    const menuGrid = document.getElementById('menuGrid');
    const productModal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');

    let currentCategory = 'all';

    // Generate category navigation from menuData
    function generateCategoryNavigation() {
        let categoryHTML = '<button class="category-btn active" data-category="all">Vše</button>';

        menuData.categories.forEach(category => {
            categoryHTML += `<button class="category-btn" data-category="${category.name}">${category.name}</button>`;
        });

        categoryNav.innerHTML = categoryHTML;

        // Add event listeners to dynamically created buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                // Update active button
                categoryButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                currentCategory = this.dataset.category;
                renderMenuItems();
            });
        });
    }

    // Initialize category navigation
    generateCategoryNavigation();

    // Render menu items
    function renderMenuItems() {
        let itemsToShow = [];

        if (currentCategory === 'all') {
            // Show all items from all categories
            menuData.categories.forEach(category => {
                itemsToShow = itemsToShow.concat(category.products.map(product => ({
                    ...product,
                    categoryName: category.name
                })));
            });
        } else {
            // Show items from specific category
            const category = menuData.categories.find(cat => cat.name === currentCategory);
            if (category) {
                itemsToShow = category.products.map(product => ({
                    ...product,
                    categoryName: category.name
                }));
            }
        }

        // Render items
        menuGrid.innerHTML = itemsToShow.map(item => createMenuItemHTML(item)).join('');

        // Add click listeners to menu items
        menuGrid.querySelectorAll('.menu-item').forEach((item, index) => {
            item.addEventListener('click', () => openProductModal(itemsToShow[index]));
        });
    }

    // Create menu item HTML
    function createMenuItemHTML(item) {
        const basePrice = extractPrice(item.price);
        const imagePath = 'images/2pizza-cappone-placeholder-500x500.jpg';//item.image || 'pizza-cappone-placeholder-500x500.jpg';

        // Create sizes display
        let sizesHTML = '';
        if (item.sizes && Object.keys(item.sizes).length > 0) {
            sizesHTML = Object.entries(item.sizes).map(([size, price]) =>
                `<span class="size-option">${size}: ${price}</span>`
            ).join('');
        }

        return `
            <div class="menu-item" data-product='${JSON.stringify(item)}'>
                <div class="menu-item-image">
                    <img src="${imagePath}" alt="${item.name}" onerror="this.src='pizza-cappone-placeholder-500x500.jpg'">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${sizesHTML ? `<div class="menu-item-sizes">${sizesHTML}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Open product modal
    function openProductModal(product) {
        currentProduct = product;
        currentQuantity = 1;

        // Set product info
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductImage').src = 'images/2pizza-cappone-placeholder-500x500.jpg';//product.image || 'pizza-cappone-placeholder-500x500.jpg';

        // Setup sizes
        setupSizeSelection(product);

        // Setup ingredients
        setupIngredientsSelection(product);

        // Update price
        updateModalPrice();

        // Reset quantity
        document.querySelector('.quantity').textContent = currentQuantity;

        // Show modal
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Setup size selection
    function setupSizeSelection(product) {
        const sizeSelection = document.getElementById('sizeSelection');
        const sizeOptions = document.querySelector('.size-options');

        if (product.sizes && Object.keys(product.sizes).length > 0) {
            sizeSelection.style.display = 'block';
            sizeOptions.innerHTML = Object.entries(product.sizes).map(([size, price], index) =>
                `<button class="size-option-btn ${index === 0 ? 'active' : ''}" data-size="${size}" data-price="${price}">
                    ${size} - ${price}
                </button>`
            ).join('');

            // Add size selection listeners
            sizeOptions.querySelectorAll('.size-option-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    sizeOptions.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    updateModalPrice();
                });
            });
        } else {
            sizeSelection.style.display = 'none';
        }
    }

    // Setup ingredients selection
    function setupIngredientsSelection(product) {
        const ingredientsSelection = document.getElementById('ingredientsSelection');
        const ingredientsGrid = document.querySelector('.ingredients-grid');

        if (product.ingredients && product.ingredients.length > 0) {
            ingredientsSelection.style.display = 'block';
            ingredientsGrid.innerHTML = product.ingredients.map((ingredient, index) =>
                `<label class="ingredient-option">
                    <input type="checkbox" data-ingredient-price="${extractPrice(ingredient.price)}">
                    <span>${ingredient.name}</span>
                    <span class="ingredient-price">+${ingredient.price}</span>
                </label>`
            ).join('');

            // Add ingredient change listeners
            ingredientsGrid.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateModalPrice);
            });
        } else {
            ingredientsSelection.style.display = 'none';
        }
    }

    // Update modal price
    function updateModalPrice() {
        let basePrice = 0;

        // Get base price from selected size or default price
        const activeSize = document.querySelector('.size-option-btn.active');
        if (activeSize) {
            basePrice = extractPrice(activeSize.dataset.price);
        } else {
            basePrice = extractPrice(currentProduct.price);
        }

        // Add ingredient prices
        const selectedIngredients = document.querySelectorAll('.ingredients-grid input[type="checkbox"]:checked');
        let ingredientsPrice = 0;
        selectedIngredients.forEach(ingredient => {
            ingredientsPrice += parseInt(ingredient.dataset.ingredientPrice) || 0;
        });

        currentPrice = (basePrice + ingredientsPrice) * currentQuantity;
        document.getElementById('currentPrice').textContent = `${currentPrice} Kč`;
    }

    // Modal controls
    modalClose.addEventListener('click', closeProductModal);

    productModal.addEventListener('click', function (e) {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Quantity controls
    document.querySelector('.quantity-controls .minus').addEventListener('click', function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.querySelector('.quantity').textContent = currentQuantity;
            updateModalPrice();
        }
    });

    document.querySelector('.quantity-controls .plus').addEventListener('click', function () {
        currentQuantity++;
        document.querySelector('.quantity').textContent = currentQuantity;
        updateModalPrice();
    });

    // Add to cart
    document.querySelector('.add-to-cart').addEventListener('click', function () {
        if (!currentProduct) return;

        // Get selected options
        const selectedSize = document.querySelector('.size-option-btn.active');
        const selectedIngredients = Array.from(document.querySelectorAll('.ingredients-grid input[type="checkbox"]:checked'))
            .map(input => input.parentElement.querySelector('span').textContent);

        // Create order item
        let itemName = currentProduct.name;
        if (selectedSize) {
            itemName += ` (${selectedSize.dataset.size})`;
        }
        if (selectedIngredients.length > 0) {
            itemName += ` + ${selectedIngredients.join(', ')}`;
        }

        // Add to order (reuse existing order system)
        const pricePerItem = currentPrice / currentQuantity;
        for (let i = 0; i < currentQuantity; i++) {
            addToOrderFromModal(itemName, pricePerItem);
        }

        closeProductModal();
        showNotification(`${itemName} byl přidán do košíku!`, 'success');
    });

    // Close modal
    function closeProductModal() {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentProduct = null;
    }

    // Helper function to extract numeric price
    function extractPrice(priceString) {
        if (!priceString) return 0;
        const match = priceString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    // Add to order from modal (integrate with existing order system)
    function addToOrderFromModal(name, price) {
        // Get existing order system elements
        const orderItemsList = document.getElementById('orderItems');
        const totalPriceElement = document.getElementById('totalPrice');

        // Get current order items from the existing system
        let orderItems = [];
        const existingItems = orderItemsList.querySelectorAll('.order-item');
        existingItems.forEach(item => {
            const itemName = item.querySelector('.order-item-name').textContent;
            const quantityText = item.querySelector('.order-item-quantity').textContent;
            const quantity = parseInt(quantityText.match(/(\d+)x/)[1]);
            const itemPrice = parseInt(item.querySelector('.order-item-price').textContent.match(/(\d+)/)[1]) / quantity;

            orderItems.push({
                name: itemName,
                price: itemPrice,
                quantity: quantity
            });
        });

        // Add new item
        const existingItem = orderItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            orderItems.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        // Update display
        updateOrderDisplayFromModal(orderItems, orderItemsList, totalPriceElement);
    }

    // Update order display from modal
    function updateOrderDisplayFromModal(orderItems, orderItemsList, totalPriceElement) {
        if (orderItems.length === 0) {
            orderItemsList.innerHTML = '<p class="empty-order">Zatím nemáte vybrané žádné položky</p>';
            totalPriceElement.textContent = '0 Kč';
            return;
        }

        let html = '';
        let totalPrice = 0;

        orderItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            html += `
                <div class="order-item">
                    <div class="order-item-info">
                        <span class="order-item-name">${item.name}</span>
                        <span class="order-item-quantity">
                            <button type="button" class="quantity-btn minus" data-name="${item.name}">-</button>
                            ${item.quantity}x
                            <button type="button" class="quantity-btn plus" data-name="${item.name}">+</button>
                        </span>
                    </div>
                    <span class="order-item-price">${itemTotal} Kč</span>
                </div>
            `;
        });

        orderItemsList.innerHTML = html;
        totalPriceElement.textContent = `${totalPrice} Kč`;

        // Re-add event listeners for quantity buttons
        orderItemsList.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                // This would need to integrate with the main order system
                // For now, just show a message
                showNotification('Pro změnu množství použijte hlavní objednávkový formulář', 'info');
            });
        });
    }

    // Initial render
    renderMenuItems();

    // Make functions available globally for search system
    window.menuSystemAPI = {
        renderMenuItems,
        openProductModal,
        currentCategory,
        setCurrentCategory: (category) => {
            currentCategory = category;
            // Update active category button
            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
        }
    };
}

// Search System
function initSearchSystem() {
    const searchInput = document.getElementById('menuSearch');
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchFilterBar = document.getElementById('searchFilterBar');

    let searchTerm = '';
    let filteredItems = [];

    // Search input handler
    searchInput.addEventListener('input', debounce(function (e) {
        searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm.length > 0) {
            clearSearchBtn.style.display = 'block';
            performSearch();
        } else {
            clearSearchBtn.style.display = 'none';
            clearSearch();
        }
    }, 300));

    // Clear search button (now inline)
    clearSearchBtn.addEventListener('click', function () {
        searchInput.value = '';
        searchTerm = '';
        clearSearch();
        this.style.display = 'none';
        searchInput.focus();
    });

    // Sticky search bar effect
    window.addEventListener('scroll', debounce(() => {
        const menuSection = document.getElementById('menu');
        const menuSectionTop = menuSection.offsetTop;
        const headerHeight = document.querySelector('.header').offsetHeight;

        if (window.scrollY >= menuSectionTop - headerHeight - 20) {
            searchFilterBar.classList.add('scrolled');
        } else {
            searchFilterBar.classList.remove('scrolled');
        }
    }, 10));

    // Perform search
    function performSearch() {
        if (!menuData || !searchTerm) return;

        filteredItems = [];

        // Search through all categories and products
        menuData.categories.forEach(category => {
            category.products.forEach(product => {
                const searchableText = [
                    product.name,
                    product.description,
                    category.name
                ].join(' ').toLowerCase();

                if (searchableText.includes(searchTerm)) {
                    filteredItems.push({
                        ...product,
                        categoryName: category.name
                    });
                }
            });
        });

        renderSearchResults();
    }

    // Render search results
    function renderSearchResults() {
        const menuGrid = document.getElementById('menuGrid');

        if (filteredItems.length === 0) {
            menuGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-content">
                        <h3>Žádné výsledky</h3>
                        <p>Pro hledaný výraz "${searchTerm}" nebyly nalezeny žádné pokrmy.</p>
                        <button class="btn btn-secondary" onclick="document.getElementById('clearSearch').click()">
                            Vymazat vyhledávání
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Use existing menu item creation function
            menuGrid.innerHTML = filteredItems.map(item => createMenuItemHTML(item)).join('');

            // Add click listeners to search result items
            menuGrid.querySelectorAll('.menu-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    // Use the openProductModal function from the menu system API
                    if (window.menuSystemAPI && window.menuSystemAPI.openProductModal) {
                        window.menuSystemAPI.openProductModal(filteredItems[index]);
                    }
                });
            });

            // Highlight search terms in results
            highlightSearchTerms();
        }

        // Show search results count
        showSearchResultsCount();

        // Scroll to first product after search
        scrollToFirstProduct();
    }

    // Clear search and restore normal view
    function clearSearch() {
        searchTerm = '';
        filteredItems = [];

        // Restore normal menu view
        if (window.menuSystemAPI && window.menuSystemAPI.renderMenuItems) {
            window.menuSystemAPI.renderMenuItems();
        }

        // Hide search results count
        hideSearchResultsCount();
    }

    // Highlight search terms in results
    function highlightSearchTerms() {
        if (!searchTerm) return;

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const nameElement = item.querySelector('.menu-item-name');
            const descriptionElement = item.querySelector('.menu-item-description');

            if (nameElement) {
                nameElement.innerHTML = highlightText(nameElement.textContent, searchTerm);
            }
            if (descriptionElement) {
                descriptionElement.innerHTML = highlightText(descriptionElement.textContent, searchTerm);
            }
        });
    }

    // Highlight text helper function
    function highlightText(text, term) {
        if (!term) return text;

        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Show search results count
    function showSearchResultsCount() {
        let countElement = document.querySelector('.search-results-count');

        if (!countElement) {
            countElement = document.createElement('div');
            countElement.className = 'search-results-count';

            const container = searchFilterBar.querySelector('.container');
            container.appendChild(countElement);
        }

        const count = filteredItems.length;
        const plural = count === 1 ? 'výsledek' : count < 5 ? 'výsledky' : 'výsledků';
        countElement.textContent = `Nalezeno ${count} ${plural} pro "${searchTerm}"`;
        countElement.style.display = 'block';
    }

    // Hide search results count
    function hideSearchResultsCount() {
        const countElement = document.querySelector('.search-results-count');
        if (countElement) {
            countElement.style.display = 'none';
        }
    }

    // Scroll to first product after search
    function scrollToFirstProduct() {
        // Wait a bit for DOM to update
        setTimeout(() => {
            const firstProduct = document.querySelector('.menu-item');
            if (firstProduct) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const searchBarHeight = document.getElementById('searchFilterBar').offsetHeight;
                const targetPosition = firstProduct.offsetTop - headerHeight - searchBarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Create menu item HTML function (reuse from menu system)
    function createMenuItemHTML(item) {
        // const imagePath = item.image || 'images/2pizza-cappone-placeholder-500x500.jpg';
        const imagePath = 'images/2pizza-cappone-placeholder-500x500.jpg';

        // Create sizes display
        let sizesHTML = '';
        if (item.sizes && Object.keys(item.sizes).length > 0) {
            sizesHTML = Object.entries(item.sizes).map(([size, price]) =>
                `<span class="size-option">${size}: ${price}</span>`
            ).join('');
        }

        return `
            <div class="menu-item" data-product='${JSON.stringify(item)}'>
                <div class="menu-item-image">
                    <img src="${imagePath}" alt="${item.name}" onerror="this.src='pizza-cappone-placeholder-500x500.jpg'">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-name">${item.name}</h3>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    ${sizesHTML ? `<div class="menu-item-sizes">${sizesHTML}</div>` : ''}
                    <div class="menu-item-category">
                        <span class="category-badge">${item.categoryName}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Add search-related CSS dynamically
const searchStyle = document.createElement('style');
searchStyle.textContent = `
    .search-highlight {
        background: var(--gold);
        color: var(--primary-dark);
        padding: 0.1rem 0.2rem;
        border-radius: 3px;
        font-weight: 600;
    }
    
    .search-results-count {
        text-align: center;
        color: var(--brown-light);
        font-size: 0.9rem;
        margin-top: 0.5rem;
        font-style: italic;
        display: none;
    }
    
    .no-results {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        text-align: center;
    }
    
    .no-results-content h3 {
        color: var(--gold);
        font-family: var(--font-serif);
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }
    
    .no-results-content p {
        color: var(--brown-light);
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
    }
    
    .category-badge {
        background: rgba(139, 69, 19, 0.3);
        color: var(--brown-light);
        padding: 0.2rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        border: 1px solid var(--brown-medium);
    }
    
    .menu-item-category {
        margin-top: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .search-results-count {
            font-size: 0.8rem;
            margin-top: 0.3rem;
        }
        
        .no-results-content h3 {
            font-size: 1.5rem;
        }
        
        .no-results-content p {
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(searchStyle);
