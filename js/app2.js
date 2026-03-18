// =============================================================================
//  PRODUCTS DATA
// This array contains all product information used in the store
// Each object represents a single product
// =============================================================================
const products = [
    {
        id: 1,
        title: "MOUNTAIN HOODIE",
        price: 350,
        sizes: { S: 350, M: 350, L: 350, XL: 380 },
        image: "./images/pac1.jpeg", 
        thumbs: [
            "./images/pac1.jpeg",
            "./images/pac2.jpeg",
            "./images/pac3.jpeg",
            "./images/pac4.jpeg",
            "./images/pac5.jpeg",
            "./images/pac6.jpeg",
           
           
        ],
        desc: "Modern mountain-inspired design. Heavyweight fabric perfect for winter.",
        material: "80% Cotton / 20% Polyester",
        ref: "SW-MNT-01"
    },
    {
        id: 2,
        title: "URBAN BLACK",
        price: 320,
        sizes: { S: 320, M: 320, L: 320, XL: 350 },
        image: "./images/pac2.jpeg", 
        thumbs: [
            "./images/pac2.jpeg",
            "./images/pac1.jpeg",
            "./images/pac3.jpeg",
            "./images/pac4.jpeg",
            "./images/pac5.jpeg",
            "./images/pac6.jpeg",
            
           
        ],
        desc: "Elegant classic black that fits all daily styles.",
        material: "100% Cotton",
        ref: "SW-URB-02"
    },
    {
        id: 3,
        title: "OVERSIZED T-SHIRT",
        price: 299,
        sizes: { S: 299, M: 299, L: 320, XL: 320 },
        image: "./images/pac3.jpeg",
        thumbs: [
            "./images/pac3.jpeg",
            "./images/pac1.jpeg",
            "./images/pac2.jpeg",
            "./images/pac4.jpeg",
            "./images/pac5.jpeg",
            "./images/pac6.jpeg",
            
           
        ],
        desc: "Exclusive design featuring the brand logo on the chest.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-LOG-03"
    },
    {
        id: 4,
        title: "STREET LOGO",
        price: 209,
        sizes: { S: 209, M: 209, L: 320, XL: 320 },
        image: "./images/pac4.jpeg",
        thumbs: [
            "./images/pac4.jpeg",
            "./images/pac1.jpeg",
            "./images/pac2.jpeg",
            "./images/pac3.jpeg",
            "./images/pac5.jpeg",
            "./images/pac6.jpeg",
           
            
        ],
        desc: "Exclusive design featuring the brand logo on the chest.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-LOG-04"
    },
    {
        id: 5,
        title: "STREET LOGO",
        price: 329,
        sizes: { S: 329, M: 299, L: 330, XL: 330 },
        image: "./images/pac5.jpeg",
        thumbs: [
            "./images/pac5.jpeg",
            "./images/pac1.jpeg",
            "./images/pac2.jpeg",
            "./images/pac3.jpeg",
            "./images/pac6.jpeg",
          
            
        ],
        desc: "Exclusive design featuring the brand logo on the chest.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-LOG-05"
    },
    {
        id: 6,
        title: "OVERSIZED T-SHIRT",
        price: 300,
        sizes: { S: 300, M: 299, L: 320, XL: 320 },
        image: "./images/pac6.jpeg",
        thumbs: [
            "./images/pac6.jpeg",
            "./images/pac1.jpeg",
            "./images/pac2.jpeg",
            "./images/pac3.jpeg",
            "./images/pac5.jpeg",
           
           
        ],
        desc: "Exclusive design featuring the brand logo on the chest.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-LOG-06"
    },
    
    
];
// =============================================================================
//  GLOBAL STATE
// Stores current app state (selected product, size, cart, etc.)
// =============================================================================       

let currentProductIndex = 0;
let currentSize = 'M';
let currentPrice = 0;
let cart = [];

// =============================================================================
//  DOM ELEMENTS
// Cache all important DOM elements for better performance
// =============================================================================
const mainImage = document.getElementById('mainImage');
const productTitle = document.getElementById('productTitle');
const productDesc = document.getElementById('productDesc');
const productPrice = document.getElementById('productPrice');
const productMaterial = document.getElementById('productMaterial');
const productRef = document.getElementById('productRef');
const bgText = document.getElementById('bgText');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const mobileThumbnails = document.getElementById('mobileThumbnails');
const sizeButtons = document.querySelectorAll('.size-btn');
const buyBtn = document.getElementById('buyBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');

// =============================================================================
//  INIT FUNCTION
// Runs when page loads
// - Restore saved product
// - Render thumbnails
// - Load selected product
// - Hide loader animation
// =============================================================================
function init() {
    const savedIndex = localStorage.getItem('selectedProductIndex');
    if (savedIndex !== null) {
        currentProductIndex = parseInt(savedIndex);
    }
    
    renderThumbnails();
    loadProduct(currentProductIndex);
    
    setTimeout(() => {
        anime({
            targets: '#loader',
            opacity: 0,
            duration: 800,
            easing: 'easeOutQuad',
            complete: () => document.getElementById('loader').style.display = 'none'
        });
    }, 1000);
}

