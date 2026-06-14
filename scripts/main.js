/**
 * main.js
 * Initializes scroll reveal and other shared behaviors
 * after all sections have loaded.
 */

(function () {
  'use strict';

  let initialized = false;

  // Globally/locally accessible safety fallback function
  function forceRevealAll() {
    // 1. Ensure js-reveal-active is on document element
    document.documentElement.classList.add('js-reveal-active');
    
    // 2. Reveal all elements immediately
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });

    console.log('[AnimationSafety] forceRevealAll was executed.');
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    // Call safety function if IntersectionObserver is not supported
    if (!window.IntersectionObserver) {
      forceRevealAll();
      return;
    }

    // Call safety function if reduced motion is enabled
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      forceRevealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is intersecting, or already scrolled past (bounding top < height)
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    // Safety fallback timeout: force reveal remaining hidden elements after 2.5 seconds
    setTimeout(() => {
      const hidden = document.querySelectorAll('.reveal:not(.is-visible)');
      if (hidden.length > 0) {
        console.warn(`[AnimationSafety] Safety timeout expired. Force revealing ${hidden.length} elements.`);
        forceRevealAll();
      }
    }, 2500);
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
    if (initialized) return;
    initialized = true;

    try {
      // Check if critical sections are loaded
      const criticalSections = [
        'section-header',
        'section-hero',
        'section-services',
        'section-about',
        'section-showcase',
        'section-footer'
      ];
      let partialLoadFailure = false;
      for (const id of criticalSections) {
        const el = document.getElementById(id);
        if (el && el.innerHTML.trim() === '') {
          console.warn(`[AnimationSafety] Critical section #${id} is empty (failed to load).`);
          partialLoadFailure = true;
        }
      }

      if (partialLoadFailure) {
        forceRevealAll();
      }

      initScrollReveal();
      initSmoothAnchorLinks();
      initHeaderScroll();
      initFooterYear();
      initActiveSectionHighlight();
    } catch (err) {
      console.error('[AnimationSafety] Error during main initialization. Triggering forceRevealAll fallback.', err);
      forceRevealAll();
    }
  }

  document.addEventListener('sections:loaded', init);

  // Fallback if sections:loaded fires before this script runs
  if (document.readyState !== 'loading') {
    setTimeout(init, 400);
  }
})();
