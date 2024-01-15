const scrollableContent = document.querySelector('.description-text-wrap');
const scrollableInnerContent = document.querySelector('.description-text');
const scrollBar = document.getElementById('scrollBar');
let wheelEndTimer = null;
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
scrollableInnerContent.addEventListener('mousedown', function(e) {
  isDragging = true;
  startPageY = e.pageY;
  startOffset = scrollableInnerContent.offsetTop;
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if(isDragging) {
    const delta = e.pageY - startPageY;
    scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + 200, startOffset + delta)) + 'px';
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
        scrollableInnerContent.style.top = Math.min(0, Math.max(-scrollableInnerContent.clientHeight + 200, lastScrollY)) + 'px';
        updateScrollBar();
        ticking = false;
      });
 
      ticking = true;
    }
});
function updateScrollBar() {

    const maxScroll = scrollableInnerContent.clientHeight - scrollableContent.clientHeight;
    const scrollPercentage = (scrollableInnerContent.offsetTop / maxScroll) * 100;
    scrollBar.value = Math.abs(scrollPercentage);
    console.log(scrollBar.value)
}

// Обработчик события изменения ползунка
scrollBar.addEventListener('input', function () {
    const maxScroll = scrollableInnerContent.clientHeight - scrollableContent.clientHeight;
    const scrollPosition = (scrollBar.value / 100) * maxScroll;
    scrollableInnerContent.style.top = -scrollPosition + 'px';
});
