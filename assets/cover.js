(() => {
  const cover = document.querySelector('.interactive-cover');
  if (!cover) return;
  const cards = [...cover.querySelectorAll('.service-ticket')];
  const portrait = cover.querySelector('#mascot-main');
  const motion = cover.querySelector('.mascot-motion');
  const video = cover.querySelector('#greeting-video');
  const media = window.coverMedia;
  const loaded = new Map();
  let active = -1;
  let playing = false;
  let videoTimer;
  function restore() {
    active = -1;
    cards.forEach(card => card.classList.remove('is-watched'));
    portrait.src = media.mainImage;
    motion.style.setProperty('--look-tilt', '0deg');
  }
  function show(index) {
    active = index;
    cards.forEach((card,i) => card.classList.toggle('is-watched',i === index));
    if (playing) return;
    const src = media.cardStates[index];
    portrait.src = src && loaded.get(src) ? src : media.mainImage;
    motion.style.setProperty('--look-tilt', ((index - 2) * 1.4) + 'deg');
  }
  media.cardStates.filter(Boolean).forEach(src => {
    const image = new Image();
    image.onload = () => { loaded.set(src,true); if (active >= 0 && media.cardStates[active] === src) show(active); };
    image.src = src;
  });
  cards.forEach((card,index) => {
    card.addEventListener('pointerenter',event => {if(event.pointerType !== 'touch') show(index);});
    card.addEventListener('pointerleave',restore);
    card.addEventListener('focus',() => show(index));
    card.addEventListener('blur',restore);
  });
  cover.addEventListener('pointerleave',restore);
  function finishGreeting() {
    clearTimeout(videoTimer);
    video.pause(); video.hidden = true; portrait.style.visibility = 'visible';
    playing = false; restore();
  }
  if (media.greetingVideo && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.src = media.greetingVideo;
    video.muted = true;
    video.addEventListener('playing', () => {playing = true; video.hidden = false; portrait.style.visibility = 'hidden';clearTimeout(videoTimer);}, {once:true});
    video.addEventListener('ended',finishGreeting,{once:true});
    video.addEventListener('error',finishGreeting,{once:true});
    videoTimer = setTimeout(finishGreeting,8000);
    video.play().catch(finishGreeting);
  }
})();
