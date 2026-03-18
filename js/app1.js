const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');

let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    // Toggle class "active" (hadi hya lli kat-tl3 u thbbet l-menu)
    mobileMenu.classList.toggle('active');

    if (isMenuOpen) {
        // Icon Animation (X)
        line1.style.transform = "translateY(4.5px) rotate(45deg)";
        line2.style.transform = "translateY(-4.5px) rotate(-45deg)";
        line1.style.background = "#00A3FF"; // Stitch Blue fach it-fth
    } else {
        // Icon Reset
        line1.style.transform = "none";
        line2.style.transform = "none";
        line1.style.background = "white";
    }
});

// Sedd l-menu fach t-cliqui 3la chi link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        line1.style.transform = "none";
        line2.style.transform = "none";
        isMenuOpen = false;
    });
});
// --- DATA ---
const products = [
    {
        id: 1,
        title: "626 HEAVY HOODIE",
        shortTitle: "HEAVY HOODIE",
        price: 350,
        sizes: { S: 350, M: 350, L: 350, XL: 380 },
        image: "./images/pac1.jpeg",
        thumbs: ["./images/pac1.jpeg", "./images/pac2.jpeg", "./images/pac3.jpeg"],
        desc: "Modern mountain-inspired design with double stitching for durability. Wind-resistant heavyweight fabric perfect for winter street style.",
        material: "80% Cotton / 20% Polyester",
        ref: "SW-626-01",
        color: "stitch-blue"
    },
    {
        id: 2,
        title: "ANGEL PINK TEE",
        shortTitle: "PINK TEE",
        price: 220,
        sizes: { S: 220, M: 220, L: 240, XL: 240 },
        image: "./images/pac2.jpeg",
        thumbs: ["./images/pac2.jpeg", "./images/pac1.jpeg", "./images/pac3.jpeg"],
        desc: "Elegant classic design featuring our signature pink accent. Soft cotton blend for all-day comfort in urban environments.",
        material: "100% Premium Cotton",
        ref: "SW-ANG-02",
        color: "stitch-pink"
    },
    {
        id: 3,
        title: "SPACE CARGO",
        shortTitle: "CARGO",
        price: 450,
        sizes: { S: 450, M: 450, L: 480, XL: 480 },
        image: "./images/pac3.jpeg",
        thumbs: ["./images/pac3.jpeg", "./images/pac1.jpeg", "./images/pac2.jpeg"],
        desc: "Futuristic cargo design with multiple pockets and utility straps. Premium materials for the ultimate streetwear statement.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-SPC-03",
        color: "stitch-blue"
    },
    {
        id: 4,
        title: "STREET LOGO",
        shortTitle: "LOGO TEE",
        price: 299,
        sizes: { S: 299, M: 299, L: 320, XL: 320 },
        image: "./images/pac4.jpeg",
        thumbs: ["./images/pac4.jpeg", "./images/pac1.jpeg", "./images/pac2.jpeg"],
        desc: "Exclusive design featuring the OHANA 626 brand logo on the chest. Minimalist aesthetic with maximum impact.",
        material: "70% Cotton / 30% Polyester",
        ref: "SW-LOG-04",
        color: "stitch-blue"
    },
    {
        id: 5,
        title: "URBAN BLACK",
        shortTitle: "URBAN",
        price: 320,
        sizes: { S: 320, M: 320, L: 320, XL: 350 },
        image: "./images/pac5.jpeg",
        thumbs: ["./images/pac5.jpeg", "./images/pac1.jpeg", "./images/pac2.jpeg"],
        desc: "Elegant classic black that fits all daily styles. Essential piece for any streetwear collection with premium finish.",
        material: "100% Heavy Cotton",
        ref: "SW-URB-05",
        color: "stitch-blue"
    },
    {
        id: 6,
        title: "NIGHT RUNNER",
        shortTitle: "RUNNER",
        price: 380,
        sizes: { S: 380, M: 380, L: 400, XL: 400 },
        image: "./images/pac6.jpeg",
        thumbs: ["./images/pac6.jpeg", "./images/pac1.jpeg", "./images/pac2.jpeg"],
        desc: "Technical wear designed for night movement. Reflective details and breathable fabric for active lifestyle.",
        material: "85% Polyester / 15% Spandex",
        ref: "SW-NGT-06",
        color: "stitch-pink"
    }
];

// --- STATE ---
let currentProductIndex = 0;
let currentSize = 'M';
let currentPrice = 0;

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initScrollEffects();
    initSizeButtons();
    initGridAnimations();
});

