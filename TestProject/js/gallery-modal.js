const alissarGallery = ()=>{
  const modalContainer = document.querySelector('.gallery-container');
  let modal, prevBtn, nextBtn, closeBtn, slides;
  function loadModal(){
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-gallery-content';

      prevBtn = document.createElement('a');
      prevBtn.className = 'prev';
      prevBtn.innerHTML = '<i class="bi bi-arrow-left-square fs-1"></i>';

      nextBtn = document.createElement('a');
      nextBtn.className = 'next';
      nextBtn.innerHTML = '<i class="bi bi-arrow-right-square fs-1"></i>';

      closeBtn = document.createElement('button');
      closeBtn.className = 'gallery-close btn-close btn-close-white close';
      closeBtn.innerHTML = '</button>';

      modal = document.createElement('div');
      modal.id = 'Modal';
      modal.className = 'modal-gallery';
      modal.appendChild(closeBtn);
      modal.appendChild(modalContent);
      modal.appendChild(prevBtn);
      modal.appendChild(nextBtn);

      modalContainer.appendChild(modal);
      prevBtn.addEventListener('click',()=>{
        changeSlides(-1);
      })
      nextBtn.addEventListener('click',()=>{
        changeSlides(1);
      })
      closeBtn.addEventListener('click', ()=>{
        closeModal()
      })
      prevBtn.addEventListener('click', () => {
        changeSlides(-1);
      });
      nextBtn.addEventListener('click', () => {
        changeSlides(1);
      });
      closeBtn.addEventListener('click', () => {
        closeModal();
      });
  }
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    let slideIndex = 0;

    const galleryData = [
      { src: 'img/gallery-image-1.jpeg', description: 'Бирюзовый овсянковый Кардинал' },
      { src: 'img/gallery-image-3.jpg', description: 'Дрозд свиристель Крымский' },
      { src: 'img/gallery-image-2.jpg', description: 'Танагра оранжевая' }
    ];

    imagesArray.forEach((image, index) => {
      image.addEventListener('click', function () {
        loadModal()
        openModal(galleryData, index);
        currentSlide(this);
      });
    });

  

    function openModal(data, startIndex) {
      document.querySelector('#Modal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';

      const modalContent = document.querySelector('.modal-gallery-content');
      // Очищаем содержимое модального окна перед добавлением новых элементов
      modalContent.innerHTML = '';

      // Создаем HTML-код на основе данных из массива объектов и добавляем его в модальное окно
      data.forEach((item, index) => {
        modalContent.innerHTML += `
          <div class="slide-item" style="display: ${index === startIndex ? 'block' : 'none'};">
            <img class="img-fluid d-block mx-auto" src="${item.src}" alt="${item.description}">
            <div class="caption">${item.description}</div>
          </div>
        `;
      });
      slides = document.getElementsByClassName('slide-item');
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
      modalContainer.removeChild(modal)
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
}
alissarGallery()