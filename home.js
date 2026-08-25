const COMPLIMENTS = [
  "you make ordinary days feel like small festivals.",
  "the world is genuinely softer with you in it.",
  "your laugh should be studied by scientists.",
  "you are someone's favourite notification.",
  "rooms get brighter about two seconds after you walk in.",
  "you have never once been 'too much'. you are exactly enough.",
  "somewhere, a playlist sounds better because of you.",
  "your kindness has probably changed someone's whole week.",
  "you're the plot twist every story needed.",
  "even your sleepy selfies are elite.",
  "people feel safe around you. that's a superpower.",
  "you make inside jokes feel like currency.",
  "the group chat is simply funnier because of you.",
  "you're the human version of golden hour.",
  "your taste? immaculate. always has been.",
  "you give main character energy without even trying.",
  "somehow you always know the right thing to say.",
  "you're the reason someone believes in good people.",
  "future you is already so proud of present you.",
  "you turn regular Tuesdays into stories worth retelling.",
  "your presence is basically a comfort blanket.",
  "the stars literally coordinated for your arrival.",
  "you're proof that softness and strength coexist.",
  "never forget: you are so, so loved."
];

const themeToggle = document.getElementById('themeToggle');
let dark = localStorage.getItem('gd-theme') === 'dark';
applyTheme();

function applyTheme() {
  document.body.classList.toggle('dark', dark);
  themeToggle.innerHTML = dark ? sunSVG() : moonSVG();
}
function sunSVG() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
}
function moonSVG() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}
themeToggle.addEventListener('click', () => {
  dark = !dark;
  localStorage.setItem('gd-theme', dark ? 'dark' : 'light');
  applyTheme();
});

const chip = document.getElementById('complimentChip');
const cText = document.getElementById('complimentText');
function newCompliment() {
  let next = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
  while (next === cText.textContent) next = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
  cText.textContent = next;
}
chip.addEventListener('click', newCompliment);
newCompliment();

const VIBES = {
  feminism: {
    lines: [
      "The future is female — and it runs on chai.",
      "Well-behaved women rarely make history.",
      "Smash the patriarchy. Then take a nap.",
      "You're the kind of woman they write warnings about."
    ],
    files: ["media/feminism/1.mp4", "media/feminism/2.mp4", "media/feminism/3.mp4", "media/feminism/4.mp4", "media/feminism/5.mp4"]
  },
  aesthetic: {
    lines: [
      "Good food = good mood. Scientific fact.",
      "Warning: may cause sudden cravings.",
      "Calories don't count when it looks this good.",
      "Eat well, laugh often."
    ],
    files: ["media/aesthetic/1.jpg", "media/aesthetic/2.jpg", "media/aesthetic/3.jpg", "media/aesthetic/4.jpg", "media/aesthetic/5.jpg", "media/aesthetic/6.jpg", "media/aesthetic/7.jpg", "media/aesthetic/8.jpg", "media/aesthetic/9.mp4", "media/aesthetic/10.mp4", "media/aesthetic/11.jpg", "media/aesthetic/12.jpg", "media/aesthetic/13.jpg", "media/aesthetic/14.jpg", "media/aesthetic/15.jpg", "media/aesthetic/16.jpg", "media/aesthetic/17.jpg", "media/aesthetic/18.jpg", "media/aesthetic/19.jpg", "media/aesthetic/20.jpg", "media/aesthetic/21.jpg", "media/aesthetic/22.mp4"]
  },
  love: {
    lines: [
      "You are so, so loved. Evidence below.",
      "Consider this a hug in video form.",
      "Some things are just proof that love exists.",
      "All of it. Right here."
    ],
    files: ["media/love/1.mp4", "media/love/2.mp4", "media/love/3.mp4", "media/love/4.mp4", "media/love/5.mp4", "media/love/6.mp4", "media/love/7.mp4", "media/love/8.mp4"]
  }
};

const vibeBtns = document.querySelectorAll('.vibe-btn');
const vibeStage = document.getElementById('vibeStage');
const vibeMedia = document.getElementById('vibeMedia');
const vibeMsg = document.getElementById('vibeMsg');
const vibeMore = document.getElementById('vibeMore');
let lastFile = null;

function renderVibeMedia(file) {
  vibeMedia.innerHTML = '';
  if (file.endsWith('.mp4')) {
    const v = document.createElement('video');
    v.src = file;
    v.autoplay = true;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.controls = true;
    vibeMedia.appendChild(v);
  } else {
    const img = document.createElement('img');
    img.src = file;
    img.alt = '';
    vibeMedia.appendChild(img);
  }
}

vibeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const vibe = VIBES[btn.dataset.vibe];
    if (!vibe) return;
    vibeBtns.forEach(b => b.classList.toggle('active', b === btn));
    let pool = vibe.files.filter(f => f !== lastFile);
    if (!pool.length) pool = vibe.files;
    const file = pool[Math.floor(Math.random() * pool.length)];
    lastFile = file;
    vibeMsg.textContent = vibe.lines[Math.floor(Math.random() * vibe.lines.length)];
    renderVibeMedia(file);
    vibeStage.hidden = false;
    vibeMore.textContent = 'tap the same tab again for another one';
  });
});

setTimeout(() => {
  document.getElementById('preloader').style.display = 'none';
  document.getElementById('app').hidden = false;
}, 800);
