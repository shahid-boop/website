// Premium Villa 3D Liquid Glass - Elite Home Care
// Full Application with Three.js Villa Scene + Bilingual System

// ==================== GLOBAL STATE ====================
let scene, camera, renderer, villa, animationId;
let currentLang = 'en';
const PHONE_NUMBER = '966597865115'; // Used only for functional links
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;
const PHONE_URL = `tel:+${PHONE_NUMBER}`;

// ==================== BILINGUAL CONTENT ====================
const content = {
    // Services Data
    services: [
        {
            id: 'ac',
            icon: '❄️',
            titleEn: 'Air Conditioning Services',
            titleAr: 'خدمات التكييف',
            descEn: 'Expert AC installation, maintenance and repair for all cooling systems',
            descAr: 'تركيب وصيانة وإصلاح أنظمة التكييف بخبرة عالية',
            category: 'cooling'
        },
        {
            id: 'plumbing',
            icon: '🚰',
            titleEn: 'Plumbing Solutions',
            titleAr: 'حلول السباكة',
            descEn: 'Professional plumbing repairs, installations and leak detection',
            descAr: 'إصلاحات وتركيب السباكة وكشف التسربات باحترافية',
            category: 'plumbing'
        },
        {
            id: 'electrical',
            icon: '⚡',
            titleEn: 'Electrical Works',
            titleAr: 'الأعمال الكهربائية',
            descEn: 'Licensed electricians for wiring, repairs and installations',
            descAr: 'كهربائيون معتمدون للأسلاك والإصلاحات والتركيبات',
            category: 'electrical'
        },
        {
            id: 'painting',
            icon: '🎨',
            titleEn: 'Painting & Decoration',
            titleAr: 'الدهان والديكور',
            descEn: 'Premium painting services with quality finishes and decoration',
            descAr: 'خدمات دهان فاخرة مع تشطيبات عالية الجودة وديكور',
            category: 'painting'
        },
        {
            id: 'carpentry',
            icon: '🔨',
            titleEn: 'Carpentry Services',
            titleAr: 'خدمات النجارة',
            descEn: 'Custom woodwork, furniture repair and carpentry solutions',
            descAr: 'نجارة مخصصة وإصلاح الأثاث وحلول النجارة',
            category: 'carpentry'
        },
        {
            id: 'cleaning',
            icon: '✨',
            titleEn: 'Deep Cleaning',
            titleAr: 'التنظيف العميق',
            descEn: 'Thorough deep cleaning services for homes and villas',
            descAr: 'خدمات التنظيف العميق الشامل للمنازل والفلل',
            category: 'cleaning'
        },
        {
            id: 'pest',
            icon: '🦟',
            titleEn: 'Pest Control',
            titleAr: 'مكافحة الحشرات',
            descEn: 'Safe and effective pest control and prevention services',
            descAr: 'خدمات مكافحة الحشرات الآمنة والفعالة',
            category: 'pest'
        },
        {
            id: 'waterproofing',
            icon: '💧',
            titleEn: 'Waterproofing',
            titleAr: 'العزل المائي',
            descEn: 'Professional waterproofing for roofs and surfaces',
            descAr: 'عزل مائي احترافي للأسطح والجدران',
            category: 'waterproofing'
        },
        {
            id: 'tiles',
            icon: '⬜',
            titleEn: 'Tiles & Flooring',
            titleAr: 'البلاط والأرضيات',
            descEn: 'Expert tile installation, repair and flooring services',
            descAr: 'تركيب وإصلاح البلاط والأرضيات بخبرة عالية',
            category: 'tiles'
        },
        {
            id: 'gypsum',
            icon: '🏗️',
            titleEn: 'Gypsum Works',
            titleAr: 'أعمال الجبس',
            descEn: 'Decorative gypsum ceilings and partition walls',
            descAr: 'أسقف جبسية ديكورية وجدران فاصلة',
            category: 'gypsum'
        },
        {
            id: 'garden',
            icon: '🌳',
            titleEn: 'Garden Maintenance',
            titleAr: 'صيانة الحدائق',
            descEn: 'Professional landscaping and garden care services',
            descAr: 'خدمات تنسيق ورعاية الحدائق المحترفة',
            category: 'garden'
        },
        {
            id: 'renovation',
            icon: '🏡',
            titleEn: 'Complete Renovation',
            titleAr: 'التجديد الكامل',
            descEn: 'Full home and villa renovation project management',
            descAr: 'إدارة مشاريع تجديد المنازل والفلل الكاملة',
            category: 'renovation'
        }
    ],

    // Gallery Items
    gallery: [
        { category: 'all', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
        { category: 'plumbing', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4eac?w=600' },
        { category: 'electrical', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600' },
        { category: 'painting', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600' },
        { category: 'cooling', image: 'https://images.unsplash.com/photo-1631545804407-6f0af67a6fc8?w=600' },
        { category: 'cleaning', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600' },
        { category: 'carpentry', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' },
        { category: 'renovation', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600' }
    ],

    // Reviews
    reviews: [
        {
            nameEn: 'Mohammed Al-Rashid',
            nameAr: 'محمد الراشد',
            textEn: 'Exceptional service! They renovated our entire villa with outstanding attention to detail.',
            textAr: 'خدمة استثنائية! جددوا فيلتنا بالكامل باهتمام رائع بالتفاصيل.',
            rating: 5
        },
        {
            nameEn: 'Fatima Al-Saud',
            nameAr: 'فاطمة آل سعود',
            textEn: 'Professional team, excellent quality work. Highly recommended for luxury properties.',
            textAr: 'فريق محترف، جودة عمل ممتازة. موصى به بشدة للعقارات الفاخرة.',
            rating: 5
        },
        {
            nameEn: 'Abdullah Al-Qahtani',
            nameAr: 'عبدالله القحطاني',
            textEn: 'Fast emergency response and perfect repairs. Very satisfied with their service.',
            textAr: 'استجابة طوارئ سريعة وإصلاحات مثالية. راضٍ جداً عن خدمتهم.',
            rating: 5
        },
        {
            nameEn: 'Sara Al-Mutairi',
            nameAr: 'سارة المطيري',
            textEn: 'Outstanding craftsmanship! They transformed our home beautifully.',
            textAr: 'حرفية متميزة! حولوا منزلنا بشكل جميل للغاية.',
            rating: 5
        }
    ],

    // Service Areas
    areas: [
        { nameEn: 'Riyadh', nameAr: 'الرياض', icon: '🏛️' },
        { nameEn: 'Jeddah', nameAr: 'جدة', icon: '🌊' },
        { nameEn: 'Dammam', nameAr: 'الدمام', icon: '🏢' },
        { nameEn: 'Khobar', nameAr: 'الخبر', icon: '🏙️' },
        { nameEn: 'Makkah', nameAr: 'مكة', icon: '🕋' },
        { nameEn: 'Madinah', nameAr: 'المدينة', icon: '🕌' },
        { nameEn: 'Taif', nameAr: 'الطائف', icon: '⛰️' },
        { nameEn: 'Jubail', nameAr: 'الجبيل', icon: '🏭' }
    ]
};

// ==================== THREE.JS VILLA SCENE ====================
function initVillaScene() {
    const canvas = document.getElementById('villa-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x091321, 10, 50);

    // Camera
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 3, 15);
    camera.lookAt(0, 2, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xffffff, 0.8);
    moonLight.position.set(10, 20, 10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    moonLight.shadow.camera.near = 0.5;
    moonLight.shadow.camera.far = 50;
    scene.add(moonLight);

    const goldLight = new THREE.PointLight(0xC9A66B, 1, 20);
    goldLight.position.set(-5, 5, 5);
    scene.add(goldLight);

    const accentLight = new THREE.PointLight(0xE3C99B, 0.6, 15);
    accentLight.position.set(5, 3, -5);
    scene.add(accentLight);

    // Build Luxury Villa
    buildLuxuryVilla();

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a1628,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Stars
    createStars();

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize);

    // Mouse parallax
    document.addEventListener('mousemove', onMouseMove);
}

function buildLuxuryVilla() {
    villa = new THREE.Group();

    // Main structure (Cream/Ivory colored)
    const mainStructure = new THREE.Mesh(
        new THREE.BoxGeometry(8, 4, 6),
        new THREE.MeshStandardMaterial({
            color: 0xF4F1E9,
            roughness: 0.7,
            metalness: 0.1
        })
    );
    mainStructure.position.y = 2;
    mainStructure.castShadow = true;
    mainStructure.receiveShadow = true;
    villa.add(mainStructure);

    // Roof (Dark Navy)
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(5, 2, 4),
        new THREE.MeshStandardMaterial({
            color: 0x101C32,
            roughness: 0.4,
            metalness: 0.3
        })
    );
    roof.position.y = 5;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    villa.add(roof);

    // Entrance (Gold accent)
    const entrance = new THREE.Mesh(
        new THREE.BoxGeometry(2, 3, 0.2),
        new THREE.MeshStandardMaterial({
            color: 0xC9A66B,
            roughness: 0.3,
            metalness: 0.7,
            emissive: 0xC9A66B,
            emissiveIntensity: 0.2
        })
    );
    entrance.position.set(0, 1.5, 3.1);
    entrance.castShadow = true;
    villa.add(entrance);

    // Windows with glass (multiple windows)
    const windowPositions = [
        [-2, 2, 3.1], [2, 2, 3.1],  // Front windows
        [-3.1, 2, 0], [3.1, 2, 0],  // Side windows
    ];

    windowPositions.forEach(pos => {
        const windowFrame = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 1.5, 0.1),
            new THREE.MeshStandardMaterial({
                color: 0x333333,
                roughness: 0.2,
                metalness: 0.8
            })
        );
        windowFrame.position.set(...pos);
        villa.add(windowFrame);

        const glass = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.3, 0.05),
            new THREE.MeshPhysicalMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.3,
                roughness: 0.1,
                metalness: 0.1,
                transmission: 0.9,
                thickness: 0.5
            })
        );
        glass.position.set(...pos);
        villa.add(glass);
    });

    // Decorative columns (Gold)
    [-3, 3].forEach(x => {
        const column = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 4, 8),
            new THREE.MeshStandardMaterial({
                color: 0xC9A66B,
                roughness: 0.3,
                metalness: 0.7
            })
        );
        column.position.set(x, 2, 3);
        column.castShadow = true;
        villa.add(column);
    });

    // Side wing
    const sideWing = new THREE.Mesh(
        new THREE.BoxGeometry(4, 3, 4),
        new THREE.MeshStandardMaterial({
            color: 0xF4F1E9,
            roughness: 0.7,
            metalness: 0.1
        })
    );
    sideWing.position.set(6, 1.5, 0);
    sideWing.castShadow = true;
    villa.add(sideWing);

    // Side wing roof
    const sideRoof = new THREE.Mesh(
        new THREE.ConeGeometry(3, 1.5, 4),
        new THREE.MeshStandardMaterial({
            color: 0x101C32,
            roughness: 0.4,
            metalness: 0.3
        })
    );
    sideRoof.position.set(6, 3.75, 0);
    sideRoof.rotation.y = Math.PI / 4;
    sideRoof.castShadow = true;
    villa.add(sideRoof);

    scene.add(villa);
}

