const 
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dots__item'),
      slidesWrap = document.querySelectorAll('.slider-wrapper');


console.log(slides);
console.log(dots);
let index = 0;

const activeSlide = n => {
    for(slide of slides){
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
}

const activeDot = n => {
    for(dots__item of dots) {
        dots__item.classList.remove('active');
    }
    dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeDot(ind);
}

const nextSlide = () => {
    if(index == slides.length - 1){
        index = 0;
        prepareCurrentSlide(index);
    }else{
        index++;
        prepareCurrentSlide(index);
    }
};
const prevSlide = () => {
    if(index == 0){
        index = slides.length - 1;
        prepareCurrentSlide(index);
    }else{
        index--;
        prepareCurrentSlide(index);
    }
};
dots.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
    })
});
console.log(1);
let interval = setInterval(nextSlide, 4000);

const 
      prev = document.querySelector('.teamslider-wrapper__prev'),
      next = document.querySelector('.teamslider-wrapper__next'),
      teamslides = document.querySelectorAll('.teamslider-wrapper__slide'),
      pagination = document.querySelectorAll('.pagination__item'),
      teamslidesWrap = document.querySelectorAll('.teamslider-wrapper');

console.log(next);
console.log(prev);
console.log(teamslides);
console.log(pagination);
let teamindex = 0;

const activeTeamSlide = n => {
    for(teamslide of teamslides){
        teamslide.classList.remove('active');
    }
    teamslides[n].classList.add('active');
}

const activePagination = n => {
    for(pagination__item of pagination) {
        pagination__item.classList.remove('active');
    }
    pagination[n].classList.add('active');
}

const prepareCurrSlide = ind => {
    activeTeamSlide(ind);
    activePagination(ind);
}

const nextTeamSlide = () => {
    if(teamindex == teamslides.length - 1){
        teamindex = 0;
        prepareCurrSlide(teamindex);
    }else{
        teamindex++;
        prepareCurrSlide(teamindex);
    }
};
const prevTeamSlide = () => {
    if(teamindex == 0){
        teamindex = teamslides.length - 1;
        prepareCurrSlide(teamindex);
    }else{
        teamindex--;
        prepareCurrSlide(teamindex);
    }
};
pagination.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
        teamindex = indexDot;
        prepareCurrSlide(teamindex);
    })
});
next.addEventListener('click',nextTeamSlide);
prev.addEventListener ('click', prevTeamSlide);
let teaminterval = setInterval(nextTeamSlide, 4000);
console.log(1);

// modal window
$('.phone-wrapper__btn').on('click',function(){
    $('.modal-window').addClass('active');
    $('body').addClass('body-fixed');
     $('.overlay').addClass('active');
});

function closeModal(){
    $('.modal-window').removeClass('active');
    $('body').removeClass('body-fixed');
    $('.overlay').removeClass('active');
    $('.modal-aftermath').removeClass('active');
}
$('.modal-aftermath__btn').on('click',closeModal);
$('.modal-window__close').on('click',closeModal);
$('.overlay').on('click',closeModal);






$.validator.addMethod("regex", function (value, element, regexp){
  var regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, "Please check your input.");

// // Отправка форм

$(document).ready(function(){
  $('[data-submit]').on('click',function(e){
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function(value, element,regexp){
    var regExsp = new RegExp(regexp);
    return this.optional(element) || regExsp.test(value);
  }, "Please check your input.");


//  // функция валидации и вывода сообщений

 function valEl(el){
  el.validate({
   rules:{
    tel:{
      required: true,
      regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
    },
    name: {
      required: true
    },
    email:{
      required: true,
      email : true
    }
   },
   messages:{
    tel:{
      required: 'Поле обязательно для заполнения',
      regex: 'Номер может содержать символы + - ()'
    },
    name:{
      required: 'Поле обязательно для заполнения',
    },
    email:{
      required: 'Поле обязательно для заполнения',
      email : 'Неверный тип E-mail'
    }
   },
   submitHandler: function (form){
    var $form = $(form);
    var $formId = $(form).attr('id');
    switch ($formId){
      case 'form-cover':
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize()
      })
      .always(function(){
        console.log('Always');
        setTimeout(function(){
          $form.trigger('reset');
        }, 1100);
        setTimeout(function(){
           $('.modal-window').removeClass('active');
           $('.modal-aftermath').addClass('active');
        }, 500);

      });
      break;
      case 'window':
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize()
      })
      .always(function(){
        console.log('Always');
        setTimeout(function(){
          $form.trigger('reset');
        }, 1100);
        setTimeout(function(){
           $('.modal-window').removeClass('active');
           $('.modal-aftermath').addClass('active');
        }, 500);

    });
    break;
   }
   return false;
  }
 });
}
$('.js-form').each(function(){
  valEl($(this));
});
});

//Sticky header

$(window).scroll(function() {
        let top = $(document).scrollTop();
        if (top < 100) {
            $('.header-menu').removeClass('fixed');
            $('.header').removeClass('active');

        }
        else {
            $('.header-menu').addClass('fixed');
            $('.header').addClass('active');
        }
  });

//Shop-submenu
$('.menu__item_headershop').hover(function(){
    $('.headershopmenu').stop().slideToggle(500);
    
 },function(){    
           $('.headershopmenu').stop().slideToggle(500);
           
        });

 $('.menu__item_shop').hover(function(){
    $('.shopmenu').stop().slideToggle(500);
    
 },function(){        
           $('.shopmenu').stop().slideToggle(500);
           
        });

  jQuery(document).ready(function($) {
    $('.btn-wrapper__arrow').click(function() { // отслеживаем клик по кнопке с классом li-nk
      var scroll_el = $(this).attr('href'); // берем у него содержимое атрибута href, которое начинается на "#section" или ".section"
      if ($(scroll_el).length != 0) { // чтобы избежать ошибки проверяем на существование этого элемента 
        $('html, body').animate({
          scrollTop: $(scroll_el).offset().top - 0 // отступ (пиксели)
        }, 1500); // скорость (миллисекунды)
      }
      return false; // отключаем действие по умолчанию
    });
  });

  //Mobile-menu

 $('.header-menu__logo').on('click',function(){
    $('.mobilemenu').stop().slideToggle(500);
    
 });