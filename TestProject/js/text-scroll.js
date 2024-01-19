//Вертикальный скролл
const VerticalScroll = (scrollableContent, scrollableInnerContent, scrollBar) =>{
  let isDraggingV = false;
  

  let isDragging = false;
  let startOffset = 0;
  let startPageY = 0;
  let lastScrollY = 0;
  let ticking = false;
  let scrollMultiplier = 0.10; // Множитель скорости прокрутки
  const computedStyle = window.getComputedStyle(scrollableContent);
  const height = parseInt(computedStyle.height);
  scrollBar.style.height = `${height}px`
  scrollBar.value = 0;

  scrollBarV.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    const delta = -e.deltaY;

    lastScrollY = scrollableInnerContent.offsetTop + delta * scrollMultiplier;
    
    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + height, lastScrollY)) + 'px';
        updateScrollBarV();
        ticking = false;
      });

      ticking = true;
    }
});
    scrollBarV.addEventListener('mousedown', function (e) {
      isDraggingV = true;
      startPageY = e.pageY - scrollBarV.offsetTop;
      startOffset = scrollableInnerContent.offsetTop;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (isDraggingV) {
          const deltaY = e.pageY - startPageY;
          const newScrollTop = startOffset - deltaY*1.7;
          if (!ticking) {
            window.requestAnimationFrame(function() {
              scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + height, newScrollTop)) + 'px';
              updateScrollBarV();
              ticking = false;
            });
      
            ticking = true;
          }
          e.preventDefault();
      }
    });

    document.addEventListener('mouseup', function () {
      isDraggingV = false;
    });

    function updateScrollBarV() {
      const maxScroll = scrollableInnerContent.clientHeight - height + 50;
      const scrollPercentage = Math.abs((((scrollableInnerContent.offsetTop)/ maxScroll)) * 100);
      const thumbPosition = Math.min(100, Math.max(0, scrollPercentage));
      scrollBarV.querySelector('.scroll-bar-thumb').style.top = `${thumbPosition}%`;
    }



  // Обработчики событий для касаний на мобильных устройствах
  let lastTouchY = 0;

  scrollableInnerContent.addEventListener('touchstart', function(e) {
    e.preventDefault();
    lastTouchY = e.changedTouches[0].clientY;
  });

  scrollableInnerContent.addEventListener('touchmove', function(e) {
    e.preventDefault();
    let delta = lastTouchY - e.changedTouches[0].clientY;
    lastTouchY = e.changedTouches[0].clientY;

    scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + 200, scrollableInnerContent.offsetTop - delta)) + 'px';
    updateScrollBarV();
  });
  // Ниже 3 обработчика перетаскивания
  scrollableInnerContent.addEventListener('mousedown', function(e) {
    isDragging = true;
    startPageY = e.pageY;
    startOffset = scrollableInnerContent.offsetTop;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if(isDragging) {
      const delta = e.pageY - startPageY;
      // Устанавливаем верхнее положение контента с учетом пределов прокрутки
      scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + height, startOffset + delta)) + 'px';
      updateScrollBarV();
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  // Обработчик события прокрутки колесика мыши
  scrollableInnerContent.addEventListener('wheel', function(e) {
      e.preventDefault();
      
      const delta = -e.deltaY;

      lastScrollY = scrollableInnerContent.offsetTop + delta * scrollMultiplier;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + height, lastScrollY)) + 'px';
          updateScrollBarV();
          ticking = false;
        });
  
        ticking = true;
      }
  });


}


//Горизонтальный скролл
const HorizontalScroll = (scrollableContent, scrollableInnerContent, scrollBar) =>{
  let isDragging = false;
  let startOffset = 0;
  let startPageX = 0; 
  let lastScrollX = 0; 
  let ticking = false;
  let scrollMultiplier = 0.10; // Множитель скорости прокрутки
  const computedStyle = window.getComputedStyle(scrollableContent);
  const width = parseInt(computedStyle.width); 
  scrollBar.style.width = `${width - 2}px`; 
  scrollBar.value = 0;

  // Обработчики событий для касаний на мобильных устройствах
  let lastTouchX = 0;

  scrollableInnerContent.addEventListener('touchstart', function(e) {
    e.preventDefault();
    lastTouchX = e.changedTouches[0].clientX;
  });

  scrollableInnerContent.addEventListener('touchmove', function(e) {
    e.preventDefault();
    let delta = lastTouchX - e.changedTouches[0].clientX;
    lastTouchX = e.changedTouches[0].clientX;

    scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, scrollableInnerContent.offsetLeft - delta)) + 'px';
    updateScrollBarV();
  });

  // Ниже 3 обработчика перетаскивания
  scrollableInnerContent.addEventListener('mousedown', function (e) {
      isDragging = true;
      startPageX = e.pageX; 
      startOffset = scrollableInnerContent.offsetLeft; 
      e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
      if (isDragging) {
          const delta = e.pageX - startPageX; 
          scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, startOffset + delta)) + 'px'; 
          updateScrollBarV();
          e.preventDefault();
      }
  });

  document.addEventListener('mouseup', function () {
      isDragging = false;
  });
  // Обработчик события прокрутки колесика мыши
  scrollableInnerContent.addEventListener('wheel', function (e) {
      e.preventDefault();

      const delta = -e.deltaX; 
      lastScrollX = scrollableInnerContent.offsetLeft + delta * scrollMultiplier;

      if (!ticking) {
          window.requestAnimationFrame(function () {
              scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, lastScrollX)) + 'px'; 
              updateScrollBarV();
              ticking = false;
          });

          ticking = true;
      }
  });
  // Функция обновления скроллбара
  function updateScrollBarV() {
      const maxScroll = scrollableInnerContent.clientWidth - scrollableContent.clientWidth; 
      const scrollPercentage = (scrollableInnerContent.offsetLeft / maxScroll) * 100; 
      scrollBar.value = Math.abs(scrollPercentage);
  }
  // Обработчик события изменения ползунка
  scrollBar.addEventListener('input', function () {
      const maxScroll = scrollableInnerContent.clientWidth - scrollableContent.clientWidth; 
      const scrollPosition = (scrollBar.value / 100) * maxScroll;
      scrollableInnerContent.style.left = -scrollPosition + 'px';
  });

}
