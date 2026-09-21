(() => {
  const cover = document.querySelector('.interactive-cover');
  if (!cover) return;
  const cards = [...cover.querySelectorAll('.service-ticket')];
  const portrait = cover.querySelector('#mascot-main');
  const motion = cover.querySelector('.mascot-motion');
  const video = cover.querySelector('#greeting-video');
  const bubble = cover.querySelector('.hello-bubble');
  const status = cover.querySelector('#cover-status');
  const hint = cover.querySelector('#cover-hint-text');
  const media = window.coverMedia;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const loaded = new Map();
  const expressions = ['开心','期待','惊讶','眨眼','可爱'];
  const languages = [
    ['zh','中文','你好'],['en','English','Hello'],['es','Español','Hola'],
    ['fr','Français','Bonjour'],['de','Deutsch','Hallo'],['it','Italiano','Ciao'],
    ['ja','日本語','こんにちは'],['ko','한국어','안녕하세요']
  ];
  let active = -1;
  let armed = -1;
  let playingVideo = false;
  let videoTimer;
  let helloTimer;
  let languageIndex = 0;
  const originalHint = '点选卡片看表情，再点一次进入版块';
  function displayLanguage(index, announce = false) {
    languageIndex = index;
    const [lang,name,word] = languages[index];
    const greeting = cover.querySelector('#hello-word');
    greeting.textContent = word; greeting.lang = lang;
    cover.querySelector('#hello-language').textContent = name;
    cover.querySelectorAll('[data-language]').forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
    if (announce) status.textContent = name+'：'+word;
  }
  function stopGreeting() {
    clearTimeout(helloTimer);
    cover.classList.remove('is-greeting');
  }
  function greet() {
    stopGreeting(); displayLanguage(0); cover.classList.add('is-greeting');
    if (reduced.matches) { cover.classList.remove('is-greeting'); return; }
    let step = 0;
    const advance = () => {
      if (document.hidden) {stopGreeting();return;}
      if (++step === languages.length) {
        displayLanguage(0); stopGreeting(); return;
      }
      displayLanguage(step);
      helloTimer = setTimeout(advance,1500);
    };
    helloTimer = setTimeout(advance,1500);
  }
  cover.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    stopGreeting();displayLanguage(Number(button.dataset.language),true);
  }));
  cover.querySelector('.hello-replay').addEventListener('click',greet);
  function restore() {
    active = -1; armed = -1;
    cover.dataset.activeCard = '';
    cards.forEach(card => card.classList.remove('is-watched'));
    portrait.src = media.mainImage;
    portrait.alt = '棕黑发圆眼镜卡通伙伴';
    cover.querySelector('.mascot-stage').setAttribute('aria-label',portrait.alt);
    motion.style.setProperty('--look-tilt','0deg');
    hint.textContent = originalHint;
  }
  function show(index) {
    active = index; stopGreeting();
    cover.dataset.activeCard = String(index);
    cards.forEach((card,i) => card.classList.toggle('is-watched',i===index));
    const name = cards[index].querySelector('h2').textContent;
    if (!playingVideo) {
      const src = media.cardStates[index];
      portrait.src = src && loaded.get(src) ? src : media.mainImage;
      portrait.alt = '卡通伙伴以'+expressions[index]+'表情看向'+name;
      cover.querySelector('.mascot-stage').setAttribute('aria-label',portrait.alt);
      motion.style.setProperty('--look-tilt',((index-2)*.8)+'deg');
    }
    hint.textContent = expressions[index]+' · '+name;
  }
  media.cardStates.forEach((src,index) => {
    if (!src) return;
    const image = new Image();
    image.onload = () => {loaded.set(src,true); if(active===index) show(index);};
    image.onerror = () => loaded.set(src,false);
    image.src = src;
  });
  cards.forEach((card,index) => {
    card.addEventListener('pointerenter',event => {if(event.pointerType!=='touch') show(index);});
    card.addEventListener('pointerleave',event => {if(event.pointerType!=='touch') restore();});
    card.addEventListener('focus',() => show(index));
    card.addEventListener('blur',restore);
    card.addEventListener('click',event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (armed !== index) {
        event.preventDefault(); armed=index; show(index);
        hint.textContent='再点一次「'+card.querySelector('h2').textContent+'」进入';
        status.textContent=hint.textContent;
      }
    });
    card.addEventListener('keydown',event => {if(event.key==='Escape'){restore();card.blur();}});
  });
  cover.addEventListener('pointerleave',event => {if(event.pointerType!=='touch')restore();});
  document.addEventListener('pointerdown',event => {if(!event.target.closest('.service-ticket'))restore();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopGreeting();restore();}});
  reduced.addEventListener('change',()=>{if(reduced.matches)stopGreeting();});
  function finishGreetingVideo() {
    clearTimeout(videoTimer); video.pause();video.hidden=true;portrait.style.visibility='visible';
    playingVideo=false;restore();greet();
  }
  if (media.greetingVideo && !reduced.matches) {
    video.src=media.greetingVideo;video.muted=true;
    video.addEventListener('playing',()=>{playingVideo=true;video.hidden=false;portrait.style.visibility='hidden';clearTimeout(videoTimer);},{once:true});
    video.addEventListener('ended',finishGreetingVideo,{once:true});
    video.addEventListener('error',finishGreetingVideo,{once:true});
    videoTimer=setTimeout(finishGreetingVideo,8000);
    video.play().catch(finishGreetingVideo);
  } else greet();
})();
