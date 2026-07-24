/* ==============================================
   Architecture Website
   Interactive JavaScript
   ============================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initNavbarScroll();
    initProjectFilter();
    initFormSubmission();
    initModal();
    initScrollAnimations();
    initCounterAnimation();
    initSmoothScroll();
});

/* ==============================================
   MOBILE MENU
   ============================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    overlay.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ==============================================
   NAVBAR SCROLL EFFECT
   ============================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==============================================
   PROJECT FILTER
   ============================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==============================================
   FORM SUBMISSION
   ============================================== */
function initFormSubmission() {
    const form = document.getElementById('consultationForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const name = form.querySelector('#name').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        
        if (!name || !phone) {
            alert('لطفاً نام و شماره تماس را وارد کنید.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>در حال ارسال...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success modal
            showModal();
            
            // Reset form
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/* ==============================================
   MODAL
   ============================================== */
function initModal() {
    const modal = document.getElementById('successModal');
    
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==============================================
   SCROLL ANIMATIONS
   ============================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .course-card, .article-card, .testimonial-card, .contact-card'
    );
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ==============================================
   COUNTER ANIMATION
   ============================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = toPersianNumber(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = toPersianNumber(Math.floor(current));
        }
    }, 16);
}

/* ==============================================
   SMOOTH SCROLL
   ============================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==============================================
   UTILITY FUNCTIONS
   ============================================== */

// Convert to Persian numbers
function toPersianNumber(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, d => persianDigits[d]);
}

// Debounce function
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

/* ==============================================
   LAZY LOADING IMAGES
   ============================================== */
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (!lazyImages.length) return;
    
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
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

/* ==============================================
   PRELOADER (Optional)
   ============================================== */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

/* ==============================================
   KEYBOARD NAVIGATION
   ============================================== */
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

/* ==============================================
   PERFORMANCE: THROTTLE SCROLL EVENTS
   ============================================== */
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Scroll-based updates here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
