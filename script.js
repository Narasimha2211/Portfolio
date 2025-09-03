// Navbar functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Create scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    return indicator;
}

const scrollIndicator = createScrollIndicator();

// Enhanced navbar background change and scroll indicator
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update scroll indicator
    scrollIndicator.style.width = scrollPercent + '%';
    
    // Navbar effects
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters when stats section is visible
            if (entry.target.closest('.about-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .hobby-card, .skill-item, .stat-card, .cert-card').forEach(el => {
    observer.observe(el);
});

// Observe stats section specifically
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }
    
    // Initialize interactive profile features
    initializeInteractiveProfile();
});

// Interactive Profile Features
function initializeInteractiveProfile() {
    const orbitIcons = document.querySelectorAll('.orbit-icon');
    const profileImage = document.querySelector('.profile-image');
    const statBubbles = document.querySelectorAll('.stat-bubble');
    const mathSymbols = document.querySelectorAll('.symbol');
    const centralSymbol = document.querySelector('.central-symbol');
    
    // Math symbols interaction
    mathSymbols.forEach((symbol, index) => {
        symbol.addEventListener('click', () => {
            // Create mathematical ripple effect
            createMathRipple(symbol);
            
            // Change symbol temporarily
            const originalSymbol = symbol.textContent;
            const mathSymbols = ['∫', '∑', '∏', '∇', '∂', 'Ω', 'Φ', 'Ψ', 'θ', 'δ', 'γ', 'ε'];
            const randomSymbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
            
            symbol.textContent = randomSymbol;
            symbol.style.color = '#ff6b35';
            symbol.style.transform = 'scale(1.8) rotate(720deg)';
            
            setTimeout(() => {
                symbol.textContent = originalSymbol;
                symbol.style.color = 'white';
                symbol.style.transform = 'scale(1)';
            }, 1500);
        });
        
        symbol.addEventListener('mouseenter', () => {
            symbol.style.fontSize = '2.5rem';
            symbol.style.textShadow = '0 0 25px rgba(255, 215, 0, 1)';
        });
        
        symbol.addEventListener('mouseleave', () => {
            symbol.style.fontSize = '2rem';
            symbol.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Central symbol interaction
    if (centralSymbol) {
        centralSymbol.addEventListener('click', () => {
            centralSymbol.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(1080deg)';
            centralSymbol.style.color = '#ff6b35';
            
            // Trigger all symbols to animate
            mathSymbols.forEach((symbol, index) => {
                setTimeout(() => {
                    symbol.style.transform = 'scale(1.3) rotate(360deg)';
                    symbol.style.color = '#ffd700';
                    setTimeout(() => {
                        symbol.style.transform = 'scale(1)';
                        symbol.style.color = 'white';
                    }, 300);
                }, index * 100);
            });
            
            setTimeout(() => {
                centralSymbol.style.transform = 'translate(-50%, -50%) scale(1)';
                centralSymbol.style.color = '#ffd700';
            }, 2000);
        });
    }
    
    // Add click events to orbit icons
    orbitIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            // Create ripple effect
            createRippleEffect(icon);
            
            // Temporary pause orbit animation
            icon.style.animationPlayState = 'paused';
            setTimeout(() => {
                icon.style.animationPlayState = 'running';
            }, 1000);
        });
        
        // Add hover sound effect (visual feedback)
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            icon.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            icon.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.5)';
        });
    });
    
    // Profile image interaction
    if (profileImage) {
        profileImage.addEventListener('click', () => {
            profileImage.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                profileImage.style.transform = 'scale(1)';
            }, 1000);
        });
    }
    
    // Stat bubbles interaction
    statBubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            bubble.style.transform = 'scale(1.2)';
            bubble.style.background = 'rgba(255, 215, 0, 0.3)';
            setTimeout(() => {
                bubble.style.transform = 'scale(1)';
                bubble.style.background = 'rgba(255, 255, 255, 0.2)';
            }, 500);
        });
    });
    
    // Create floating particles dynamically
    createFloatingParticles();
    
    // Create mathematical particles
    createMathParticles();
}

