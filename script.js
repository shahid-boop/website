// Premium 3D Liquid Glass Home Maintenance Website - JavaScript

// ==================== NAVIGATION & MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ANIMATION ON SCROLL (AOS) ====================
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, entry.target.dataset.aosDelay || 0);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Initialize AOS on page load
document.addEventListener('DOMContentLoaded', initAOS);

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counters when About section is visible
const aboutSection = document.getElementById('about');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
            countersAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ==================== SERVICE DETAILS DATA ====================
const serviceDetails = {
    ac: {
        title: 'AC Installation & Repair',
        icon: 'fa-snowflake',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop',
        description: 'Professional air conditioning installation, repair, and maintenance services for optimal cooling performance and energy efficiency.',
        includes: [
            'AC installation and setup',
            'Regular maintenance and servicing',
            'Emergency repair services',
            'Gas refilling and leak detection',
            'Thermostat installation and repair',
            'Duct cleaning and maintenance',
            'Energy efficiency optimization',
            'Filter replacement'
        ],
        benefits: [
            'Experienced and certified technicians',
            'All major brands serviced',
            '24/7 emergency support',
            'Warranty on all installations',
            'Transparent pricing',
            'Quick response time',
            'Quality replacement parts',
            'Energy-saving recommendations'
        ]
    },
    electrical: {
        title: 'Electrical Maintenance',
        icon: 'fa-bolt',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
        description: 'Safe and reliable electrical repairs, installations, and maintenance by certified electricians following all safety standards.',
        includes: [
            'Electrical wiring and rewiring',
            'Circuit breaker installation',
            'Light fixture installation',
            'Outlet and switch repair',
            'Electrical panel upgrades',
            'Safety inspections',
            'Generator installation',
            'Surge protection installation'
        ],
        benefits: [
            'Licensed and insured electricians',
            'Code-compliant work',
            'Safety-first approach',
            'Emergency electrical services',
            'Free safety inspections',
            'Warranty on all work',
            'Advanced diagnostic tools',
            'Clean and professional service'
        ]
    },
    plumbing: {
        title: 'Plumbing Services',
        icon: 'fa-faucet',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=400&fit=crop',
        description: 'Expert plumbing solutions including leak repairs, pipe installations, drain cleaning, and complete plumbing system maintenance.',
        includes: [
            'Leak detection and repair',
            'Pipe installation and replacement',
            'Drain cleaning and unclogging',
            'Faucet and fixture installation',
            'Water heater services',
            'Sewer line repair',
            'Bathroom and kitchen plumbing',
            'Emergency plumbing services'
        ],
        benefits: [
            'Expert plumbers with years of experience',
            '24/7 emergency plumbing service',
            'Advanced leak detection technology',
            'Quality materials and fixtures',
            'Guaranteed workmanship',
            'Competitive pricing',
            'Clean and respectful service',
            'Preventive maintenance advice'
        ]
    },
    painting: {
        title: 'Painting & Decoration',
        icon: 'fa-paint-roller',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=400&fit=crop',
        description: 'Professional interior and exterior painting services with premium quality finishes and attention to detail.',
        includes: [
            'Interior wall painting',
            'Exterior painting',
            'Ceiling painting',
            'Wood staining and finishing',
            'Wallpaper installation',
            'Surface preparation',
            'Color consultation',
            'Decorative finishes'
        ],
        benefits: [
            'Skilled professional painters',
            'Premium quality paints',
            'Clean and tidy work',
            'Free color consultation',
            'Furniture protection',
            'Quick turnaround time',
            'Durable and long-lasting finish',
            'Satisfaction guaranteed'
        ]
    },
    carpentry: {
        title: 'Carpentry & Furniture Repair',
        icon: 'fa-hammer',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=400&fit=crop',
        description: 'Custom carpentry work and furniture repair services including cabinets, doors, and custom woodwork.',
        includes: [
            'Custom cabinet installation',
            'Furniture assembly and repair',
            'Door installation and repair',
            'Window frame repair',
            'Custom shelving',
            'Wood floor repair',
            'Trim and molding installation',
            'Deck and fence repair'
        ],
        benefits: [
            'Experienced carpenters',
            'Quality craftsmanship',
            'Custom solutions',
            'Attention to detail',
            'Premium materials',
            'Precise measurements',
            'Clean work area',
            'Affordable pricing'
        ]
    },
    cleaning: {
        title: 'Home Cleaning',
        icon: 'fa-broom',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
        description: 'Thorough and professional cleaning services for a spotless, healthy, and comfortable home environment.',
        includes: [
            'Deep cleaning services',
            'Regular maintenance cleaning',
            'Kitchen cleaning',
            'Bathroom sanitization',
            'Floor cleaning and polishing',
            'Window cleaning',
            'Carpet and upholstery cleaning',
            'Move-in/move-out cleaning'
        ],
        benefits: [
            'Trained cleaning professionals',
            'Eco-friendly products',
            'Flexible scheduling',
            'Customized cleaning plans',
            'Quality assurance',
            'Insured and bonded',
            'Attention to detail',
            'Competitive rates'
        ]
    },
    kitchen: {
        title: 'Kitchen Maintenance',
        icon: 'fa-utensils',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=400&fit=crop',
        description: 'Complete kitchen maintenance including appliance repair, cabinet work, and plumbing services.',
        includes: [
            'Appliance repair and installation',
            'Cabinet repair and refacing',
            'Countertop installation',
            'Sink and faucet replacement',
            'Tile work and backsplash',
            'Lighting installation',
            'Ventilation system repair',
            'Kitchen renovation'
        ],
        benefits: [
            'Specialized kitchen experts',
            'All appliance brands serviced',
            'Quality materials',
            'Modern design options',
            'Complete project management',
            'Timely completion',
            'Warranty on work',
            'Enhanced functionality'
        ]
    },
    bathroom: {
        title: 'Bathroom Maintenance',
        icon: 'fa-bath',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=400&fit=crop',
        description: 'Expert bathroom repairs, renovations, and fixture installations for a beautiful and functional bathroom.',
        includes: [
            'Fixture installation and repair',
            'Tile and grout work',
            'Shower and bathtub repair',
            'Vanity installation',
            'Toilet repair and replacement',
            'Plumbing services',
            'Waterproofing',
            'Complete bathroom renovation'
        ],
        benefits: [
            'Expert bathroom specialists',
            'Quality fixtures and materials',
            'Water-efficient solutions',
            'Modern design expertise',
            'Leak-proof installations',
            'Clean and professional work',
            'Project coordination',
            'Lasting quality'
        ]
    },
    general: {
        title: 'General Home Repairs',
        icon: 'fa-tools',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
        description: 'Fix everything from doors and windows to walls and ceilings with our comprehensive repair services.',
        includes: [
            'Door and window repair',
            'Drywall repair and patching',
            'Ceiling repair',
            'Floor repair',
            'Lock installation',
            'Minor electrical repairs',
            'Minor plumbing repairs',
            'General handyman services'
        ],
        benefits: [
            'Versatile skilled technicians',
            'Quick problem solving',
            'Multiple repairs in one visit',
            'Fair and honest pricing',
            'Quality workmanship',
            'Same-day service available',
            'Preventive recommendations',
            'Reliable and trustworthy'
        ]
    },
    complete: {
        title: 'Complete Home Maintenance',
        icon: 'fa-home',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
        description: 'Comprehensive maintenance packages covering all aspects of home care for complete peace of mind.',
        includes: [
            'All electrical services',
            'All plumbing services',
            'AC maintenance',
            'Painting services',
            'Carpentry work',
            'Regular inspections',
            'Preventive maintenance',
            'Priority emergency service'
        ],
        benefits: [
            'One-stop solution for all needs',
            'Discounted package rates',
            'Priority scheduling',
            'Regular maintenance reminders',
            'Dedicated account manager',
            'Comprehensive service history',
            'Peace of mind coverage',
            'Best value for money'
        ]
    }
};

