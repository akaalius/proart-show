'use strict';
const $ = (s, c=document) => c.querySelector(s);
const fmtDate = iso => { const d = new Date(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---- Schedule + city filter ----
function renderSchedule(city='') {
  const list = city ? SCHEDULE.filter(e => e.city === city) : SCHEDULE;
  $('#sched').innerHTML = list.map(e => `
    <article class="card">
      <span class="card__date">${fmtDate(e.date)} · 19:00</span>
      <h3 class="card__city">${esc(e.city)}</h3>
      <p class="card__venue">${esc(e.venue)}</p>
      <p class="card__addr">${esc(e.addr)}</p>
      <a class="btn btn--gold" href="${e.url}" target="_blank" rel="noopener">Купить билет</a>
    </article>`).join('');
}
function fillCities() {
  const cities = [...new Set(SCHEDULE.map(e => e.city))].sort((a,b)=>a.localeCompare(b,'ru'));
  $('#cityFilter').insertAdjacentHTML('beforeend', cities.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join(''));
}

// ---- Gallery ----
function renderGallery() {
  $('#gallery-grid').innerHTML = PAINTINGS.map(p => `
    <figure class="paint">
      <img src="${p.img}" alt="${esc(p.title)} — ${esc(p.author)}" loading="lazy">
      <figcaption class="paint__cap"><b>«${esc(p.title)}»</b><span>${esc(p.author)}</span></figcaption>
    </figure>`).join('');
}

// ---- Features ----
function renderFeatures() {
  $('#features').innerHTML = FEATURES.map(f => `<div class="feat"><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p></div>`).join('');
}

// ---- Video reviews (lazy) ----
function renderReviews() {
  const n = [1,2,3,4];
  $('#reviews').innerHTML = n.map(i => `
    <div class="rev"><video src="assets/video/rev${i}.mp4" controls preload="none" playsinline poster="assets/rev${i<=3?i:1}.jpg"></video></div>`).join('');
}

// ---- Program ----
function renderProgram() {
  $('#program').innerHTML = PROGRAM.map(part => `
    <div class="ppart">
      <h3>${esc(part.part)}</h3>
      ${part.items.map(it => `
        <div class="pera">
          <div class="pera__name">${esc(it.era)}</div>
          <ul class="pera__songs">${it.songs.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>`).join('');
}

// ---- FAQ ----
function renderFAQ() {
  $('#faq').innerHTML = FAQ.map(f => `
    <div class="faq__item">
      <button class="faq__q">${esc(f.q)}</button>
      <div class="faq__a"><p>${esc(f.a)}</p></div>
    </div>`).join('');
  $('#faq').addEventListener('click', e => {
    const q = e.target.closest('.faq__q'); if (!q) return;
    const item = q.parentElement, a = $('.faq__a', item);
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
  });
}

// ---- Toast + promo codes ----
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200);
}
function initPromo() {
  document.querySelectorAll('.code').forEach(b => b.addEventListener('click', () => {
    const code = b.dataset.code;
    navigator.clipboard?.writeText(code).then(() => toast(`Промокод ${code} скопирован`)).catch(() => toast(`Промокод: ${code}`));
  }));
}

// ---- Header scroll + burger ----
function initHeader() {
  const hdr = $('#hdr');
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive:true });
  $('#burger').addEventListener('click', () => $('.hdr__nav').classList.toggle('open'));
  document.querySelectorAll('.hdr__nav a').forEach(a => a.addEventListener('click', () => $('.hdr__nav').classList.remove('open')));
}

// ---- Init ----
fillCities();
renderSchedule();
renderGallery();
renderFeatures();
renderReviews();
renderProgram();
renderFAQ();
initPromo();
initHeader();
$('#cityFilter').addEventListener('change', e => renderSchedule(e.target.value));
