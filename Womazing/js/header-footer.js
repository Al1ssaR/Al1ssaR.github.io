//Sticky header
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
      console.log(this);
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function(value, element,regexp){
    var regExsp = new RegExp(regexp);
    console.log(regExsp);
    return this.optional(element) || regExsp.test(value);
  }, "Проверьте ввод.");


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
    },
    text:{
      required: true
    }
   },
   messages:{
    tel:{
      required: 'Поле обязательно для заполнения',
      regex: 'Номер может содержать символы + - ()'
    },
    name:{
      required: 'Поле обязательно для заполнения'
    },
    email:{
      required: 'Поле обязательно для заполнения',
      email : 'Неверный тип E-mail'
    },
     text:{
      required: 'Поле обязательно для заполнения'
    }
   },
   submitHandler: function (form){
      console.log(form);
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
      case 'message-form':
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
         $('.message-form').removeClass('active');
           $('.message-aftermath').fadeIn(500);
        }, 300);

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
//Sticky-header
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

 //Mobile-menu

 $('.header-menu__logo').on('click',function(){
    $('.mobilemenu').stop().slideToggle(500);
    
 });