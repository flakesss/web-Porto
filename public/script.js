// Personal information (optional)
const name = "Hatta Dwi Putranto";
let age = 19;
console.log(`My name is ${name} and I am ${age} years old.`);

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    enhanceMobileMenu();
    setupNavbarScroll();
    setupDarkModeToggle();
    enhancedTypingEffect();
    createScrollTopButton();
    createCustomCursor();
    addSkillProgressBars();
    addParallaxBackgrounds();
    setupScrollRevealElements();
});

// Mobile Menu Enhancement
function enhanceMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Create menu overlay if it doesn't exist
        let menuOverlay = document.querySelector('.menu-overlay');
        if (!menuOverlay) {
            menuOverlay = document.createElement('div');
            menuOverlay.classList.add('menu-overlay');
            document.body.appendChild(menuOverlay);
        }

        // Update hamburger icon to use bars
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Change icon based on menu state
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                                '<i class="fas fa-times"></i>' : 
                                '<i class="fas fa-bars"></i>';
                                
            // Prevent body scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });

        // Close menu when clicking a menu item
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }
}


// ====== FULL IMAGE OVERLAY ======
function openFullImage(src) {
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';

    const img = document.createElement('img');
    img.src = src;
    img.classList.add('full-image');

    // Close button
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-overlay-btn');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    
    // Add active class after a small delay for animation
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeImageOverlay(overlay);
        }
    });
    
    closeBtn.addEventListener('click', function() {
        closeImageOverlay(overlay);
    });
}

function closeImageOverlay(overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 300);
}

// ====== NAVBAR SCROLL ======
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar-container');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ====== DARK/LIGHT MODE TOGGLE ======
function setupDarkModeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
}

// ====== ENHANCED TYPING EFFECT ======
function enhancedTypingEffect() {
    const roles = ["Web Developer", "AI Enthusiast", "Machine Learning Engineer", "Game Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTextEl = document.getElementById('typing-text');
    const cursorEl = document.querySelector('.typing-cursor');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // If finished typing
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseDuration);
        } 
        // If finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        } 
        // Continue typing or deleting
        else {
            setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
        }
    }
    
    // Blinking cursor effect
    setInterval(() => {
        cursorEl.classList.toggle('active');
    }, 500);
    
    setTimeout(typeRole, 1000);
}

// ====== SCROLL REVEAL ANIMATION ======
function scrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// ====== PARALLAX EFFECT ======
function parallaxEffect() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    parallaxBgs.forEach(bg => {
        const scrollPosition = window.pageYOffset;
        const parentElement = bg.parentElement;
        const parentPosition = parentElement.offsetTop;
        const speed = 0.5;
        
        const yPos = (scrollPosition - parentPosition) * speed;
        
        bg.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// ====== SCROLL TO TOP BUTTON ======
function createScrollTopButton() {
    const scrollTop = document.createElement('div');
    scrollTop.classList.add('scroll-top');
    scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====== CUSTOM CURSOR EFFECT ======
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        if (!cursor.classList.contains('active')) {
            cursor.classList.add('active');
        }
    });
    
    // Hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .btn, .nav-link, .project-item, .certificate-item, .skill-item, .hamburger, .toggle-label');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
}

// ====== SKILL PROGRESS BARS ======
function addSkillProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('h3').textContent;
        let proficiency;
        
        // Assign proficiency based on skill name
        if (skillName.includes('Web Development')) {
            proficiency = 85;
        } else if (skillName.includes('Machine Learning')) {
            proficiency = 80;
        } else if (skillName.includes('Data Science')) {
            proficiency = 75;
        } else {
            proficiency = 70; // Default
        }
        
        const progressBar = document.createElement('div');
        progressBar.classList.add('skill-progress-container');
        progressBar.innerHTML = `
            <div class="skill-progress-bar">
                <div class="skill-progress-fill" style="width: 0%"></div>
            </div>
            <div class="skill-progress-percentage">${proficiency}%</div>
        `;
        
        item.appendChild(progressBar);
        
        // Animate the progress bar when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fillElement = entry.target.querySelector('.skill-progress-fill');
                    fillElement.style.width = `${proficiency}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// ====== ADD PARALLAX BACKGROUNDS ======
function addParallaxBackgrounds() {
    const sections = document.querySelectorAll('.skills-container, .projects-container, .certificates-container, .contact-container');
    
    sections.forEach(section => {
        // Check if parallax-bg already exists
        if (!section.querySelector('.parallax-bg')) {
            const parallaxBg = document.createElement('div');
            parallaxBg.classList.add('parallax-bg');
            section.prepend(parallaxBg);
        }
    });
}

// ====== SETUP SCROLL REVEAL ELEMENTS ======
function setupScrollRevealElements() {
    const revealElements = [
        '.skill-item', 
        '.project-item', 
        '.certificate-item',
        '.hero-right h1',
        '.hero-right h2',
        '.hero-right p',
        '.hero-left',
        '.social-icons a',
        '.skills-container h2',
        '.projects-container h2',
        '.certificates-container h2',
        '.contact-container h2',
        '.download-cv-btn'
    ];
    
    revealElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // Only add reveal class if it doesn't already have it
            if (!element.classList.contains('reveal')) {
                element.classList.add('reveal');
                // Add delay for staggered animation
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    });
}
