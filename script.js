document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const body = document.body;

    if (menuToggle && navRight) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navRight.classList.toggle('active');
            body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navRight.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navRight.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = navRight.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navRight.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Language Switching
    const langButtons = document.querySelectorAll('.lang-btn');
    const translateElements = document.querySelectorAll('.translate');
    let currentLang = localStorage.getItem('language') || 'fa';

    // Set initial language
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    updateLanguage(currentLang);
    updateActiveButton(currentLang);

    // Language button click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        updateLanguage(lang);
        updateActiveButton(lang);
    }

    function updateLanguage(lang) {
        translateElements.forEach(element => {
            const translation = element.dataset[lang];
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    function updateActiveButton(lang) {
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Fire particles effect
    const createFireParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        
        // Random size between 20px and 40px for mobile, handled by CSS for desktop
        const size = window.innerWidth < 768 ? Math.random() * 20 + 20 : null;
        if (size) {
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }
        
        // More controlled random position
        const startX = Math.random() * 80 + 10; // 10% to 90%
        particle.style.left = `${startX}%`;
        
        // Random animation duration between 1.5 and 2.5 seconds
        const duration = Math.random() * 1 + 1.5;
        particle.style.animationDuration = `${duration}s`;
        
        // Smaller horizontal movement
        const movement = Math.random() * 60 - 30; // -30px to 30px
        particle.style.setProperty('--x-movement', `${movement}px`);
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentElement === hero) {
                    particle.remove();
                }
            }, duration * 1000);
        }
    };

    // Create multiple particles at different intervals
    const createParticles = () => {
        // Create 2-3 particles at once
        const count = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < count; i++) {
            setTimeout(createFireParticle, i * 150);
        }
    };

    // Create particle groups more frequently
    setInterval(createParticles, 300);

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .skill-card, .project-card').forEach(element => {
        observer.observe(element);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking
                navRight.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
});