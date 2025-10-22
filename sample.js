// 1. Get all the elements we need
const carousel = document.getElementById('carousel1');                 // Main carousel container
const track = carousel.querySelector('.carousel-track');               // The div holding all slides
const slides = Array.from(track.children);                             // Convert slides to an array
const nextButton = carousel.querySelector('.carousel-btn.right');      // Next button
const prevButton = carousel.querySelector('.carousel-btn.left');       // Previous button
const dotsContainer = document.querySelector('.carousel-indicators');  // Dots container
const dots = Array.from(dotsContainer.children);                       // Convert dots to an array

// 2. Keep track of which slide is currently active
let index = 0;

// 3. Function to show the current slide
function showSlide() {
  // Loop through all slides
  for (let i = 0; i < slides.length; i++) {
    if (i === index) {
      slides[i].style.display = 'block';  // Show the current slide
    } else {
      slides[i].style.display = 'none';   // Hide all other slides
    }
  }

  // Update the dots to show which slide is active
  updateDots();
}

// 4. Function to automatically move to the next slide
function autoSlide() {
  index = index + 1;                   // Go to next slide

  if (index >= slides.length) {        // If we go past the last slide
    index = 0;                         // Go back to the first slide
  }

  showSlide();                          // Update display
}

// 5. Function to move slides manually
function navigateSlide(direction) {
  index = index + direction;            // Move forward or backward

  // If index goes past the last slide
  if (index >= slides.length) {
    index = 0;
  }

  // If index goes before the first slide
  if (index < 0) {
    index = slides.length - 1;
  }

  showSlide();                          // Update display
}

// 6. Function to update the active dot
function updateDots() {
  for (let i = 0; i < dots.length; i++) {
    if (i === index) {
      dots[i].classList.add('active');   // Make this dot active
    } else {
      dots[i].classList.remove('active');// Remove active from others
    }
  }
}

// 7. Add click listeners to the dots
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    index = i;          // Go to the slide corresponding to the dot
    showSlide();         // Update display
  });
}

// 8. Add click listeners to next and previous buttons
nextButton.addEventListener('click', function() {
  navigateSlide(1);     // Move one slide forward
});

prevButton.addEventListener('click', function() {
  navigateSlide(-1);    // Move one slide backward
});

// 9. Start everything
showSlide();            // Show the first slide initially
setInterval(autoSlide, 3000);  // Move to next slide automatically every 3 seconds
