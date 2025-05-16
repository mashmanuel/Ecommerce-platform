// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Product Data with 10 Items
    const products = [
        {
            id: 1,
            name: 'Premium Denim Jacket',
            price: 89.99,
            image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg'
        },
        {
            id: 2,
            name: 'Leather Tote Bag',
            price: 129.99,
            image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'
        },
        {
            id: 3,
            name: 'Classic White Sneakers',
            price: 75.00,
            image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
        },
        {
            id: 4,
            name: 'Black Leather Backpack',
            price: 149.99,
            image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg'
        },
        {
            id: 5,
            name: 'Silver-Tone Watch',
            price: 199.99,
            image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'
        },
        {
            id: 6,
            name: 'Knit Beanie Hat',
            price: 29.99,
            image: 'https://images.pexels.com/photos/35185/hats-fedora-hat-manufacture-stack.jpg'
        },
        {
            id: 7,
            name: 'Aviator Sunglasses',
            price: 89.99,
            image: 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg'
        },
        {
            id: 8,
            name: 'Woolen Scarf',
            price: 45.00,
            image: 'https://images.pexels.com/photos/6634370/pexels-photo-6634370.jpeg'
        },
        {
            id: 9,
            name: 'Formal Dress Shirt',
            price: 59.99,
            image: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg'
        },
        {
            id: 10,
            name: 'Tailored Slim Jeans',
            price: 79.99,
            image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
        }
    ];

    // Cart System
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update Cart Counter
    function updateCartCount() {
        const cartCounts = document.querySelectorAll('#cartCount');
        cartCounts.forEach(element => {
            element.textContent = cart.length;
        });
    }

    // Product Rendering
    function renderProducts(containerId) {
        const productContainer = document.getElementById(containerId);
        if(productContainer) {
            productContainer.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Cart Page Rendering
    function renderCartPage() {
        const cartContents = document.getElementById('cartContents');
        const totalAmount = document.getElementById('totalAmount');
        
        if(cartContents) {
            cartContents.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `).join('');
            
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            totalAmount.textContent = total.toFixed(2);
        }
    }

    // Event Handlers
    document.addEventListener('click', (e) => {
        // Add to Cart
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }

        // Remove from Cart
        if(e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartPage();
            updateCartCount();
        }
    });

    // Form Submissions
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
        e.target.reset();
    });

    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will respond within 24 hours.');
        e.target.reset();
    });

    // Page Initialization
    renderProducts('productContainer');  // Homepage
    renderProducts('allProducts');       // Products Page
    if(window.location.pathname.includes('cart.html')) renderCartPage();
    updateCartCount();
});