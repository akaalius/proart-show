'use strict';
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmtDate = iso => { const d = new Date(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; };
const fmtFull = iso => { const d = new Date(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };

/* ---------- Расписание ---------- */
function renderSchedule(city='') {
  const list = city ? SCHEDULE.filter(e => e.city === city) : SCHEDULE;
  $('#sched').innerHTML = list.map((e, i) => `
    <article class="card reveal" style="--d:${(i % 3) * 0.07}s">
      <div class="card__media">
        <img src="assets/stage/stage${(i % 4) + 1}.webp" alt="ПРО.АРТ в городе ${esc(e.city)}" loading="lazy">
        <span class="card__date">${fmtFull(e.date)} · 19:00</span>
      </div>
      <div class="card__body">
        <h3 class="card__city">${esc(e.city)}</h3>
        <p class="card__venue">${esc(e.venue)}</p>
        <p class="card__addr">${esc(e.addr)}</p>
        <a class="btn btn--red" href="${e.url}" target="_blank" rel="noopener">Купить билет</a>
      </div>
    </article>`).join('');
  observeReveal();
}
function fillCities() {
  const cities = [...new Set(SCHEDULE.map(e => e.city))].sort((a, b) => a.localeCompare(b, 'ru'));
  $('#cityFilter').insertAdjacentHTML('beforeend', cities.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));
}

/* ---------- Хук: ближайший концерт + обратный отсчёт ---------- */
function nextConcert(city='') {
  const now = new Date();
  const fut = SCHEDULE
    .map(e => ({ ...e, t: new Date(e.date + 'T19:00:00') }))
    .filter(e => e.t > now && (!city || e.city === city))
    .sort((a, b) => a.t - b.t);
  if (fut.length) return fut[0];
  // если по городу будущих нет — берём ближайшее вообще
  return SCHEDULE.map(e => ({ ...e, t: new Date(e.date + 'T19:00:00') })).sort((a, b) => a.t - b.t)[0];
}
let cdTarget = null;
function setCountdownCity(city='') {
  cdTarget = nextConcert(city);
  $('#cd-city').textContent = cdTarget.city + ', ' + fmtDate(cdTarget.date);
  $('#cd-buy').href = cdTarget.url;
  $('#cd-buy').target = '_blank'; $('#cd-buy').rel = 'noopener';
  $('#sticky-sub').textContent = `${cdTarget.city} — ${fmtDate(cdTarget.date)}`;
  tickCountdown();
}
function tickCountdown() {
  if (!cdTarget) return;
  let diff = Math.max(0, cdTarget.t - new Date());
  const d = Math.floor(diff / 864e5); diff -= d * 864e5;
  const h = Math.floor(diff / 36e5); diff -= h * 36e5;
  const m = Math.floor(diff / 6e4); diff -= m * 6e4;
  const s = Math.floor(diff / 1e3);
  const p = n => String(n).padStart(2, '0');
  $('#cd-d').textContent = p(d); $('#cd-h').textContent = p(h);
  $('#cd-m').textContent = p(m); $('#cd-s').textContent = p(s);
}

/* ---------- Галерея ---------- */
function renderGallery() {
  $('#gallery-grid').innerHTML = PAINTINGS.map(p => `
    <figure class="paint">
      <img src="${p.img}" alt="${esc(p.title)} — ${esc(p.author)}" loading="lazy">
      <figcaption class="paint__cap"><b>«${esc(p.title)}»</b><span>${esc(p.author)}</span></figcaption>
    </figure>`).join('');
  $$('.paint').forEach(el => revealObs.observe(el));
}

/* ---------- Преимущества ---------- */
function renderFeatures() {
  $('#features').innerHTML = FEATURES.map((f, i) =>
    `<div class="feat reveal" style="--d:${(i % 3) * 0.08}s"><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></div>`).join('');
  observeReveal();
}

/* ---------- Видео-отзывы ---------- */
function renderReviews() {
  $('#reviews-grid').innerHTML = [1, 2, 3, 4].map(i =>
    `<div class="rev reveal" style="--d:${(i - 1) * 0.06}s"><video src="assets/video/rev${i}.mp4" controls preload="none" playsinline poster="assets/rev${i}.webp"></video></div>`).join('');
  observeReveal();
}

/* ---------- Программа ---------- */
function renderProgram() {
  $('#program-grid').innerHTML = PROGRAM.map(part => `
    <div class="ppart reveal">
      <h3>${esc(part.part)}</h3>
      ${part.items.map(it => `
        <div class="pera">
          <div class="pera__name">${esc(it.era)}</div>
          <ul class="pera__songs">${it.songs.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>`).join('');
  observeReveal();
}

/* ---------- FAQ ---------- */
function renderFAQ() {
  $('#faq-list').innerHTML = FAQ.map(f => `
    <div class="faq__item reveal">
      <button class="faq__q">${esc(f.q)}</button>
      <div class="faq__a"><p>${esc(f.a)}</p></div>
    </div>`).join('');
  observeReveal();
  $('#faq-list').addEventListener('click', e => {
    const q = e.target.closest('.faq__q'); if (!q) return;
    const item = q.parentElement, a = $('.faq__a', item);
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
  });
}

/* ---------- Бегущая строка (устойчивая) ---------- */
function buildMarquee() {
  const words = ['живопись', 'музыка', 'литература', 'кино', 'танец', 'оркестр', 'свечи'];
  let half = '';
  for (let i = 0; i < 4; i++) half += words.map(w => `<span>${w}</span>`).join('');
  $('#marquee').innerHTML = half + half; // две идентичные половины → анимация -50% бесшовна
}

/* ---------- Счётчики (соцдоказательства) ---------- */
function animateCounters() {
  $$('#trust b').forEach(el => {
    const target = +el.dataset.count, suf = el.dataset.suffix || '';
    const dur = 1400, t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ---------- Reveal на скролле ---------- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
function observeReveal() { $$('.reveal:not(.in)').forEach(el => revealObs.observe(el)); }

/* ---------- Промокоды + тост ---------- */
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}
function initPromo() {
  $$('.code').forEach(b => b.addEventListener('click', () => {
    const code = b.dataset.code;
    navigator.clipboard?.writeText(code).then(() => toast(`Промокод ${code} скопирован`)).catch(() => toast(`Промокод: ${code}`));
  }));
}

/* ---------- Header / бургер / sticky / parallax ---------- */
function initChrome() {
  const hdr = $('#hdr'), nav = $('#nav'), burger = $('#burger'), sticky = $('#sticky'), heroBg = $('.hero__bg');
  const hero = $('#top');
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 40);
    sticky.classList.toggle('show', y > window.innerHeight * 0.85);
    if (heroBg && y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.18}px)`;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('#nav a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

  // Counters запускаем при появлении блока
  const trust = $('#trust');
  const co = new IntersectionObserver((e) => { if (e[0].isIntersecting) { animateCounters(); co.disconnect(); } }, { threshold: 0.5 });
  co.observe(trust);
}

/* ---------- Init ---------- */
fillCities();
renderSchedule();
renderGallery();
renderFeatures();
renderReviews();
renderProgram();
renderFAQ();
buildMarquee();
initPromo();
initChrome();
observeReveal();
setCountdownCity('');
setInterval(tickCountdown, 1000);
$('#cityFilter').addEventListener('change', e => { renderSchedule(e.target.value); setCountdownCity(e.target.value); });
