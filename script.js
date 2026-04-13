// ============================================
// Typed Text Animation
// ============================================
const typedPhrases = [
    "AI/ML Engineer",
    "Deep Learning Researcher",
    "Co-Founder @ Discensys",
    "Open-Source Contributor",
    "Technical Blogger",
    "Data Engineer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typedText');

function typeEffect() {
    const currentPhrase = typedPhrases[phraseIndex];

    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Mobile Navigation
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// Scroll Reveal Animations
// ============================================
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

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// ============================================
// Counter Animation
// ============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ============================================
// Active Navigation Highlight
// ============================================
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
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
// Smooth Scroll for Safari
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// Custom Robot Cursor
// ============================================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    const customCursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let prevMouseX = 0, prevMouseY = 0;

    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, .project-card, .btn').forEach(el => {
        el.style.cursor = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        trailX += (mouseX - trailX) * 0.08;
        trailY += (mouseY - trailY) * 0.08;

        // Tilt based on movement direction
        const dx = mouseX - prevMouseX;
        const tilt = Math.max(-25, Math.min(25, dx * 2));

        customCursor.style.left = cursorX - 20 + 'px';
        customCursor.style.top = cursorY - 20 + 'px';
        customCursor.querySelector('.cursor-robot').style.transform = `rotate(${tilt}deg)`;

        cursorTrail.style.left = trailX - 6 + 'px';
        cursorTrail.style.top = trailY - 6 + 'px';

        prevMouseX = mouseX;
        prevMouseY = mouseY;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ============================================
// Neural Network Background
// ============================================
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let canvasMouseX = 0, canvasMouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    canvasMouseX = e.clientX;
    canvasMouseY = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        const dist = Math.hypot(this.x - canvasMouseX, this.y - canvasMouseY);
        const glow = dist < 200 ? 1 - dist / 200 : 0;
        const alpha = this.baseAlpha + glow * 0.5;
        const r = this.radius + glow * 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${alpha})`;
        ctx.fill();

        if (glow > 0) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, r + 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${glow * 0.15})`;
            ctx.fill();
        }
    }
}

// Create particles
const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < 150) {
                const midX = (particles[i].x + particles[j].x) / 2;
                const midY = (particles[i].y + particles[j].y) / 2;
                const mouseDist = Math.hypot(midX - canvasMouseX, midY - canvasMouseY);
                const glow = mouseDist < 200 ? 1 - mouseDist / 200 : 0;
                const alpha = (1 - dist / 150) * 0.08 + glow * 0.2;

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
                ctx.lineWidth = 0.5 + glow;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================
// Robot Screen Text
// ============================================
const robotScreenPhrases = [">_ AI", "0101", "PyTorch", ">_ ML", "train()", "99.9%", "deploy"];
let robotScreenIndex = 0;
const robotScreenText = document.getElementById('robotScreenText');

if (robotScreenText) {
    setInterval(() => {
        robotScreenIndex = (robotScreenIndex + 1) % robotScreenPhrases.length;
        robotScreenText.textContent = robotScreenPhrases[robotScreenIndex];
    }, 2000);
}

// ============================================
// 3D Card Tilt Effect
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
    const inner = card.querySelector('.project-card-inner');
    if (!inner) return;

    // Add glare element
    const glare = document.createElement('div');
    glare.className = 'card-glare';
    inner.appendChild(glare);

    card.addEventListener('mousemove', (e) => {
        if (isTouchDevice) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        inner.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

        // Move glare
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.setProperty('--glare-x', glareX + '%');
        glare.style.setProperty('--glare-y', glareY + '%');
    });

    card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ============================================
// Magnetic Buttons
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (isTouchDevice) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
