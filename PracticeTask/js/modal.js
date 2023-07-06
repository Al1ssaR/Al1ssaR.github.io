//Модальное окно
function modal(){
    const btnModalOpen = document.querySelector('.header-menu__cart')
    const modal = document.querySelector('.modal')
    const btnModalClose = modal.querySelector('.modal__close')
    const body = document.getElementsByTagName('body')[0]

    btnModalOpen.addEventListener('click',()=>{
        modal.classList.add('active')
        body.classList.add('fixed')
    })
    btnModalClose.addEventListener('click',()=>{
        modal.classList.remove('active')
        body.classList.remove('fixed')
    })
}
modal()

// Валидация
function validation(){
const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');
const inputs = form.querySelectorAll('.modal-form__input');

// Функция для проверки всех инпутов
function checkInputs() {
  let allFilled = true;
  inputs.forEach(input => {
    if (input.value.trim() === '') {
      allFilled = false;
    }
  });

  if (allFilled) {
    submitBtn.removeAttribute('disabled');
    submitBtn.classList.remove('disabled');
  } else {
    submitBtn.setAttribute('disabled', 'true');
    submitBtn.classList.add('disabled');
  }
}

// Слушатель события ввода для каждого инпута
inputs.forEach(input => {
  input.addEventListener('input', checkInputs);
});
form.addEventListener('submit', e => {
    modal.classList.remove('active')
    body.classList.remove('fixed')
  });
}
validation();