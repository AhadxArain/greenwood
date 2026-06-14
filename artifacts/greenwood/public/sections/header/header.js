(function () {
  'use strict';

  function initHeader() {
    const menuBtn  = document.querySelector('.menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeLinks = document.querySelectorAll('[data-close-menu]');

    if (!menuBtn || !mobileMenu) return;

    function openMenu() {
      menuBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      mobileMenu.classList.add('is-open');
      document.body.classList.add('menu-open');
      menuBtn.setAttribute('aria-label', 'Close navigation menu');
    }

    function closeMenu() {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-label', 'Open navigation menu');
    }

    function toggleMenu() {
      if (menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        openMenu();
      }
    }

    menuBtn.addEventListener('click', toggleMenu);

    closeLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuBtn.focus();
      }
    });

    // Close if resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1025) {
        closeMenu();
      }
    });
  }

  if (document.readyState !== 'loading') {
    initHeader();
  } else {
    document.addEventListener('DOMContentLoaded', initHeader);
  }

  // Also run after sections loaded
  document.addEventListener('sections:loaded', initHeader);
})();