function renderThumbnails() {
    thumbnailContainer.innerHTML = '';
    mobileThumbnails.innerHTML = '';
    products.forEach((prod, index) => {
        const btn = document.createElement('button');
        btn.className = `w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${index === currentProductIndex ? 'border-brand-accent' : 'border-transparent opacity-60 hover:opacity-100'}`;
        btn.innerHTML = `<img src="${prod.thumbs[0]}" class="w-full h-full object-cover">`;
        btn.onclick = () => loadProduct(index);
        thumbnailContainer.appendChild(btn);

        const mobBtn = document.createElement('button');
        mobBtn.className = `flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${index === currentProductIndex ? 'border-brand-accent' : 'border-transparent'}`;
        mobBtn.innerHTML = `<img src="${prod.thumbs[0]}" class="w-full h-full object-cover">`;
        mobBtn.onclick = () => loadProduct(index);
        mobileThumbnails.appendChild(mobBtn);
    });
}
function showNextProduct() {
    const totalProducts = products.length;
    currentProductIndex = (currentProductIndex + 1) % totalProducts;
    loadProduct(currentProductIndex);
    
    const activeThumb = thumbnailContainer.children[currentProductIndex];
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}


function showPrevProduct() {
    const totalProducts = products.length;
    currentProductIndex = (currentProductIndex - 1 + totalProducts) % totalProducts;
    loadProduct(currentProductIndex);
    
    const activeThumb = thumbnailContainer.children[currentProductIndex];
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function loadProduct(index) {
    currentProductIndex = index;
    const product = products[index];

    document.querySelectorAll('#thumbnailContainer button').forEach((btn, i) => {
        btn.className = `w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === index ? 'border-brand-accent' : 'border-transparent opacity-60'}`;
    });

    document.querySelectorAll('#mobileThumbnails button').forEach((btn, i) => {
        btn.className = `flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${i === index ? 'border-brand-accent' : 'border-transparent'}`;
    });

    anime({
        targets: [mainImage, productTitle, productDesc, productPrice],
        opacity: [1, 0],
        translateY: [0, 20],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
            mainImage.src = product.image;
            productTitle.innerHTML = product.title.replace(' ', '<br>');
            productDesc.innerText = product.desc;
            productMaterial.innerText = product.material;
            productRef.innerText = product.ref;
            bgText.innerText = product.title.split(' ')[0];
            currentSize = 'M';
            updatePriceDisplay();

            anime({
                targets: [mainImage, productTitle, productDesc, productPrice],
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(100),
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    });
}

function updatePriceDisplay() {
    const product = products[currentProductIndex];
    const price = product.sizes[currentSize];
    currentPrice = price;
    
    anime({
        targets: productPrice,
        innerHTML: [0, price],
        round: 1,
        duration: 1000,
        easing: 'easeOutExpo',
        update: function(a) {
            productPrice.innerHTML = a.animations[0].currentValue.toFixed(0);
        }
    });

    sizeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.size === currentSize);
    });
}

function addToCart() {
    const product = products[currentProductIndex];
    const existingItem = cart.find(item => item.id === product.id && item.size === currentSize);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            size: currentSize,
            price: currentPrice,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartOverlay();
    
    cartCount.classList.add('cart-badge-pulse');
    setTimeout(() => cartCount.classList.remove('cart-badge-pulse'), 500);
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.innerText = totalItems;
    document.getElementById('cartTotal').innerText = totalPrice + ' DH';
    
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
        
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="flex-1">
                    <h4 class="font-bold text-sm mb-1">${item.title}</h4>
                    <p class="text-xs text-gray-400 mb-2">Size: ${item.size} | ${item.price} DH</p>
                    <div class="flex items-center gap-3">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="font-bold w-8 text-center">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-300 transition">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    cartOverlay.classList.toggle('active');
    if (cartOverlay.classList.contains('active')) {
        updateCartUI();
    }
}

function closeCartOverlay(event) {
    if (event.target === cartOverlay) {
        toggleCart();
    }
}

function showCartOverlay() {
    cartOverlay.classList.add('active');
    updateCartUI();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("L-panier khawi!");
        return;
    }

    const phoneNumber = "212608173585"; // Dir r-rqm dialek hna
    let message = "COMMANDE STREETWEAR\n";
    message += "--------------------------\n\n";

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        message += `${index + 1}. ${item.title}\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Qty: ${item.quantity}\n`;
        message += `   Prix: ${subtotal} DH\n\n`;
        total += subtotal;
    });

    message += "--------------------------\n";
    message += `TOTAL A PAYER: ${total} DH\n`;
    message += "--------------------------\n";
    message += "Merci de confirmer la disponibilite.";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

function goBack() {
    window.location.href = 'index.html';
}

addToCartBtn.addEventListener('click', addToCart);

buyBtn.addEventListener('click', () => {
    // 1. Get product data
    const product = products[currentProductIndex];

    // 2. Validation (Check Size)
    if (!currentSize || currentSize === "") {
        Swal.fire({
            title: 'Smah lina!',
            text: '3afak khtar l-qyas (Size) qbel ma t-commander.',
            icon: 'warning',
            confirmButtonText: 'Ok, fhamt',
            confirmButtonColor: '#000',
            background: '#fff'
        });
        return; // Hna kanحبsu l-process ila makanch size
    }

    // 3. Build the clean message
    let message = "COMMANDE DIRECTE\n";
    message += "--------------------------\n";
    message += `Produit : ${product.title}\n`;
    message += `Ref     : ${product.ref}\n`;
    message += `Size    : ${currentSize}\n`;
    message += `Prix    : ${currentPrice} DH\n`;
    message += "--------------------------\n";
    message += `Lien Image : ${product.image}\n\n`;
    message += "Merci de confirmer la disponibilite.";

    // 4. Safe URL Encoding
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // 5. Open WhatsApp
    window.open(whatsappUrl, '_blank');
});

sizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentSize = e.target.dataset.size;
        updatePriceDisplay();
    });
});

window.addEventListener('DOMContentLoaded', init);
