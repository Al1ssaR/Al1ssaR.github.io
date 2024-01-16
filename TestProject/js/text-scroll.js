

//Вертикальный скролл
const VerticalScroll = (scrollableContent, scrollableInnerContent, scrollBar) =>{
  let isDragging = false;
  let startOffset = 0;
  let startPageY = 0;
  let lastScrollY = 0;
  let ticking = false;
  let scrollMultiplier = 0.10; // Множитель скорости прокрутки
  const computedStyle = window.getComputedStyle(scrollableContent);
  const height = parseInt(computedStyle.height);
  scrollBar.style.height = `${height-2}px`
  scrollBar.value = 0;
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
      updateScrollBar();
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
          updateScrollBar();
          ticking = false;
        });
  
        ticking = true;
      }
  });
  // Функция обновления скроллбара
  function updateScrollBar() {

      const maxScroll = scrollableInnerContent.clientHeight - scrollableContent.clientHeight;
      const scrollPercentage = (scrollableInnerContent.offsetTop / maxScroll) * 100;
      scrollBar.value = Math.abs(scrollPercentage);
      
  }

  // Обработчик события изменения ползунка
  scrollBar.addEventListener('input', function () {
      const maxScroll = scrollableInnerContent.clientHeight - scrollableContent.clientHeight;
      const scrollPosition = (scrollBar.value / 100) * maxScroll;
      scrollableInnerContent.style.top = -scrollPosition + 'px';
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
          updateScrollBar();
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
              updateScrollBar();
              ticking = false;
          });

          ticking = true;
      }
  });
  // Функция обновления скроллбара
  function updateScrollBar() {
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
