// Плавный скролл ко второй секции

function smoothScroll(){
const seacrh = document.querySelector('.brand-discover')
const arrow = document.querySelector('.arrow-down')

    seacrh.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID =  seacrh.getAttribute('href').substr(1)
        
        document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        })
    })

    arrow.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID =  arrow.getAttribute('href').substr(1)
        
        document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        })
    })

}
smoothScroll();

// Включить видео без элементов контроля
var videos = document.getElementsByTagName('video');

for (var i = 0; i < videos.length; i++) {
  videos[i].addEventListener('click', function() {
    if (this.paused) {
        this.play(); // Если видео остановлено, запускаем его
      } else {
        this.pause(); // Если видео играет, останавливаем его
      }
  });
}

// Слайдер с видео
function Slider(){
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btns__prev');
    const nextBtn = document.querySelector('.slider-btns__next');
    const progressBar = document.querySelectorAll('.slider-progress__item');
    const counter = document.querySelector('.progress-now');

    let currentIndex = 0;

    function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
        slide.classList.add('active');
        } else {
        slide.classList.remove('active');
        }
    });
    counter.textContent = `${currentIndex + 1}`;
    for (let i = 0; i<progressBar.length;i++){
        if(i<=currentIndex){
            progressBar[i].classList.add("active");
        }
        if (i>currentIndex){
            progressBar[i].classList.remove("active")
        }
    }
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });
    
    updateSlider();
}
Slider();