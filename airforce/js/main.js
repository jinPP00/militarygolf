const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  const setNavState = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };

  toggle.addEventListener('click', () => {
    setNavState(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    setNavState(false);
  });
}

document.addEventListener('toggle', (event) => {
  const item = event.target;
  if (!(item instanceof HTMLDetailsElement) || !item.open) return;

  document.querySelectorAll('details[open]').forEach((other) => {
    if (other !== item) other.open = false;
  });
}, true);
