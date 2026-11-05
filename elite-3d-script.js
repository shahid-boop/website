// Elite Home Care - 3D Liquid Glass Experience
// Three.js + GSAP + Bilingual System

// ==================== CONFIGURATION ====================
const CONFIG = {
    three: {
        particleCount: 50,
        glassObjects: 5,
        animationSpeed: 0.001,
        rotationSpeed: 0.0005
    },
    performance: {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isMobile: window.innerWidth < 768,
        lowPowerMode: false
    }
};

// Detect low-power devices
if (CONFIG.performance.isMobile) {
    CONFIG.three.particleCount = 20;
    CONFIG.three.glassObjects = 3;
}

// ==================== TRANSLATIONS ====================
const translations = {
    en: {
        services: {
            ac: { name: 'Air Conditioning Services', desc: 'Professional AC installation, repair, and maintenance.' },
            electrical: { name: 'Electrical Maintenance', desc: 'Safe and certified electrical work for your home.' },
            plumbing: { name: 'Plumbing & Water Systems', desc: 'Expert plumbing solutions for all your needs.' },
            painting: { name: 'Painting & Interior Finishing', desc: 'Premium painting with exceptional finishes.' },
            kitchen: { name: 'Kitchen Maintenance', desc: 'Complete kitchen care and maintenance solutions.' },
            bathroom: { name: 'Bathroom Maintenance', desc: 'Expert bathroom repairs and renovations.' },
            carpentry: { name: 'Carpentry & Furniture Repair', desc: 'Custom carpentry and furniture solutions.' },
            cleaning: { name: 'Home Cleaning', desc: 'Professional cleaning for a spotless home.' },
            general: { name: 'General Home Repairs', desc: 'Fix everything efficiently.' },
            property: { name: 'Property Maintenance', desc: 'Comprehensive property care packages.' },
            renovation: { name: 'Renovation & Remodeling', desc: 'Transform your space professionally.' },
            preventive: { name: 'Preventive Maintenance', desc: 'Regular maintenance to prevent problems.' }
        },
        gallery: [
            { cat: 'ac', title: 'AC Installation', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
            { cat: 'ac', title: 'AC Repair', img: 'https://images.unsplash.com/photo-1631545806609-57b6cdaad1e5?w=600&h=400&fit=crop' },
            { cat: 'electrical', title: 'Electrical Work', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop' },
            { cat: 'electrical', title: 'Panel Installation', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop' },
            { cat: 'plumbing', title: 'Plumbing Repair', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop' },
            { cat: 'plumbing', title: 'Bathroom Plumbing', img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop' },
            { cat: 'painting', title: 'Interior Painting', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop' },
            { cat: 'painting', title: 'Wall Painting', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop' }
        ],
        reviews: [
            { name: 'Ahmed Mohammed', text: 'Excellent service! Professional and punctual.', stars: 5 },
            { name: 'Fatima Al-Hassan', text: 'Very satisfied with the quality of work.', stars: 5 },
            { name: 'Khalid Ibrahim', text: 'Outstanding workmanship and professionalism.', stars: 5 }
        ]
    },
    ar: {
        services: {
            ac: { name: 'خدمات تكييف الهواء', desc: 'تركيب وإصلاح وصيانة احترافية للتكييف.' },
            electrical: { name: 'الصيانة الكهربائية', desc: 'أعمال كهربائية آمنة ومعتمدة لمنزلك.' },
            plumbing: { name: 'السباكة وأنظمة المياه', desc: 'حلول سباكة احترافية لجميع احتياجاتك.' },
            painting: { name: 'الدهانات والتشطيبات الداخلية', desc: 'دهانات راقية مع تشطيبات استثنائية.' },
            kitchen: { name: 'صيانة المطابخ', desc: 'حلول شاملة لصيانة والعناية بالمطبخ.' },
            bathroom: { name: 'صيانة الحمامات', desc: 'إصلاحات وتجديدات احترافية للحمامات.' },
            carpentry: { name: 'النجارة وإصلاح الأثاث', desc: 'نجارة مخصصة وحلول الأثاث.' },
            cleaning: { name: 'التنظيف المنزلي', desc: 'تنظيف احترافي لمنزل نظيف تماماً.' },
            general: { name: 'الإصلاحات العامة', desc: 'إصلاح كل شيء بكفاءة.' },
            property: { name: 'صيانة الممتلكات', desc: 'باقات شاملة لصيانة الممتلكات.' },
            renovation: { name: 'التجديد وإعادة التشكيل', desc: 'حول مساحتك بشكل احترافي.' },
            preventive: { name: 'الصيانة الوقائية', desc: 'صيانة منتظمة لمنع المشاكل.' }
        },
        gallery: [
            { cat: 'ac', title: 'تركيب تكييف', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
            { cat: 'ac', title: 'إصلاح تكييف', img: 'https://images.unsplash.com/photo-1631545806609-57b6cdaad1e5?w=600&h=400&fit=crop' },
            { cat: 'electrical', title: 'أعمال كهربائية', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop' },
            { cat: 'electrical', title: 'تركيب لوحة', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop' },
            { cat: 'plumbing', title: 'إصلاح سباكة', img: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop' },
            { cat: 'plumbing', title: 'سباكة حمام', img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop' },
            { cat: 'painting', title: 'دهانات داخلية', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop' },
            { cat: 'painting', title: 'دهان جدران', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop' }
        ],
        reviews: [
            { name: 'أحمد محمد', text: 'خدمة ممتازة! احترافية ودقة في المواعيد.', stars: 5 },
            { name: 'فاطمة الحسن', text: 'راضية جداً عن جودة العمل.', stars: 5 },
            { name: 'خالد إبراهيم', text: 'حرفية رائعة واحترافية عالية.', stars: 5 }
        ]
    }
};

// ==================== STATE ====================
let currentLang = 'en';
let scene, camera, renderer, glassObjects = [];
let animationFrameId;

// ==================== LANGUAGE SYSTEM ====================
function detectLanguage() {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) {
        currentLang = 'ar';
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
    updateLanguage();
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    updateLanguage();
}

function updateLanguage() {
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ar');
        if (text) el.textContent = text;
    });

    // Update language toggle button
    const langText = document.getElementById('lang-text');
    if (langText) langText.textContent = currentLang === 'en' ? 'عربي' : 'English';

    // Rebuild dynamic content
    populateServices();
    populateGallery();
    populateReviews();
}

// ==================== THREE.JS SETUP ====================
function initThreeJS() {
    if (CONFIG.performance.reducedMotion) return;

    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !CONFIG.performance.isMobile });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 30;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 1.5, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a9eff, 1, 50);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // Create 3D glass objects
    createGlassObjects();

    // Create floating particles
    createParticles();

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createGlassObjects() {
    const geometries = [
        new THREE.IcosahedronGeometry(2, 0),
        new THREE.OctahedronGeometry(2.5, 0),
        new THREE.TetrahedronGeometry(2, 0),
        new THREE.TorusGeometry(1.5, 0.5, 16, 32),
        new THREE.DodecahedronGeometry(2, 0)
    ];

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd4af37,
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1
    });

    for (let i = 0; i < CONFIG.three.glassObjects; i++) {
        const geometry = geometries[i % geometries.length];
        const mesh = new THREE.Mesh(geometry, glassMaterial.clone());

        // Random position
        mesh.position.x = (Math.random() - 0.5) * 40;
        mesh.position.y = (Math.random() - 0.5) * 30;
        mesh.position.z = (Math.random() - 0.5) * 20 - 10;

        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;

        scene.add(mesh);
        glassObjects.push({
            mesh,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatOffset: Math.random() * Math.PI * 2
        });
    }
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = CONFIG.three.particleCount;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xd4af37,
        size: 0.3,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Animate glass objects
    glassObjects.forEach((obj, index) => {
        obj.mesh.rotation.x += obj.rotationSpeed.x;
        obj.mesh.rotation.y += obj.rotationSpeed.y;
        obj.mesh.rotation.z += obj.rotationSpeed.z;

        // Floating motion
        obj.mesh.position.y += Math.sin(Date.now() * 0.001 * obj.floatSpeed + obj.floatOffset) * 0.01;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ==================== POPULATE DYNAMIC CONTENT ====================
function populateServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    const services = translations[currentLang].services;
    const serviceIcons = {
        ac: 'snowflake', electrical: 'bolt', plumbing: 'faucet', painting: 'paint-roller',
        kitchen: 'utensils', bathroom: 'bath', carpentry: 'hammer', cleaning: 'broom',
        general: 'tools', property: 'home', renovation: 'drafting-compass', preventive: 'calendar-check'
    };

    const serviceImages = {
        ac: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
        electrical: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop',
        plumbing: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop',
        painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop',
        kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop',
        bathroom: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop',
        carpentry: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop',
        cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
        general: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
        property: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
        renovation: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop',
        preventive: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=400&fit=crop'
    };

    servicesGrid.innerHTML = '';

    Object.entries(services).forEach(([key, service]) => {
        const card = document.createElement('div');
        card.className = 'service-card glass tilt-card';
        card.innerHTML = `
            <div class="service-img">
                <img src="${serviceImages[key]}" alt="${service.name}">
            </div>
            <div class="service-content">
                <i class="fas fa-${serviceIcons[key]}"></i>
                <h3>${service.name}</h3>
                <p>${service.desc}</p>
                <div class="service-actions">
                    <button class="btn btn-sm btn-primary">${currentLang === 'en' ? 'Details' : 'التفاصيل'}</button>
                    <a href="#booking" class="btn btn-sm btn-secondary">${currentLang === 'en' ? 'Book' : 'احجز'}</a>
                </div>
            </div>
        `;
        servicesGrid.appendChild(card);
    });

    // Add 3D tilt effect to service cards
    init3DTilt();
}

function populateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    const gallery = translations[currentLang].gallery;
    galleryGrid.innerHTML = '';

    gallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item glass';
        galleryItem.setAttribute('data-category', item.cat);
        galleryItem.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
        galleryGrid.appendChild(galleryItem);
    });
}

function populateReviews() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    if (!reviewsGrid) return;

    const reviews = translations[currentLang].reviews;
    reviewsGrid.innerHTML = '';

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card glass';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <h4>${review.name}</h4>
                    <div class="review-stars">
                        ${'<i class="fas fa-star"></i>'.repeat(review.stars)}
                    </div>
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsGrid.appendChild(reviewCard);
    });
}

// ==================== 3D TILT EFFECT ====================
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (CONFIG.performance.reducedMotion) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
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

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ==================== COUNTER ANIMATION ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 16);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==================== GSAP ANIMATIONS ====================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade-up animations
    gsap.utils.toArray('[data-aos="fade-up"]').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Zoom-in animations
    gsap.utils.toArray('[data-aos="zoom-in"]').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'back.out(1.2)'
        });
    });

    // Fade-right animations
    gsap.utils.toArray('[data-aos="fade-right"]').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Fade-left animations
    gsap.utils.toArray('[data-aos="fade-left"]').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%'
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 22, 40, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 22, 40, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

