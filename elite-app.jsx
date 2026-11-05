// Elite Home Care - Premium React Application with Three.js, GSAP, Framer Motion
const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.MotionReact || window['framer-motion'];

// Language Context
const translations = {
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            about: 'About',
            portfolio: 'Portfolio',
            reviews: 'Reviews',
            whyUs: 'Why Us',
            areas: 'Areas',
            contact: 'Contact',
            bookNow: 'Book Now'
        },
        hero: {
            badge: 'Premium Luxury Service',
            title1: 'Exceptional Care for',
            title2: 'Every Corner',
            title3: 'of Your Home',
            subtitle: 'Premium Home Maintenance. Professional Service. Complete Peace of Mind.',
            bookService: 'Book a Service',
            exploreServices: 'Explore Services',
            quality: 'Quality Guaranteed',
            professional: 'Professional Team',
            onTime: 'On-Time Service'
        },
        services: {
            badge: 'Our Services',
            title: 'Complete Home Care Solutions',
            subtitle: 'Professional maintenance services tailored to your needs',
            ac: 'Air Conditioning Services',
            electrical: 'Electrical Maintenance',
            plumbing: 'Plumbing & Water Systems',
            painting: 'Painting & Interior Finishing',
            kitchen: 'Kitchen Maintenance',
            bathroom: 'Bathroom Maintenance',
            carpentry: 'Carpentry & Furniture Repair',
            cleaning: 'Home Cleaning',
            general: 'General Home Repairs',
            property: 'Property Maintenance',
            renovation: 'Renovation & Remodeling',
            preventive: 'Preventive Maintenance'
        }
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            services: 'الخدمات',
            about: 'من نحن',
            portfolio: 'معرض الأعمال',
            reviews: 'التقييمات',
            whyUs: 'لماذا نحن',
            areas: 'المناطق',
            contact: 'اتصل بنا',
            bookNow: 'احجز الآن'
        },
        hero: {
            badge: 'خدمة فاخرة متميزة',
            title1: 'عناية استثنائية',
            title2: 'لكل زاوية',
            title3: 'في منزلك',
            subtitle: 'صيانة منزلية متميزة، وخدمات احترافية، وراحة بال تامة.',
            bookService: 'احجز خدمة',
            exploreServices: 'استكشف الخدمات',
            quality: 'جودة مضمونة',
            professional: 'فريق محترف',
            onTime: 'خدمة في الموعد'
        },
        services: {
            badge: 'خدماتنا',
            title: 'حلول شاملة لصيانة المنازل',
            subtitle: 'خدمات صيانة احترافية مصممة خصيصاً لاحتياجاتك',
            ac: 'خدمات تكييف الهواء',
            electrical: 'الصيانة الكهربائية',
            plumbing: 'السباكة وأنظمة المياه',
            painting: 'الدهانات والتشطيبات الداخلية',
            kitchen: 'صيانة المطابخ',
            bathroom: 'صيانة الحمامات',
            carpentry: 'النجارة وإصلاح الأثاث',
            cleaning: 'التنظيف المنزلي',
            general: 'الإصلاحات العامة',
            property: 'صيانة الممتلكات',
            renovation: 'التجديد وإعادة التشكيل',
            preventive: 'الصيانة الوقائية'
        }
    }
};

// Three.js Background Component
const ThreeBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = document.getElementById('three-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create floating geometric shapes
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xd4af37,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });

        const shapes = [];
        for (let i = 0; i < 30; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 50;
            mesh.position.y = (Math.random() - 0.5) * 50;
            mesh.position.z = (Math.random() - 0.5) * 50;
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            scene.add(mesh);
            shapes.push(mesh);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xd4af37, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 20;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            shapes.forEach((shape, index) => {
                shape.rotation.x += 0.001;
                shape.rotation.y += 0.001;
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return null;
};

// Main App Component
const App = () => {
    const [language, setLanguage] = useState('en');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const t = translations[language];

    useEffect(() => {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ar')) {
            setLanguage('ar');
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        }

        // Hide loading screen
        setTimeout(() => {
            setLoading(false);
            document.getElementById('loading').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
            }, 500);
        }, 2000);

        // GSAP ScrollTrigger setup
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', newLang);
    };

    return (
        <div className="app">
            <ThreeBackground />

            {/* Language Toggle */}
            <motion.button
                className="lang-toggle-btn"
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: language === 'ar' ? 'auto' : '20px',
                    left: language === 'ar' ? '20px' : 'auto',
                    zIndex: 1000,
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50px',
                    padding: '10px 20px',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                }}
            >
                <i className="fas fa-globe" style={{ marginRight: '8px' }}></i>
                {language === 'en' ? 'عربي' : 'English'}
            </motion.button>

            {/* Floating Contact Buttons */}
            <motion.a
                href="https://wa.me/966597865115"
                target="_blank"
                className="float-contact whatsapp"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: language === 'ar' ? 'auto' : '20px',
                    left: language === 'ar' ? '20px' : 'auto',
                    zIndex: 1000,
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '28px',
                    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                    textDecoration: 'none'
                }}
            >
                <i className="fab fa-whatsapp"></i>
            </motion.a>

            <motion.a
                href="tel:+966597865115"
                className="float-contact phone"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: language === 'ar' ? 'auto' : '20px',
                    left: language === 'ar' ? '20px' : 'auto',
                    zIndex: 1000,
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, var(--gold), #b8941f)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
                    textDecoration: 'none'
                }}
            >
                <i className="fas fa-phone"></i>
            </motion.a>

            {/* Navigation */}
            <Navigation language={language} t={t} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Hero Section */}
            <HeroSection language={language} t={t} />

            {/* Quick Services */}
            <QuickServices language={language} t={t} />

            {/* Services Section */}
            <ServicesSection language={language} t={t} />

            {/* Remaining sections would go here */}
        </div>
    );
};

// Navigation Component
const Navigation = ({ language, t, isMenuOpen, setIsMenuOpen }) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                background: 'rgba(10, 22, 40, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '20px 0'
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <i className="fas fa-building" style={{ fontSize: '32px', color: 'var(--gold)' }}></i>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: '700', color: 'var(--white)' }}>
                            {language === 'en' ? 'Elite Home Care' : 'إيليت لصيانة المنازل'}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--gold)' }}>
                            {language === 'en' ? 'Premium Services' : 'خدمات متميزة'}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    {Object.entries(t.nav).map(([key, value]) => (
                        <motion.a
                            key={key}
                            href={`#${key}`}
                            whileHover={{ color: 'var(--gold)', y: -2 }}
                            style={{
                                color: 'var(--white)',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '15px'
                            }}
                        >
                            {value}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

// Hero Section Component
const HeroSection = ({ language, t }) => {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '100px 20px 50px',
            position: 'relative'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50px',
                        padding: '10px 25px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '30px'
                    }}
                >
                    <i className="fas fa-crown" style={{ color: 'var(--gold)' }}></i>
                    <span style={{ color: 'var(--white)', fontWeight: '600', fontSize: '14px' }}>
                        {t.hero.badge}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: '800',
                        lineHeight: '1.2',
                        marginBottom: '25px',
                        color: 'var(--white)'
                    }}
                >
                    {t.hero.title1}<br />
                    <span style={{ color: 'var(--gold)' }}>{t.hero.title2}</span><br />
                    {t.hero.title3}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '40px',
                        lineHeight: '1.6'
                    }}
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <motion.a
                        href="#booking"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'linear-gradient(135deg, var(--gold), #b8941f)',
                            color: 'var(--white)',
                            padding: '18px 40px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                        }}
                    >
                        <i className="fas fa-calendar-check"></i>
                        {t.hero.bookService}
                    </motion.a>

                    <motion.a
                        href="#services"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid var(--glass-border)',
                            color: 'var(--white)',
                            padding: '18px 40px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fas fa-concierge-bell"></i>
                        {t.hero.exploreServices}
                    </motion.a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    style={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'center',
                        marginTop: '60px',
                        flexWrap: 'wrap'
                    }}
                >
                    {[
                        { icon: 'shield-check', text: t.hero.quality },
                        { icon: 'user-tie', text: t.hero.professional },
                        { icon: 'clock', text: t.hero.onTime }
                    ].map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className={`fas fa-${item.icon}`} style={{ color: 'var(--gold)', fontSize: '20px' }}></i>
                            <span style={{ color: 'var(--white)', fontSize: '14px', fontWeight: '500' }}>{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Quick Services Component
const QuickServices = ({ language, t }) => {
    const services = [
        { icon: 'snowflake', title: 'AC Services', titleAr: 'خدمات التكييف' },
        { icon: 'bolt', title: 'Electrical', titleAr: 'الكهرباء' },
        { icon: 'faucet', title: 'Plumbing', titleAr: 'السباكة' },
        { icon: 'paint-roller', title: 'Painting', titleAr: 'الدهانات' }
    ];

    return (
        <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px'
            }}>
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '20px',
                            padding: '40px 30px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, var(--gold), #b8941f)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            fontSize: '32px',
                            color: 'var(--white)'
                        }}>
                            <i className={`fas fa-${service.icon}`}></i>
                        </div>
                        <h3 style={{ color: 'var(--white)', fontSize: '20px', marginBottom: '10px' }}>
                            {language === 'en' ? service.title : service.titleAr}
                        </h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                            {language === 'en' ? 'Installation & Repair' : 'تركيب وإصلاح'}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Services Section Component
const ServicesSection = ({ language, t }) => {
    return (
        <section id="services" style={{ padding: '100px 20px', maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <div style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50px',
                    padding: '8px 20px',
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                    <span style={{ color: 'var(--gold)', fontWeight: '600', fontSize: '14px' }}>
                        {t.services.badge}
                    </span>
                </div>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: 'var(--white)',
                    marginBottom: '15px'
                }}>
                    {t.services.title}
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
                    {t.services.subtitle}
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '30px'
            }}>
                {/* Service cards would go here - showing 2 examples */}
                <ServiceCard
                    icon="snowflake"
                    title={language === 'en' ? 'Air Conditioning Services' : 'خدمات تكييف الهواء'}
                    image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop"
                    language={language}
                />
                <ServiceCard
                    icon="bolt"
                    title={language === 'en' ? 'Electrical Maintenance' : 'الصيانة الكهربائية'}
                    image="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop"
                    language={language}
                />
            </div>
        </section>
    );
};

// Service Card Component
const ServiceCard = ({ icon, title, image, language }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer'
            }}
        >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={image}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, transparent, rgba(10, 22, 40, 0.9))'
                }}></div>
            </div>
            <div style={{ padding: '30px' }}>
                <i className={`fas fa-${icon}`} style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '15px' }}></i>
                <h3 style={{ color: 'var(--white)', fontSize: '22px', marginBottom: '15px' }}>{title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
                    {language === 'en'
                        ? 'Professional installation, repair, and maintenance services.'
                        : 'خدمات تركيب وإصلاح وصيانة احترافية.'}
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'linear-gradient(135deg, var(--gold), #b8941f)',
                        color: 'var(--white)',
                        padding: '12px 30px',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                    }}
                >
                    {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                </motion.button>
            </div>
        </motion.div>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);