// ============================================
// app.js - Main Application JavaScript
// Vanilla JS — no frameworks required
// ============================================

(function () {
    'use strict';

    // ── Smooth scroll helper ─────────────────────
    function scrollToElement(target) {
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    // ── Anchor link interception ─────────────────
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || !href.includes('#')) return;

        try {
            const url = new URL(anchor.href, window.location.href);
            if (
                url.origin === window.location.origin &&
                url.pathname === window.location.pathname
            ) {
                const hash = url.hash;
                if (hash && hash !== '#') {
                    const el = document.querySelector(hash);
                    if (el) {
                        e.preventDefault();
                        scrollToElement(el);
                        // Close mobile menu if open
                        closeMobileMenu();
                    }
                }
            }
        } catch (err) {
            console.error('Invalid URL:', err);
        }
    });

    // ── Hash scroll on page load ─────────────────
    if (window.location.hash) {
        setTimeout(function () {
            const el = document.querySelector(window.location.hash);
            if (el) scrollToElement(el);
        }, 150);
    }

    // ── Mobile Hamburger Menu ────────────────────
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (!hamburger || !mobileMenu) return;

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (
                !hamburger.contains(e.target) &&
                !mobileMenu.contains(e.target)
            ) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (hamburger) hamburger.classList.remove('open');
        if (mobileMenu) mobileMenu.classList.remove('open');
    }

    // ── Active nav link highlight (scroll spy) ──
    function updateActiveNav() {
        const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
        let currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Treat article.html as articles.html for navbar highlighting
        if (currentPage === 'article.html') {
            currentPage = 'articles.html';
        }

        // On non-index pages, just highlight by page path
        if (currentPage !== 'index.html' && currentPage !== '') {
            links.forEach(function (link) {
                const href = link.getAttribute('href') || '';
                const linkPage = href.split('/').pop().split('#')[0] || 'index.html';
                link.classList.toggle('active', linkPage === currentPage);
            });
            return;
        }

        // On index.html — use scroll spy for section links
        const sections = [
            { id: 'hero', selector: '.hero', href: 'index.html' },
            { id: 'about', selector: '#about', href: 'index.html#about' },
            { id: 'skills', selector: '#skills', href: 'index.html#skills' },
            { id: 'experience', selector: '#experience', href: 'index.html#experience' },
        ];

        function getSectionLinks(href) {
            return Array.from(links).filter(function (l) {
                const h = l.getAttribute('href') || '';
                return h === href || h === href.replace('index.html', '');
            });
        }

        function onScroll() {
            const scrollY = window.scrollY + 120; // offset for navbar height
            let active = sections[0];

            sections.forEach(function (s) {
                const el = document.querySelector(s.selector);
                if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
                    active = s;
                }
            });

            links.forEach(function (l) { l.classList.remove('active'); });
            getSectionLinks(active.href).forEach(function (l) { l.classList.add('active'); });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }

    // ── Scroll-reveal Animations ─────────────────
    function initReveal() {
        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        elements.forEach(function (el) { observer.observe(el); });
    }

    // ── Progress Bar Animations ──────────────────
    function animateProgressBars() {
        const bars = document.querySelectorAll('.progress-bar .progress');
        if (!bars.length) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || '0';
                    bar.style.width = width + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        bars.forEach(function (bar) { observer.observe(bar); });
    }

    // ── Projects Filter ──────────────────────────
    function initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        if (!filterBtns.length || !projectCards.length) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active state
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                let visibleIndex = 0;

                projectCards.forEach(function (card) {
                    const category = card.getAttribute('data-category');
                    const show = filter === 'all' || category === filter;

                    // Cancel any pending timeout to prevent race conditions
                    if (card._filterTimeout) {
                        clearTimeout(card._filterTimeout);
                        card._filterTimeout = null;
                    }

                    if (show) {
                        // Ensure it is visible in the DOM
                        card.style.display = 'block';
                        
                        // Set the initial layout state (invisible and moved down slightly) without animation
                        card.style.transition = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        
                        // Force a browser reflow/repaint to register the initial state
                        card.offsetHeight;
                        
                        // Calculate staggered delay for a clean wave effect
                        const delay = visibleIndex * 50; // 50ms delay per card
                        visibleIndex++;
                        
                        // Apply the transition settings with delay and slide-up to final state
                        card.style.transition = `opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        // Fade out and translate down smoothly
                        card.style.transition = 'opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1), transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Hide from DOM after transition completes
                        card._filterTimeout = setTimeout(function () {
                            card.style.display = 'none';
                            card._filterTimeout = null;
                        }, 250);
                    }
                });
            });
        });
    }

    // ── Contact Form Handling ────────────────────
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('.btn-submit');
            const alertBox = document.getElementById('formAlert');

            const data = {
                name: form.querySelector('#name').value.trim(),
                email: form.querySelector('#email').value.trim(),
                subject: form.querySelector('#subject').value.trim(),
                message: form.querySelector('#message').value.trim()
            };

            if (!data.name || !data.email || !data.subject || !data.message) {
                showAlert(alertBox, 'error', 'Harap isi semua field yang diperlukan.');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Mengirim...</span>';

            try {
                if (window.SupabaseService) {
                    const { error } = await window.SupabaseService.contacts.add(data);
                    if (!error) {
                        showAlert(alertBox, 'success', 'Pesan Anda berhasil terkirim! Saya akan segera menghubungi Anda.');
                        form.reset();
                    } else {
                        throw new Error(error.message);
                    }
                } else {
                    // Fallback: mailto
                    const mailtoLink = `mailto:rulikhairul25@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent('Dari: ' + data.name + ' (' + data.email + ')\n\n' + data.message)}`;
                    window.location.href = mailtoLink;
                    showAlert(alertBox, 'success', 'Membuka aplikasi email Anda...');
                }
            } catch (err) {
                showAlert(alertBox, 'error', 'Terjadi kesalahan. Silakan hubungi via email langsung.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Kirim Pesan</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="18" height="18">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>`;
            }
        });
    }

    function showAlert(container, type, message) {
        if (!container) return;
        container.className = `alert alert-${type}`;
        container.innerHTML = (type === 'success'
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        ) + message;
        container.style.display = 'flex';
    }

    // ── Navbar scroll style ──────────────────────
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                navbar.style.boxShadow = '0 8px 32px rgba(37,99,235,0.15)';
            } else {
                navbar.style.boxShadow = '';
            }
        }, { passive: true });
    }



    // ── Typing Effect ────────────────────────────
    function initTypingEffect() {
        var el = document.getElementById('typingText');
        if (!el) return;

        var roles = ['Web Developer', 'Informatics Student', 'Full Stack Dev'];
        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingDelay = 100;   // ms per character when typing
        var deletingDelay = 55;    // ms per character when deleting
        var pauseAfterType = 1800; // pause before deleting
        var pauseAfterDelete = 400; // pause before next word

        function tick() {
            var current = roles[roleIndex];

            if (isDeleting) {
                // Remove one character
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add one character
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            var delay = isDeleting ? deletingDelay : typingDelay;

            if (!isDeleting && charIndex === current.length) {
                // Finished typing → pause, then start deleting
                delay = pauseAfterType;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Finished deleting → move to next word
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = pauseAfterDelete;
            }

            setTimeout(tick, delay);
        }

        // Small initial delay so the page is settled
        setTimeout(tick, 600);
    }

    // ── Initialize everything on DOM ready ───────
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        updateActiveNav();
        initReveal();
        animateProgressBars();
        initProjectFilter();
        initContactForm();
        initNavbarScroll();
        initTypingEffect();
    });

})();
