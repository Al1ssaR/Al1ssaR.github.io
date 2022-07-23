$.validator.addMethod("regex", function (value, element, regexp){
  var regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, "Проверьте ввод.");

// // Отправка форм

$(document).ready(function(){
  $('[data-submit]').on('click',function(e){
      console.log(this);
    e.preventDefault();
    console.log($(this).parent().parent().parent().parent('form').submit());
    $(this).parent().parent().parent().parent('form').submit();
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
    var $form = $(form);
      console.log($form);
      console.log('hello');
    var $formId = $(form).attr('id');
    console.log($formId);
    switch ($formId){
      case 'form-order':
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