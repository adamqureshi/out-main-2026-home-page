/*
  Only Used Tesla — static homepage prototype
  - Mobile drawer navigation
  - Shop/Sell tabs
  - Cookie banner (localStorage)
*/

(function () {
  // Year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Tabs
  var tabShop = document.getElementById('tab-shop');
  var tabSell = document.getElementById('tab-sell');
  var panelShop = document.getElementById('panel-shop');
  var panelSell = document.getElementById('panel-sell');

  function activateTab(which) {
    var isShop = which === 'shop';

    if (tabShop) tabShop.setAttribute('aria-selected', isShop ? 'true' : 'false');
    if (tabSell) tabSell.setAttribute('aria-selected', isShop ? 'false' : 'true');

    if (panelShop) panelShop.hidden = !isShop;
    if (panelSell) panelSell.hidden = isShop;
  }

  if (tabShop && tabSell) {
    tabShop.addEventListener('click', function () { activateTab('shop'); });
    tabSell.addEventListener('click', function () { activateTab('sell'); });

    // Simple keyboard support: left/right arrows switch tabs
    [tabShop, tabSell].forEach(function (btn) {
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          activateTab(e.key === 'ArrowLeft' ? 'shop' : 'sell');
          (e.key === 'ArrowLeft' ? tabShop : tabSell).focus();
        }
      });
    });
  }

  // Drawer
  var navToggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('drawer');
  var backdrop = document.querySelector('[data-drawer-backdrop]');
  var closeBtn = document.querySelector('[data-drawer-close]');

  // iOS / mobile sometimes triggers a “ghost” click on the element behind the drawer
  // right after closing. We guard against immediate re-open.
  var lastCloseAt = 0;

  function setDrawerOpen(isOpen) {
    if (drawer) drawer.hidden = !isOpen;
    if (backdrop) backdrop.hidden = !isOpen;
    if (navToggle) navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Scroll lock (more reliable than inline overflow on some mobile browsers)
    document.documentElement.classList.toggle('drawer-open', !!isOpen);
    document.body.classList.toggle('drawer-open', !!isOpen);
  }

  function openDrawer(e) {
    // Prevent immediate reopen caused by a ghost click right after close
    var now = Date.now();
    if (now - lastCloseAt < 400) return;

    if (e && e.preventDefault) e.preventDefault();
    setDrawerOpen(true);

    // Focus first link for accessibility
    var firstLink = drawer && drawer.querySelector('a, button');
    if (firstLink && firstLink.focus) {
      try { firstLink.focus(); } catch (err) {}
    }
  }

  function closeDrawer(e) {
    lastCloseAt = Date.now();
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }
    setDrawerOpen(false);
  }

  if (navToggle) {
    navToggle.addEventListener('click', openDrawer);
    // Faster + more reliable on iOS in in-app browsers
    navToggle.addEventListener('touchstart', openDrawer, { passive: false });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('touchstart', closeDrawer, { passive: false });
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
    backdrop.addEventListener('touchstart', closeDrawer, { passive: false });
  }

  if (drawer) {
    drawer.addEventListener('click', function (e) {
      // Close drawer when a link is tapped
      var target = e.target;
      if (target && target.tagName === 'A') closeDrawer();
    });
  }

  // If backdrop is missing for any reason, still allow tap-outside to close.
  document.addEventListener('click', function (e) {
    if (!drawer || drawer.hidden) return;
    var t = e.target;
    if (t && drawer.contains(t)) return;
    if (navToggle && navToggle.contains(t)) return;
    closeDrawer(e);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
  });

  // Cookie banner
  var cookieBanner = document.querySelector('[data-cookie-banner]');
  var accept = document.querySelector('[data-cookie-accept]');
  var decline = document.querySelector('[data-cookie-decline]');
  var cookieKey = 'out_cookie_choice';

  function hideCookieBanner(choice) {
    try {
      localStorage.setItem(cookieKey, choice);
    } catch (err) {
      // Ignore if blocked
    }
    if (cookieBanner) cookieBanner.style.display = 'none';
  }

  (function initCookieBanner() {
    if (!cookieBanner) return;
    try {
      var saved = localStorage.getItem(cookieKey);
      if (saved) cookieBanner.style.display = 'none';
    } catch (err) {
      // If localStorage is blocked, just show banner
    }
  })();

  if (accept) accept.addEventListener('click', function () { hideCookieBanner('accept'); });
  if (decline) decline.addEventListener('click', function () { hideCookieBanner('decline'); });
})();
