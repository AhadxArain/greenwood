/**
 * main.js
 * Initializes scroll reveal and other shared behaviors
 * after all sections have loaded.
 */

(function () {
  'use strict';

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initSmoothAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('header')?.offsetHeight ?? 72;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              link.classList.toggle(
                'nav-link--active',
                href === '#' + entry.target.id
              );
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  function init() {
    initScrollReveal();
    initSmoothAnchorLinks();
    initHeaderScroll();
    initFooterYear();
    initActiveSectionHighlight();
  }

  document.addEventListener('sections:loaded', init);

  // Fallback if sections:loaded fires before this script runs
  if (document.readyState !== 'loading') {
    setTimeout(init, 400);
  }
})();
