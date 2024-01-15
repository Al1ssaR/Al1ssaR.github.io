
let slideIndex;

const slides = document.getElementsByClassName('slide-item');
const images = document.getElementsByClassName('image');
function openModal() {
    document.getElementById('Modal').style.display = 'flex';
 
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
}

function closeModal() {
    document.getElementById('Modal').style.display = 'none';
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "unset";
}
  
function changeSlides(n) {
    showSlides(slideIndex += n);
}
  
function currentSlide(clickedElement) {
    const index = Array.from(images).indexOf(clickedElement);
    console.log(Array.from(images).indexOf(clickedElement))
    showSlides(slideIndex = index);
}

function showSlides(n) {
    if (n > slides.length - 1) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex].style.display = 'block';
}