// --- CANVAS ANIMATION (Page 1 Hero) ---
function initCanvas() {
    const canvas = document.getElementById('hoodieCanvas');
    const context = canvas.getContext('2d');

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const frameCount = isMobile ? 16 : 18;
    const images = [];
    const hoodieState = { frame: 0 };

    canvas.width = 800;
    canvas.height = 800;

    // Load images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
    
        if (isMobile) {
            // MOBILE (jpg)
            img.src = `images/ezgif-frame-${i.toString().padStart(2, '0')}.jpg`;
        } else {
            // DESKTOP (png)
            img.src = `images/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
        }
    
        images.push(img);
    }

    const scrollAnimation = anime({
        targets: hoodieState,
        frame: frameCount - 1,
        round: 1,
        easing: 'linear',
        autoplay: false,
        update: () => {
            render();
        
        const progress = hoodieState.frame / frameCount;
        const ui = document.getElementById('uiLayer');

            ui.style.opacity = progress > 0.05 ? 1 - (progress * 2) : 1;
            ui.style.transform = `scale(${1 - progress * 0.05})`;
        }
    });

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (images[hoodieState.frame] && images[hoodieState.frame].complete) {
            context.drawImage(
                images[hoodieState.frame],
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }

    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        window.scrollY > 50
            ? header.classList.add('scrolled')
            : header.classList.remove('scrolled');

        const space = document.querySelector('.scroll-space');

        let progress =
            (window.pageYOffset - space.offsetTop) /
            (space.offsetHeight - window.innerHeight);

        scrollAnimation.seek(
            Math.max(0, Math.min(1, progress)) * scrollAnimation.duration
    );

    // Progress bar
    const scrollPercent =
        (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

    document.getElementById('scrollBar').style.width =
        scrollPercent + '%';
    });

    images[0].onload = render;
}
// --- GRID ANIMATIONS ---
function initGridAnimations() {
    // Animate items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.grid-item').forEach(item => observer.observe(item));
}

// --- OPEN PRODUCT (Navigate to Page 2) ---
function openProduct(index) {
    currentProductIndex = index;
    const productId = products[index].id;

    window.location.href = `index2.html?id=${productId}`;
    
    window.scrollTo(0, 0);

    // Load product data
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productDesc').textContent = product.desc;
    document.getElementById('productMaterial').textContent = product.material;
    document.getElementById('productRef').textContent = product.ref;
    document.getElementById('mainImage').src = product.image;

    // Load thumbnails
    const thumbContainer = document.getElementById('thumbnailContainer');
    const mobileThumbContainer = document.getElementById('mobileThumbnails');
    
    thumbContainer.innerHTML = product.thumbs.map((thumb, i) => `
        <img src="${thumb}" class="thumb-img w-full aspect-square object-cover ${i === 0 ? 'active' : ''}" onclick="changeImage('${thumb}', this)">
    `).join('');

    mobileThumbContainer.innerHTML = product.thumbs.map((thumb, i) => `
        <img src="${thumb}" class="thumb-img w-20 h-20 flex-shrink-0 object-cover ${i === 0 ? 'active' : ''}" onclick="changeImage('${thumb}', this)">
    `).join('');

    // Set initial size and price
    currentSize = 'M';
    updatePriceDisplay();

    // Animate entrance
    anime({
        targets: '#page2 .glass-panel, #page2 h1, #page2 h2',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
    });
}

// --- GO BACK ---
function goBack() {
    document.getElementById('index').style.display = 'none';
    document.getElementById('page1').style.display = 'block';
    window.scrollTo(0, 0);
}

// --- CHANGE IMAGE ---
function changeImage(src, element) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumb-img').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// --- SIZE SELECTION ---
function initSizeButtons() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentSize = e.target.dataset.size;
            updatePriceDisplay();
        });
    });
}

function updatePriceDisplay() {
    const product = products[currentProductIndex];
    const price = product.sizes[currentSize];
    currentPrice = price;
    
    anime({
        targets: '#productPrice',
        innerHTML: [0, price],
        round: 1,
        duration: 1000,
        easing: 'easeOutExpo',
        update: function(a) {
            document.getElementById('productPrice').innerHTML = a.animations[0].currentValue.toFixed(0);
        }
    });
}

// --- WHATSAPP ORDER ---

document.getElementById('buyBtn').addEventListener('click', () => {
    const product = products[currentProductIndex];
    const phoneNumber = "212608173585";

    const message = `
        OHANA 626 ORDER

        ━━━━━━━━━━━━━━━━━━━━━━
        Product: ${product.title}
        Ref: ${product.ref}
        Size: ${currentSize}
        Price: ${currentPrice} DH

        ━━━━━━━━━━━━━━━━━━━━━━
        Delivery Info:
        Name:simo -> exmple
        City: tanger -> exmple
        Address: 123 Main St -> exmple

        Thank you 🤝
    `;

    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});

// --- SCROLL EFFECTS ---
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scrollBar').style.width = scrollPercent + '%';
    });
}

function initStackingEffect() {
    const cards = document.querySelectorAll('.sticky-card');

    const observerOptions = {
        threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(cards).indexOf(entry.target);

            if (entry.isIntersecting) {
    
                anime({
                    targets: entry.target.querySelectorAll('.reveal'),
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(100)
                });
            }

            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                entry.target.classList.add('is-covered');
            } else {
                entry.target.classList.remove('is-covered');
            }
    });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', initStackingEffect);

