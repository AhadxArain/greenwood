(function () {
  'use strict';

  function initHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Trigger entrance on next frame
    requestAnimationFrame(() => {
      hero.classList.add('hero-loaded');

      // Stagger content reveals
      const reveals = hero.querySelectorAll('.reveal');
      reveals.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, 80 * i);
      });
    });
  }

  // Run immediately when script loads (section already in DOM)
  initHero();
})();
