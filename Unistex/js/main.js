//Мобильное меню
$('.mobile-menu__burger').click(function(){
	$('.log-wrapper_mob').stop().fadeToggle();
});




//Меню с выбором языка
$('.header-menu__arrow-down').click(function(){
	$('.other-lang').stop().slideToggle();
	$('.header-menu__arrow-down').stop().toggleClass('active');
});


//Аккордион с вопросами (Accordion with questions)

$('.questions').accordion({
	heightStyle: 'content',
	header: '> .questions__item > .question__title'
});