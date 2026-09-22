(() => {
  const page = document.querySelector('.joint-page');
  if (!page) return;
  const filters = page.querySelector('.jp-filters');
  const cards = [...page.querySelectorAll('.jp-card')];
  const count = page.querySelector('#jp-count');
  if (!filters || !count) return;
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const filter = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visible = 0;
    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.subjects.split(' ').includes(filter);
      card.hidden = !matches;
      if (matches) visible++;
    });
    count.replaceChildren(document.createTextNode(`${visible} 个项目 `));
    const english = document.createElement('span');
    english.lang = 'en';
    english.textContent = `${visible} ${visible === 1 ? 'programme' : 'programmes'}`;
    count.append(english);
  });
})();
