// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const navbar = document.querySelector('.navbar');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth Scroll Navigation — close mobile menu on link click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Navbar background on scroll + Active Nav Highlight
// Coalesced into a single rAF-throttled scroll handler for performance
const sections = Array.from(document.querySelectorAll('section[id]'));

function handleScroll() {
    const y = window.scrollY;

    // Navbar background
    if (y > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }

    // Active nav highlight
    const scrollY = y + 120;
    let currentId = '';
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
            currentId = section.getAttribute('id');
            break;
        }
    }
    navLinksItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

// Throttle scroll via requestAnimationFrame — runs at most once per frame
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
            handleScroll();
            scrollTicking = false;
        });
    }
}, { passive: true });

// Typing Effect
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AI Student", "Software Engineer", "C++ Learner", "Full Stack Developer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Reveal Animation (Intersection Observer)
// Unobserve after revealed to stop unnecessary observation work
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    revealObserver.observe(element);
});
