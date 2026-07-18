// ============================================================
// Narasimha Reddy Kasarla — Portfolio
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Navbar: scrolled state + scroll progress ----------
const navbar = document.getElementById('navbar');
const progressBar = document.querySelector('.scroll-progress');

function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : '0%';
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ---------- Active nav link while scrolling ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => activeObserver.observe(section));

// ---------- Reveal on scroll (with stagger for siblings) ----------
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('revealed'));
} else {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
        const siblings = [...el.parentElement.children].filter(child => child.classList.contains('reveal'));
        el.style.setProperty('--reveal-delay', `${siblings.indexOf(el) * 0.08}s`);
        revealObserver.observe(el);
    });
}

// ---------- Typewriter ----------
const roles = [
    'intelligent ML systems.',
    'full-stack applications.',
    'data-driven products.',
    'things that ship.'
];
const typeTarget = document.getElementById('typewriter');

if (prefersReducedMotion) {
    typeTarget.textContent = roles[0];
} else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typeTarget.textContent = current.slice(0, charIndex);

        let delay = deleting ? 40 : 75;
        if (!deleting && charIndex === current.length) {
            delay = 2200;
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }
        setTimeout(type, delay);
    }

    type();
}

// ---------- Animated counters ----------
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target);
        counterObserver.unobserve(el);

        if (prefersReducedMotion) {
            el.textContent = target;
            return;
        }

        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

// ---------- Contact form (async submit, no redirect) ----------
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit');

form.addEventListener('submit', async event => {
    event.preventDefault();
    formStatus.textContent = '';
    formStatus.className = 'form-status mono';
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending… <i class="fas fa-circle-notch fa-spin"></i>';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            form.reset();
            formStatus.textContent = '✓ Message sent — I\'ll get back to you soon!';
            formStatus.classList.add('ok');
        } else {
            throw new Error('Formspree error');
        }
    } catch {
        formStatus.textContent = '✗ Something went wrong. Email me directly at simhar25@gmail.com';
        formStatus.classList.add('err');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send message <i class="fas fa-paper-plane"></i>';
    }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
