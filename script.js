document.getElementById('year').textContent = new Date().getFullYear();

const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

const themeBtn = document.getElementById('themeToggle');
let pageDark = localStorage.getItem('gd-theme') === 'dark';

function applyPageTheme() {
  document.body.classList.toggle('dark', pageDark);
  if (themeBtn) themeBtn.innerHTML = pageDark ? SUN : MOON;
}
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    pageDark = !pageDark;
    localStorage.setItem('gd-theme', pageDark ? 'dark' : 'light');
    applyPageTheme();
  });
}
applyPageTheme();

const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 400));
setTimeout(() => loader.classList.add('done'), 2500);

const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');

function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  document.body.classList.toggle('locked', open);
}
burger.addEventListener('click', () => toggleMenu());
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

const body = document.body;
const mediaKey = body.dataset.media || null;

function pad(n) { return String(n).padStart(2, '0'); }

if (mediaKey && document.getElementById('photoGrid')) {
  const count = parseInt(body.dataset.photos || '0', 10);
  const grid = document.getElementById('photoGrid');
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      const fig = document.createElement('figure');
      fig.className = 'item reveal';
      fig.dataset.num = pad(i);
      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.src = 'media/' + mediaKey + '/' + i + '.jpg';
      img.addEventListener('error', () => img.classList.add('missing'));
      fig.appendChild(img);
      grid.appendChild(fig);
    }
  }
}

const filmsSection = document.getElementById('filmsSection');
const videoStack = document.getElementById('videoStack');
if (mediaKey && videoStack) {
  const vCount = parseInt(body.dataset.videos || '0', 10);
  let added = 0;
  for (let i = 1; i <= vCount; i++) {
    const fig = document.createElement('figure');
    fig.className = 'film';
    const vid = document.createElement('video');
    vid.controls = true;
    vid.playsInline = true;
    vid.preload = 'metadata';
    vid.src = 'media/' + mediaKey + '/v' + i + '.mp4';
    vid.addEventListener('error', () => fig.remove());
    const cap = document.createElement('figcaption');
    cap.textContent = 'Film ' + pad(i);
    fig.appendChild(vid);
    fig.appendChild(cap);
    videoStack.appendChild(fig);
    added++;
  }
  if (added === 0 && filmsSection) filmsSection.hidden = true;
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');

function initLightbox() {
  const lbImg = document.getElementById('lbImg');
  let current = 0;
  let galleryImgs = [];

  function refreshGallery() {
    galleryImgs = Array.from(document.querySelectorAll('.item img, .wide img')).filter(
      img => !img.classList.contains('missing')
    );
  }
  refreshGallery();

  function openLightbox(index) {
    refreshGallery();
    if (!galleryImgs.length) return;
    current = (index + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[current].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.item, .wide').forEach(fig => {
    fig.addEventListener('click', () => {
      const idx = galleryImgs.indexOf(fig.querySelector('img'));
      if (idx !== -1) openLightbox(idx);
    });
  });

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', e => {
    e.stopPropagation();
    openLightbox(current - 1);
  });
  document.getElementById('lbNext').addEventListener('click', e => {
    e.stopPropagation();
    openLightbox(current + 1);
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (menu.classList.contains('open') && e.key === 'Escape') toggleMenu(false);
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(current - 1);
    if (e.key === 'ArrowRight') openLightbox(current + 1);
  });
}

if (lightbox) initLightbox();