// ==================== SERVICE DETAIL MODAL ====================
function showServiceDetail(serviceKey) {
    const modal = document.getElementById('serviceDetailModal');
    const content = document.getElementById('serviceDetailContent');
    const service = serviceDetails[serviceKey];

    if (!service) return;

    content.innerHTML = `
        <div class="service-detail-header">
            <i class="fas ${service.icon}" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
            <h2>${service.title}</h2>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.1rem;">${service.description}</p>
        </div>

        <img src="${service.image}" alt="${service.title}" class="service-detail-image">

        <div class="service-detail-section">
            <h3>What's Included</h3>
            <ul>
                ${service.includes.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="service-detail-section">
            <h3>Why Choose Our Service</h3>
            <ul>
                ${service.benefits.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <div class="service-detail-actions">
            <a href="#booking" class="btn btn-primary" onclick="closeServiceDetail()">
                <i class="fas fa-calendar-check"></i> Book This Service
            </a>
            <a href="https://wa.me/966597865115" class="btn btn-secondary">
                <i class="fab fa-whatsapp"></i> Contact on WhatsApp
            </a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServiceDetail() {
    const modal = document.getElementById('serviceDetailModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('serviceDetailModal');
    if (e.target === modal) {
        closeServiceDetail();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceDetail();
    }
});

// ==================== GALLERY FILTERS ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ==================== FORM HANDLING ====================

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send data to your backend
        console.log('Contact Form Data:', data);

        // Create WhatsApp message
        const message = `Hello! I'm interested in your services.\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nMessage: ${data.message}`;
        const whatsappUrl = `https://wa.me/966597865115?text=${encodeURIComponent(message)}`;

        // Show success message
        showSuccessMessage('Message sent! Redirecting to WhatsApp...');

        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 1500);
    });
}

// Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        // Here you would normally send data to your backend
        console.log('Booking Form Data:', data);

        // Create WhatsApp message
        const message = `🏠 New Service Booking Request\n\n👤 Name: ${data.name}\n📱 Phone: ${data.phone}\n🔧 Service: ${data.service}\n📅 Date: ${data.date}\n🕐 Time: ${data.time}\n📍 Address: ${data.address}\n📝 Details: ${data.details || 'None'}`;
        const whatsappUrl = `https://wa.me/966597865115?text=${encodeURIComponent(message)}`;

        // Show success message
        showSuccessMessage('Booking request submitted! Redirecting to WhatsApp...');

        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            bookingForm.reset();
        }, 1500);
    });
}

// ==================== SUCCESS MESSAGE ====================
function showSuccessMessage(message) {
    // Remove existing success message if any
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create success message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 3000);
}

// ==================== SCROLL TO TOP ====================
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // Add scroll animations based on scroll position
    if (scrollTop > 300) {
        // Could add a scroll-to-top button here if desired
    }
});

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section [data-aos]');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('aos-animate');
            }, index * 100);
        });
    }, 100);
});

// ==================== 3D TILT EFFECT ====================
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== PREVENT FORM RESUBMISSION ====================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ==================== LOADING OPTIMIZATION ====================
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🏠 Premium Home Maintenance Website', 'color: #4a9eff; font-size: 20px; font-weight: bold;');
console.log('%cYour Home, Our Responsibility', 'color: #2e7dd1; font-size: 14px;');
console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 12px;');