const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');
const htmlEl = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('fentez-theme', theme);
  
  if (theme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

const savedTheme = localStorage.getItem('fentez-theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

const card = document.getElementById('tilt-card');
const maxTilt = 4;

document.addEventListener('mousemove', (e) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  const tiltX = ((windowHeight / 2 - mouseY) / (windowHeight / 2)) * maxTilt;
  const tiltY = ((mouseX - windowWidth / 2) / (windowWidth / 2)) * maxTilt;
  
  card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
});

document.addEventListener('mouseleave', () => {
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
}
resizeCanvas();

const particles = [];
const particleCount = 60;

class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > window.innerWidth) this.x = 0;
    if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    if (this.y < 0) this.y = window.innerHeight;
  }
  draw(themeColor) {
    ctx.fillStyle = themeColor;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  let themeColor = htmlEl.getAttribute('data-theme') === 'light' 
    ? 'rgba(109, 40, 217, 1)' 
    : 'rgba(167, 139, 250, 1)';

  particles.forEach(p => {
    p.update();
    p.draw(themeColor);
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
});

const baseTitle = "FENTEZ ";
const animSeq = ["◀", "◀", "◀", "◀", "◀", "%", "!", "|", "/", "-", "\\"];
let animIndex = 0;

setInterval(() => {
  document.title = baseTitle + animSeq[animIndex];
  animIndex = (animIndex + 1) % animSeq.length;
}, 300);
