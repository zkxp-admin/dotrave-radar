const slideWrapper = document.getElementById('slideWrapper');
const navButtons = document.querySelectorAll('.nav-button');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('#slideWrapper > section').length;

function updateSlidePosition() {
  slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateActiveButton();
}

function updateActiveButton() {
  navButtons.forEach((button, index) => {
    if (index === currentSlide) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentSlide = parseInt(button.getAttribute('data-slide'));
    updateSlidePosition();
  });
});

// Initialize the first slide as active
updateSlidePosition();