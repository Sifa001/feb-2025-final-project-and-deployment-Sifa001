// Main JavaScript File

// DOM Elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');
const scrollTop = document.querySelector('#scroll-top');

// Product Data
const products = [
    {
        id: 1,
        name: 'Modern Sofa',
        price: 500,
        category: 'sofa',
        image: 'pictures/picture1.jpg',
        rating: 4.5,
        description: 'Luxurious modern sofa with premium upholstery'
    },
    {
        id: 2,
        name: 'Wooden Chair',
        price: 100,
        category: 'chair',
        image: 'pictures/picture2.jpg',
        rating: 4,
        description: 'Handcrafted wooden chair with ergonomic design'
    },
    {
        id: 3,
        name: 'Dining Set',
        price: 700,
        category: 'dining',
        image: 'pictures/picture3.jpg',
        rating: 5,
        description: 'Elegant 6-piece dining set for family gatherings'
    },
    {
        id: 4,
        name: 'Complementary Sofa',
        price: 800,
        category: 'sofa',
        image: 'pictures/picture4.jpg',
        rating: 4.5,
        description: 'Stylish complementary sofa for your living space'
    },
    {
        id: 5,
        name: 'BookShelf',
        price: 200,
        category: 'decor',
        image: 'pictures/picture5.jpg',
        rating: 4,
        description: 'Modern bookshelf with ample storage space'
    },
    {
        id: 6,
        name: 'Modern Lamp',
        price: 200,
        category: 'decor',
        image: 'pictures/picture6.jpg',
        rating: 3.5,
        description: 'Contemporary lamp with adjustable brightness'
    },
    {
        id: 7,
        name: 'Orange Sofa',
        price: 600,
        category: 'sofa',
        image: 'pictures/picture7.jpg',
        rating: 4.5,
        description: 'Vibrant orange sofa with premium comfort',
        new: true
    },
    {
        id: 8,
        name: 'Gray Dining Set',
        price: 700,
        category: 'dining',
        image: 'pictures/picture8.jpg',
        rating: 5,
        description: 'Minimalist gray dining set for modern homes',
        new: true
    },
    {
        id: 9,
        name: 'Kitchen Stools',
        price: 400,
        category: 'chair',
        image: 'pictures/picture9.jpg',
        rating: 4,
        description: 'Set of 3 stylish kitchen stools',
        new: true
    }
];

// Shopping Cart
let cartItems = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load products
    displayProducts();
    displayNewProducts();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize cart from localStorage
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        updateCart();
    }
    
    // Add event listeners
    setupEventListeners();
    
    // Initialize animations
    initAnimations();
});

// Display all products
function displayProducts() {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productBox = document.createElement('div');
        productBox.className = 'product-box fade-in';
        productBox.dataset.category = product.category;
        
        productBox.innerHTML = `
            ${product.new ? '<span class="product-tag">New</span>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-price">
                    <h3>${product.name}</h3>
                    <span>$${product.price}</span>
                </div>
                <div class="stars">
                    ${getStarRating(product.rating)}
                </div>
                <button class="add-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        productContainer.appendChild(productBox);
    });
}

// Display new products
function displayNewProducts() {
    const newContainer = document.querySelector('.new-container');
    newContainer.innerHTML = '';
    
    const newProducts = products.filter(product => product.new);
    
    newProducts.forEach(product => {
        const productBox = document.createElement('div');
        productBox.className = 'product-box fade-in';
        
        productBox.innerHTML = `
            <span class="product-tag">New</span>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-price">
                    <h3>${product.name}</h3>
                    <span>$${product.price}</span>
                </div>
                <div class="stars">
                    ${getStarRating(product.rating)}
                </div>
                <button class="add-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        newContainer.appendChild(productBox);
    });
}

// Generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Menu toggle
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        cart.classList.remove('active');
    });
  }
  // Cart toggle
    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('active');
        navbar.classList.remove('active');
    });
    
    // Close cart
    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });
    
    // Add to cart
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Scroll to top
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });