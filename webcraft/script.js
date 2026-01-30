// ==========================================
// WEBCRAFT - JAVASCRIPT
// Fonctionnalités interactives
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === MOBILE MENU ===
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // === HEADER SCROLL ===
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.padding = '1rem 5%';
            header.style.background = 'rgba(10, 14, 39, 0.98)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.background = 'rgba(10, 14, 39, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
    
    // === ANIMATED COUNTER ===
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer pour les counters
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // === PORTFOLIO FILTERS ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const categories = card.getAttribute('data-category');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // === FAQ ACCORDION ===
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle l'item actuel
            item.classList.toggle('active');
        });
    });
    
    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Cacher les messages précédents
            successMessage.classList.remove('show');
            errorMessage.classList.remove('show');
            
            // Afficher l'état de chargement
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Récupérer les données du formulaire
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value,
                newsletter: document.querySelector('input[name="newsletter"]').checked
            };
            
            // Simuler l'envoi (remplacer par votre logique backend)
            setTimeout(function() {
                // Simulation de succès (90% de chances)
                const success = Math.random() > 0.1;
                
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                if (success) {
                    // Afficher le message de succès
                    successMessage.classList.add('show');
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Cacher le message après 5 secondes
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                    
                    // Envoyer les données (exemple avec console.log)
                    console.log('Formulaire soumis:', formData);
                    
                    // Ici, vous pouvez ajouter votre logique d'envoi:
                    // - EmailJS
                    // - API backend
                    // - Google Forms
                    // etc.
                    
                } else {
                    // Afficher le message d'erreur
                    errorMessage.classList.add('show');
                    
                    // Cacher le message après 5 secondes
                    setTimeout(() => {
                        errorMessage.classList.remove('show');
                    }, 5000);
                }
            }, 2000);
        });
        
        // Validation en temps réel
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = 'var(--accent)';
                } else {
                    this.style.borderColor = 'var(--primary)';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
                }
            });
        });
        
        // Validation email
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = 'var(--accent)';
                } else {
                    this.style.borderColor = 'var(--primary)';
                }
            });
        }
    }
    
    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // === ANIMATIONS ON SCROLL ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.service-card, .value-card, .team-member, .benefit-item, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // === LOADING ANIMATION ===
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // === PARALLAX EFFECT (léger) ===
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .bg-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // === TYPED TEXT EFFECT (optionnel) ===
    const typedTextElement = document.querySelector('.hero-title .gradient-text');
    if (typedTextElement) {
        const originalText = typedTextElement.textContent;
        typedTextElement.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                typedTextElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }
        
        // Démarrer l'effet après un court délai
        setTimeout(typeText, 500);
    }
    
    // === CURSOR EFFECT (optionnel - pour desktop) ===
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Agrandir le curseur sur les éléments cliquables
        const clickableElements = document.querySelectorAll('a, button, .service-card, .project-card');
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(0, 255, 136, 0.2)';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }
    
    // === PROGRESS BAR ON SCROLL ===
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // === FORM FIELD ANIMATIONS ===
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Animation au focus
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // === PRELOAD IMAGES (optionnel) ===
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // === BACK TO TOP BUTTON ===
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient);
        color: var(--darker);
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 255, 136, 0.3);
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1) translateY(-5px)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) translateY(0)';
    });
    
    // === CONSOLE MESSAGE ===
    console.log('%c🚀 WebCraft', 'font-size: 20px; font-weight: bold; color: #00ff88;');
    console.log('%cSolutions Digitales Innovantes', 'font-size: 14px; color: #8892b0;');
    console.log('%cPowered by HTML, CSS & JavaScript', 'font-size: 12px; color: #0088ff;');
    
});

// === EASTER EGG (optionnel) ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        alert('🎉 Code Konami activé ! WebCraft Mode Arc-en-ciel ! 🌈');
    }
});

// === UTILITY FUNCTIONS ===

// Fonction pour copier du texte
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texte copié:', text);
    });
}

// Fonction pour détecter le type d'appareil
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

console.log('Appareil détecté:', getDeviceType());