function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8
    });

    const starVertices = [];
    for (let i = 0; i < 500; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = Math.random() * 50 + 10;
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // Gentle villa rotation
    if (villa) {
        villa.rotation.y += 0.001;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    if (camera) {
        camera.position.x = mouseX * 2;
        camera.position.y = 3 + mouseY * 2;
        camera.lookAt(0, 2, 0);
    }
}

// ==================== LANGUAGE SYSTEM ====================
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('ar') ? 'ar' : 'en';
}

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });

    // Update lang toggle button
    const langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
        langBtn.querySelector('span').textContent = lang === 'en' ? 'العربية' : 'English';
    }

    // Re-render dynamic content
    renderServices();
    renderGallery();
    renderReviews();
    renderAreas();
}

// ==================== DYNAMIC CONTENT RENDERING ====================
function renderServices() {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    grid.innerHTML = content.services.map(service => `
        <div class="service-card glass-card tilt-3d" data-category="${service.category}">
            <div class="service-img">
                <img src="https://images.unsplash.com/photo-1581858726788-75bc0f1a4eac?w=600" alt="${currentLang === 'en' ? service.titleEn : service.titleAr}">
            </div>
            <div class="service-content">
                <i>${service.icon}</i>
                <h3>${currentLang === 'en' ? service.titleEn : service.titleAr}</h3>
                <p>${currentLang === 'en' ? service.descEn : service.descAr}</p>
                <a href="#booking" class="btn btn-primary">
                    <i class="fas fa-calendar-check"></i>
                    <span data-en="Book Now" data-ar="احجز الآن">${currentLang === 'en' ? 'Book Now' : 'احجز الآن'}</span>
                </a>
            </div>
        </div>
    `).join('');

    // Also render quick services
    const quickGrid = document.querySelector('.quick-grid');
    if (quickGrid) {
        quickGrid.innerHTML = content.services.slice(0, 4).map(service => `
            <div class="quick-card glass-card tilt-3d">
                <div class="quick-icon">${service.icon}</div>
                <h3>${currentLang === 'en' ? service.titleEn : service.titleAr}</h3>
                <p>${currentLang === 'en' ? service.descEn : service.descAr}</p>
            </div>
        `).join('');
    }

    initTilt();
}

function renderGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;

    grid.innerHTML = content.gallery.map(item => `
        <div class="gallery-item glass-card" data-category="${item.category}">
            <img src="${item.image}" alt="Project">
        </div>
    `).join('');
}

function renderReviews() {
    const grid = document.querySelector('.reviews-grid');
    if (!grid) return;

    grid.innerHTML = content.reviews.map(review => `
        <div class="review-card glass-card">
            <div class="review-header">
                <div class="reviewer-avatar">👤</div>
                <div>
                    <h4>${currentLang === 'en' ? review.nameEn : review.nameAr}</h4>
                    <div class="review-stars">${'⭐'.repeat(review.rating)}</div>
                </div>
            </div>
            <p>${currentLang === 'en' ? review.textEn : review.textAr}</p>
        </div>
    `).join('');
}

function renderAreas() {
    const grid = document.querySelector('.areas-grid');
    if (!grid) return;

    grid.innerHTML = content.areas.map(area => `
        <div class="area-card glass-card tilt-3d">
            <i>${area.icon}</i>
            <h3>${currentLang === 'en' ? area.nameEn : area.nameAr}</h3>
        </div>
    `).join('');

    initTilt();
}

// ==================== 3D TILT EFFECT ====================
function initTilt() {
    const cards = document.querySelectorAll('.tilt-3d');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==================== GALLERY FILTERS ====================
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== FORM HANDLING ====================
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const message = `
New Contact Request:
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Phone: ${formData.get('phone')}
Service: ${formData.get('service')}
Message: ${formData.get('message')}
            `.trim();

            window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
            contactForm.reset();
        });
    }

    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const message = `
New Booking Request:
Name: ${formData.get('name')}
Phone: ${formData.get('phone')}
Service: ${formData.get('service')}
Property Type: ${formData.get('property')}
Area: ${formData.get('area')}
Date: ${formData.get('date')}
Time: ${formData.get('time')}
Details: ${formData.get('details')}
            `.trim();

            window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
            bookingForm.reset();
        });
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Cards animation
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    }, 2000);

    // Detect and set initial language
    currentLang = detectLanguage();
    switchLanguage(currentLang);

    // Language toggle
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            switchLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }

    // Initialize Three.js scene
    initVillaScene();

    // Initialize all features
    renderServices();
    renderGallery();
    renderReviews();
    renderAreas();
    initGalleryFilters();
    initForms();
    initNavigation();
    initTilt();

    // Initialize scroll animations (after GSAP loads)
    if (typeof gsap !== 'undefined') {
        initScrollAnimations();
    }
});

// ==================== CLEANUP ====================
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
});