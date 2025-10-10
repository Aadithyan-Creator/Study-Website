// -------------------- CAROUSEL --------------------

// Select carousel elements
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.right');
const prevButton = document.querySelector('.carousel-btn.left');
const indicatorsContainer = document.querySelector('.carousel-indicators');

// Get slide width dynamically
function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

// Calculate how many slides fit in viewport
function getVisibleSlides() {
  return Math.floor(track.parentElement.offsetWidth / getSlideWidth());
}

// Create indicator dots based on scrollable positions
function createIndicators() {
  indicatorsContainer.innerHTML = ''; // clear existing dots

  const visibleSlides = getVisibleSlides();
  const numberOfDots = slides.length - visibleSlides + 1;

  for (let i = 0; i < numberOfDots; i++) {
    const button = document.createElement('button');
    if (i === 0) button.classList.add('active');
    indicatorsContainer.appendChild(button);
  }

  return Array.from(indicatorsContainer.children);
}

let indicators = createIndicators();
let currentIndex = 0;

// Update carousel slide and active dot
function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
  indicators.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// -------------------- NAVIGATION BUTTONS --------------------
nextButton.addEventListener('click', () => {
  const visibleSlides = getVisibleSlides();
  const maxIndex = slides.length - visibleSlides;
  currentIndex = Math.min(currentIndex + 1, maxIndex);
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateCarousel();
});

// -------------------- INDICATOR DOTS --------------------
function attachIndicatorEvents() {
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });
}
attachIndicatorEvents();

// -------------------- AUTOPLAY --------------------
setInterval(() => {
  const visibleSlides = getVisibleSlides();
  const maxIndex = slides.length - visibleSlides;
  currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
  updateCarousel();
}, 5000);

// -------------------- HANDLE RESIZE --------------------
window.addEventListener('resize', () => {
  // Recalculate indicators on resize
  indicators = createIndicators();
  attachIndicatorEvents();
  updateCarousel();
});



// -------------------- PRODUCT GRID SCROLL --------------------

// Select product grid and buttons
const productGrid = document.querySelector('.product-grid');
const scrollLeftBtn = document.querySelector('.scroll-btn.left');
const scrollRightBtn = document.querySelector('.scroll-btn.right');

// Function to show/hide scroll buttons dynamically
function updateButtons() {
  scrollLeftBtn.style.display = productGrid.scrollLeft > 0 ? 'block' : 'none';
  scrollRightBtn.style.display = (productGrid.scrollLeft + productGrid.clientWidth < productGrid.scrollWidth) ? 'block' : 'none';
}

// Scroll left button click
scrollLeftBtn.addEventListener('click', () => {
  productGrid.scrollBy({ left: -800, behavior: 'smooth' });
  setTimeout(updateButtons, 800);  // update after scroll animation
});

// Scroll right button click
scrollRightBtn.addEventListener('click', () => {
  productGrid.scrollBy({ left: 800, behavior: 'smooth' });
  setTimeout(updateButtons, 800);
});

// Update buttons on manual scroll and window resize
productGrid.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);

// Initial check
updateButtons();
