const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const dropdowns = [...document.querySelectorAll('.nav-drop')];
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
dropdowns.forEach(current => current.addEventListener('toggle', () => {
  if (current.open) dropdowns.forEach(other => { if (other !== current) other.open = false; });
}));
document.addEventListener('click', event => {
  dropdowns.forEach(dropdown => { if (!dropdown.contains(event.target)) dropdown.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const active = dropdowns.find(dropdown => dropdown.open);
    if (active) { active.open = false; active.querySelector('summary').focus(); }
    else if (navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    }
  }
});
