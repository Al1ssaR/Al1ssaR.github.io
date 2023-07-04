// Мобильное меню
const menu = document.querySelector('.header-menu')
const menuBtn = document.querySelector('.burger-menu')

menuBtn.addEventListener('click',()=>{
    setTimeout(function(){menu.classList.toggle('active');},100);

})