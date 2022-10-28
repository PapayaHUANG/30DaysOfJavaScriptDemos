const slider = document.querySelector('.slider');
const trails = document.querySelector('.trail').querySelectorAll('div');
const svgBtns = document.querySelectorAll('svg');

const swipeGap = 100 / trails.length;
let value = 0;
const maxValue = swipeGap * (trails.length - 1);
const interval = 4000;

let swipe = setInterval(() => slide('increase'), interval);

const initInc = () => {
  trails.forEach((trail) => trail.classList.remove('active'));
  value === maxValue ? (value = 0) : (value += swipeGap);
};

const initDec = () => {
  trails.forEach((trail) => trail.classList.remove('active'));
  value === 0 ? (value = maxValue) : (value -= swipeGap);
};

const move = (v) => {
  slider.style.transform = `translateX(-${v}%)`;
  const trailValue = v / swipeGap;
  trails[trailValue].classList.add('active');
};

const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.inOut' } });
tl.from('.bg', { x: '-100%', opacity: 0 })
  .from('p', { opacity: 0 }, '-=0.3')
  .from('h1', { opacity: 0, y: '30px' }, '-=0.3')
  .from('button', { opacity: 0, y: '-40px' }, '-=0.8');

const animate = () => tl.restart();
const slide = (condition) => {
  clearInterval(swipe);
  condition === 'increase' ? initInc() : initDec();
  move(value);
  animate();
  swipe = setInterval(() => slide('increase'), interval);
};

const trailClick = (e) => {
  clearInterval(swipe);
  trails.forEach((trail) => {
    trail.classList.remove('active');
  });
  const checkedTrail = e.target;

  checkedTrail.classList.add('active');

  const checkedValue = checkedTrail.classList.value;

  const trail = checkedValue.match(/\d+/).toString();

  value = swipe * (trail - 1);

  move(value);
  animate();
  swipe = setInterval(() => slide('increase'), interval);
};

svgBtns.forEach((cur) => {
  cur.addEventListener('click', () => {
    cur.classList.contains('next') ? slide('increase') : slide('decrease');
  });
});

trails.forEach((trail) => {
  trail.addEventListener('click', (e) => trailClick(e));
});