// ==================== FORMS ====================
function initForms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Create WhatsApp message
            let message = currentLang === 'en' ? 'New Service Request:\n\n' : 'طلب خدمة جديد:\n\n';
            Object.entries(data).forEach(([key, value]) => {
                if (value) message += `${key}: ${value}\n`;
            });

            const whatsappUrl = `https://wa.me/966597865115?text=${encodeURIComponent(message)}`;

            // Show success message
            alert(currentLang === 'en'
                ? 'Request submitted! Redirecting to WhatsApp...'
                : 'تم إرسال الطلب! جاري التحويل إلى واتساب...');

            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            form.reset();
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Detect language
    detectLanguage();

    // Initialize Three.js
    setTimeout(() => {
        initThreeJS();
    }, 100);

    // Initialize GSAP animations
    setTimeout(() => {
        initGSAPAnimations();
    }, 200);

    // Initialize features
    initNavigation();
    initGalleryFilters();
    animateCounters();
    initForms();
    initSmoothScroll();

    // Language toggle
    document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

    // Hide loading screen
    setTimeout(() => {
        const loading = document.getElementById('loading-screen');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
            document.body.classList.remove('loading');
        }, 500);
    }, 2000);
});

// ==================== CLEANUP ====================
window.addEventListener('beforeunload', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
        renderer.dispose();
    }
});