const track = document.getElementById('carouselTrack');
const itemsPerPage = 4;
let currentPage = 0;

const totalItems = document.querySelectorAll('.product-card').length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function updateCarousel() {
  const slideWidth = track.offsetWidth / itemsPerPage;
  track.style.transform = `translateX(-${currentPage * slideWidth * itemsPerPage}px)`;
  document.getElementById('pagination').textContent = `${currentPage + 1} / ${totalPages}`;
}

function moveSlide(direction) {
  currentPage += direction;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  updateCarousel();
}

window.addEventListener('resize', updateCarousel);
window.addEventListener('DOMContentLoaded', updateCarousel);
