/**
 * studyUP - Main JavaScript
 * Handles all interactive functionality
 */

(function() {
    'use strict';

    // ============================================
    // 1. Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ============================================
    // 2. Header Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // 3. Smooth Scroll for Navigation Links
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 4. Number Counter Animation
    // ============================================
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    };

    animateNumbers();

    // ============================================
    // 5. Scroll Animation Trigger
    // ============================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    document.addEventListener('DOMContentLoaded', animateOnScroll);

    // ============================================
    // 6. Form Validation & Submission
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const formData = new FormData(this);
            const data = {};
            let isValid = true;
            
            // Collect form data
            for (let [key, value] of formData.entries()) {
                data[key] = value.trim();
                
                // Check if required fields are filled
                if (!value.trim() && this.querySelector(`[name="${key}"]`).hasAttribute('required')) {
                    isValid = false;
                    this.querySelector(`[name="${key}"]`).classList.add('error');
                } else {
                    this.querySelector(`[name="${key}"]`).classList.remove('error');
                }
            }
            
            if (isValid) {
                // Show success message
                showNotification('Grazie per la tua richiesta! Ti contatteremo presto.', 'success');
                
                // Reset form
                this.reset();
                
                // Here you would normally send the data to a server
                // For now, we'll just log it
                console.log('Form data submitted:', data);
                
                // If using Formspree or similar service, uncomment:
                // this.submit();
            } else {
                showNotification('Per favore, compila tutti i campi richiesti.', 'error');
            }
        });
        
        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // ============================================
    // 7. Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        const styles = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
                max-width: 350px;
            }
            
            .notification-content {
                background: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 12px;
                border-left: 4px solid;
            }
            
            .notification-success .notification-content {
                border-left-color: #a7c957;
            }
            
            .notification-error .notification-content {
                border-left-color: #f97316;
            }
            
            .notification-info .notification-content {
                border-left-color: #1e3a8a;
            }
            
            .notification-message {
                flex: 1;
                color: #1e3a8a;
                font-size: 0.95rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6b7280;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: #1e3a8a;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        // Add styles if not already added
        if (!document.getElementById('notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ============================================
    // 8. Lazy Loading for Images
    // ============================================
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };

    // Initialize lazy loading
    document.addEventListener('DOMContentLoaded', lazyLoadImages);

    // ============================================
    // 9. Team Slider Touch Support
    // ============================================
    const teamSlider = document.querySelector('.team-slider');
    
    if (teamSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        teamSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            teamSlider.classList.add('active');
            startX = e.pageX - teamSlider.offsetLeft;
            scrollLeft = teamSlider.scrollLeft;
        });
        
        teamSlider.addEventListener('mouseleave', () => {
            isDown = false;
            teamSlider.classList.remove('active');
        });
        
        teamSlider.addEventListener('mouseup', () => {
            isDown = false;
            teamSlider.classList.remove('active');
        });
        
        teamSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teamSlider.offsetLeft;
            const walk = (x - startX) * 2;
            teamSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // ============================================
    // 10. Active Section Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // 11. Pricing Card Hover Effect
    // ============================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                pricingCards.forEach(c => c.style.opacity = '0.7');
                this.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => c.style.opacity = '1');
        });
    });

    // ============================================
    // 12. Performance Optimization
    // ============================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for resize events
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
    
    // Optimize scroll events
    const optimizedScroll = debounce(() => {
        // Your scroll event code here
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll);
    
    // Optimize resize events
    const optimizedResize = throttle(() => {
        // Your resize event code here
    }, 250);
    
    window.addEventListener('resize', optimizedResize);

    // ============================================
    // 13. Initialize Everything
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        console.log('studyUP website initialized successfully!');
        
        // Add loading class removal
        document.body.classList.add('loaded');
        
        // Initialize AOS or other libraries if needed
        // AOS.init();
    });

})();
