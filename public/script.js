// Personal information (optional)
const name = "Hatta Dwi Putranto";
let age = 19;
console.log(`My name is ${name} and I am ${age} years old.`);

// Responsive menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
} else {
    console.error("Element '.hamburger' or '.nav-menu' not found.");
}

// Full image overlay
function openFullImage() {
    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';

    const img = document.createElement('img');
    img.src = 'assets/1000090901 (1).jpg';
    img.classList.add('full-image');

    overlay.addEventListener('click', function() {
        document.body.removeChild(this);
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// Navbar color on scroll & active menu links
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

// Dark/Light Mode Toggle
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

// Typewriter Effect with multiple phrases
const roles = ["Web Development", "Machine Learning Enthusiast", "Game Development"];
let roleIndex = 0;
let charIndex = 0;
let typingTextEl = document.getElementById('typing-text');
const cursorEl = document.querySelector('.typing-cursor');

function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        typingTextEl.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, 100);
    } else {
        // Pause before deleting
        setTimeout(deleteRole, 2000);
    }
}

function deleteRole() {
    if (charIndex > 0) {
        typingTextEl.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteRole, 50);
    } else {
        // Move to next role
        roleIndex++;
        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }
        setTimeout(typeRole, 500);
    }
}

function blinkCursor(){
    setInterval(() => {
        cursorEl.classList.toggle('active');
    }, 500);
}

blinkCursor();
typeRole();
