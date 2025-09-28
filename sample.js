const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.right');
const prevButton = document.querySelector('.carousel-btn.left');
const indicatorsContainer = document.querySelector('.carousel-indicators');

// Create indicators
slides.forEach((_, i) => {
  const button = document.createElement('button');
  if(i===0) button.classList.add('active');
  indicatorsContainer.appendChild(button);
});
const indicators = Array.from(indicatorsContainer.children);

let currentIndex = 0;

function updateCarousel() {
  track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
  indicators.forEach((dot, i) => dot.classList.toggle('active', i===currentIndex));
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Indicator click
indicators.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

// Optional: autoplay every 5s
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 5000);