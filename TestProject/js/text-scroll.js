//Вертикальный скролл
const VerticalScroll = (scrollableContent, scrollableInnerContent, scrollBar) =>{
  const scrollBarThumb = scrollBar.querySelector('.scroll-bar-thumb');
  let isDraggingV = false;
  let isDragging = false;
  let startOffset = 0;
  let startPageY = 0;
  let lastScrollY = 0;
  let ticking = false;
  let scrollMultiplier = 0.40; // Множитель скорости прокрутки
  let computedStyle = window.getComputedStyle(scrollableContent);
  let height = parseInt(computedStyle.height);
  scrollBar.style.height = `${height}px`
  //скорость скролла курсором
  let scrollDragMult ;
  updateScrollBarV()
  // Создаем новый экземпляр Resize Observer
  const resizeObserver = new ResizeObserver(() => {
    // Обработчик изменений размера внутреннего контейнера
    updateScrollBarV();
  });
  // Передаем целевой элемент для отслеживания изменений размера
  resizeObserver.observe(scrollableInnerContent);

  scrollBar.addEventListener('wheel', function(e) {
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
    scrollBar.addEventListener('mousedown', function (e) {
      isDraggingV = true;
      startPageY = e.pageY - scrollBar.offsetTop;
      startOffset = scrollableInnerContent.offsetTop;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (isDraggingV) {
          const deltaY = e.pageY - startPageY;
          const newScrollTop = startOffset - deltaY*scrollDragMult;
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

      const contentHeight = scrollableInnerContent.clientHeight;
      const containerHeight = scrollableContent.clientHeight;
      if (contentHeight > containerHeight) {
      scrollBar.style.height = `${height}px`;
      const ratio = containerHeight / contentHeight;
      const scrollBarHeight = containerHeight * ratio;
      scrollBarThumb.style.height = `${scrollBarHeight}px`
      const maxScroll = scrollableInnerContent.clientHeight - height ;
      scrollDragMult = 1 * (height/scrollBarHeight);
      const scrollPercentage = Math.abs((((scrollableInnerContent.offsetTop)/ maxScroll)) * 100);
      const thumbPosition = Math.min(100, Math.max(0, scrollPercentage));
      scrollBarThumb.style.top = `${1.02*(1-scrollBarHeight/height)*thumbPosition}%`;
      } else {
        scrollBar.style.height = '0';
        scrollBarThumb.style.height = '0';
      }
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


// Горизонтальный скролл
const HorizontalScroll = (scrollableContent, scrollableInnerContent, scrollBar) => {
  const scrollBarThumb = scrollBar.querySelector('.scroll-bar-thumb');
  let isDraggingH = false;
  let isDragging = false;
  let startOffset = 0;
  let startPageX = 0;
  let lastScrollX = 0;
  let ticking = false;

  const computedStyle = window.getComputedStyle(scrollableContent);
  const width = parseInt(computedStyle.width);
  scrollBar.style.width = `${width}px`;
  //скорость скролла курсором
  let scrollDragMult ;
  updateScrollBarH()

    // Создаем новый экземпляр Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      // Обработчик изменений размера внутреннего контейнера
      updateScrollBarH();
    });

    // Передаем целевой элемент для отслеживания изменений размера
    resizeObserver.observe(scrollableInnerContent);

  
  scrollBar.addEventListener('wheel', function(e) {
    e.preventDefault();
    const delta = -e.deltaY;

    lastScrollX = scrollableInnerContent.offsetLeft + delta ;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, lastScrollX)) + 'px';
        updateScrollBarH();
        ticking = false;
      });

      ticking = true;
    }
  });

  scrollBar.addEventListener('mousedown', function(e) {
    isDraggingH = true;
    startPageX = e.pageX - scrollBar.offsetLeft;
    startOffset = scrollableInnerContent.offsetLeft;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (isDraggingH) {
      const deltaX = e.pageX - startPageX;
      const newScrollLeft = startOffset - deltaX * scrollDragMult;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, newScrollLeft)) + 'px';
          updateScrollBarH();
          ticking = false;
        });

        ticking = true;
      }
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', function() {
    isDraggingH = false;
  });

  function updateScrollBarH() {
    
    const contentWidth = scrollableInnerContent.clientWidth;
    const containerWidth = scrollableContent.clientWidth;
    if (contentWidth > containerWidth) {
      scrollBar.style.width = `${width}px`;
      const ratio = containerWidth / contentWidth;
      const scrollbarWidth = containerWidth * ratio;
      scrollBarThumb.style.width = `${scrollbarWidth}px`
      const maxScroll = contentWidth - containerWidth;
      scrollDragMult = 1 * (width/scrollbarWidth);
      const scrollPercentage = Math.abs(((scrollableInnerContent.offsetLeft) / maxScroll) * 100);
      
      const thumbPosition = Math.min(100, Math.max(0, scrollPercentage));
      scrollBarThumb.style.left = `${1.02*(1-scrollbarWidth/width)*thumbPosition}%`;
    } else {
      scrollBar.style.width = '0';
      scrollBarThumb.style.width = '0';
    }
  }

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
    updateScrollBarH();
  });

  // Ниже 3 обработчика перетаскивания
  scrollableInnerContent.addEventListener('mousedown', function(e) {
    isDragging = true;
    startPageX = e.pageX;
    startOffset = scrollableInnerContent.scrollLeft;
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const delta = e.pageX - startPageX;
      // Устанавливаем левое положение контента с учетом пределов прокрутки
      scrollableInnerContent.style.left = Math.min(0, Math.max(-scrollableInnerContent.clientWidth + width, startOffset + delta)) + 'px';
      updateScrollBarH();
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });

};

