// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initActiveNavigation();
    initAnimations();
    initMobileMenu();
    initProjectCards();
    initContactForm();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Fade-in animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .contribution-card, .project-card, .stat-card, .contact-info, .social-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Mobile menu functionality (if needed for responsive design)
function initMobileMenu() {
    // This can be expanded if a mobile hamburger menu is added
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Enhanced project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact form functionality (placeholder for future implementation)
function initContactForm() {
    // This can be expanded when a contact form is added
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add analytics tracking if needed
            console.log('Contact link clicked:', this.href);
        });
    });
}

// Utility function to throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Skills animation on hover
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Statistics counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-card h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.match(/\d+/));
                
                if (number) {
                    animateNumber(target, number);
                    observer.unobserve(target);
                }
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 30);
}

// Initialize stats counter when DOM is loaded
document.addEventListener('DOMContentLoaded', initStatsCounter);

// Smooth reveal for GSoC achievements
function initGSoCAnimations() {
    const achievements = document.querySelectorAll('.achievements li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    });
    
    achievements.forEach(achievement => {
        achievement.style.opacity = '0';
        achievement.style.transform = 'translateX(-20px)';
        achievement.style.transition = 'all 0.5s ease';
        observer.observe(achievement);
    });
}

document.addEventListener('DOMContentLoaded', initGSoCAnimations);

// Parallax effect for header
function initParallaxHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        header.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }, 16));
}

document.addEventListener('DOMContentLoaded', initParallaxHeader);

// Social links tracking
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-links a, .social-card');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim() || this.href;
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });
}

document.addEventListener('DOMContentLoaded', initSocialTracking);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://github.com/niyajali.png',
        'resources/popos-graphics.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', preloadImages);

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling for broken images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });
});

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        font-size: 20px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
    });
}

document.addEventListener('DOMContentLoaded', initBackToTop);