// Create mathematical ripple effect
function createMathRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 107, 53, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.8s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '30px';
    ripple.style.height = '30px';
    ripple.style.marginLeft = '-15px';
    ripple.style.marginTop = '-15px';
    ripple.style.border = '2px solid rgba(255, 215, 0, 0.8)';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Create floating math particles
function createMathParticles() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    const mathSymbols = ['∫', '∑', '∏', '∇', '∂', 'π', 'θ', 'α', 'β', 'γ', 'δ', 'ε'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        particle.style.position = 'absolute';
        particle.style.color = 'rgba(255, 215, 0, 0.7)';
        particle.style.fontSize = '1.2rem';
        particle.style.fontWeight = 'bold';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0px';
        particle.style.animation = 'mathParticleFloat 6s linear forwards';
        particle.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        
        profileContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }, 3000);
}

// Create ripple effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 215, 0, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create dynamic floating particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    setInterval(() => {
        if (particlesContainer.children.length < 12) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 8000);
        }
    }, 2000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to skills
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('float-animation');
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading message
        showNotification('Sending message...', 'info');
        
        // Let the form submit to Formspree
        // The page will redirect to Formspree's thank you page
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add scroll reveal animation for elements
function addScrollReveal() {
    const elements = document.querySelectorAll('.about-text, .contact-info, .contact-form, .cert-card');
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll reveal
addScrollReveal();

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .project-card, .hobby-card, .skill-item, .stat-card, .about-text, .contact-info, .contact-form, .cert-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .float-animation {
        animation: floatSkill 3s ease-in-out infinite;
    }
    
    @keyframes floatSkill {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .skill-item:nth-child(even) .float-animation {
        animation-direction: reverse;
    }
`;
document.head.appendChild(style);

// Add interactive cursor effect (optional)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        Object.assign(newCursor.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            background: 'rgba(79, 70, 229, 0.3)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.1s ease'
        });
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.cursor');
    cursorElement.style.left = e.clientX + 'px';
    cursorElement.style.top = e.clientY + 'px';
});

// Add hover effects for interactive elements
document.querySelectorAll('a, button, .project-card, .hobby-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'rgba(79, 70, 229, 0.5)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(79, 70, 229, 0.3)';
        }
    });
});

// Dark mode toggle (bonus feature)
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'dark-mode-toggle';
    
    Object.assign(toggle.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: '#4f46e5',
        color: 'white',
        cursor: 'pointer',
        zIndex: '1000',
        fontSize: '1.2rem',
        boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
        transition: 'all 0.3s ease'
    });
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
    
    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(toggle);
}

// Initialize dark mode toggle
createDarkModeToggle();

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        --bg-primary: #1a202c;
        --bg-secondary: #2d3748;
        --text-primary: #f7fafc;
        --text-secondary: #e2e8f0;
    }
    
    .dark-mode .navbar {
        background: rgba(26, 32, 44, 0.95) !important;
    }
    
    .dark-mode .about {
        background: var(--bg-primary) !important;
        color: var(--text-primary);
    }
    
    .dark-mode .contact {
        background: var(--bg-primary) !important;
        color: var(--text-primary);
    }
    
    .dark-mode .projects {
        background: var(--bg-secondary) !important;
    }
    
    .dark-mode .project-card,
    .dark-mode .skill-item,
    .dark-mode .stat-card,
    .dark-mode .contact-form {
        background: var(--bg-primary) !important;
        color: var(--text-primary);
    }
    
    .dark-mode .section-title,
    .dark-mode .about-intro,
    .dark-mode .contact-info h3,
    .dark-mode .contact-info p,
    .dark-mode .project-content h3,
    .dark-mode .project-content p {
        color: var(--text-primary) !important;
    }
    
    .dark-mode-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
    }
`;
document.head.appendChild(darkModeStyles);

console.log('Portfolio website loaded successfully! 🚀');
