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

  function openDrawer() {
    if (!drawer || !backdrop || !navToggle) return;
    drawer.hidden = false;
    backdrop.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus first link for accessibility
    var firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!drawer || !backdrop || !navToggle) return;
    drawer.hidden = true;
    backdrop.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  if (drawer) {
    drawer.addEventListener('click', function (e) {
      // Close drawer when a link is tapped
      var target = e.target;
      if (target && target.tagName === 'A') closeDrawer();
    });
  }

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
