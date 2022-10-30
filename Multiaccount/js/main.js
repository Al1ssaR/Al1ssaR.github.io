// Adaptive

window.addEventListener('resize',adapt)
function adapt() {
    const windowInnerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// Explanation Section (<767)
    let ExplainBg_1 = document.querySelector('.explain-item__bg_1')
    let ExplainBg_2 = document.querySelector('.explain-item__bg_2')
    let ExplainBg_3 = document.querySelector('.explain-item__bg_3')
    let ExplainTextCont = document.querySelectorAll('.explain-list__item')
    // Explanation Section (<767)
    if (windowInnerWidth<=767){
        for(let i = 0; i < ExplainTextCont.length; i++){
            `ExplainBg_${i}= ExplainTextCont[i].offsetWidth`
        }
        ExplainBg_1.src='./img/expl-item-adapt (1).png'
        ExplainBg_2.src='./img/expl-item-adapt (2).png'
        ExplainBg_3.src='./img/expl-item-adapt (3).png'
    }
     else {
        ExplainBg_1.src='./img/expl-item-bg (1).png'
        ExplainBg_2.src='./img/expl-item-bg (2).png'
        ExplainBg_3.src='./img/expl-item-bg (3).png'
    }
    // Why-not Section (<767)
    let AnswerImg = document.querySelector('.answer-container__img')
    if (windowInnerWidth<767){
        AnswerImg.src ='./img/why-not-adapt.png'
    }
}
adapt()

// Adaptive End

// Animations

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  for (let elm of elements) {
    observer.observe(elm);
  }

// Explanation Animation

function ExplnAnimate(){
    let ExplCont = document.querySelector('.explain-content')
    let ExplShow = document.querySelector('.explanation__show')
    ExplShow.addEventListener('click',()=>{
        if (!ExplCont.classList.contains('active')){
            ExplCont.classList.add('flex')
            ExplShow.classList.add('active')
            setTimeout(()=>{
                ExplCont.classList.add('active')
            },500)
        }
        else {  
            ExplCont.classList.remove('active')
            setTimeout(()=>{
             ExplCont.classList.remove('flex')
             ExplShow.classList.remove('active')
            },1000)
        }  
    })
}
ExplnAnimate()

// Animations End

// Fingerprint Section

function Tabs(){
    let questionsTabs = document.querySelectorAll('.fingerprint-questions__item')
    let answersTabs = document.querySelectorAll('.fingerprint-answers__text')
    for(let i = 0; i < questionsTabs.length; i++){
        questionsTabs[i].addEventListener('click',()=>{
            for (let j = 0; j < questionsTabs.length; j++){
                if(questionsTabs[j].classList.contains('active')){
                    questionsTabs[j].classList.remove('active')
                }
                if(answersTabs[j].classList.contains('active')){
                    answersTabs[j].classList.remove('active')
                }
                questionsTabs[i].classList.add('active')
                answersTabs[i].classList.add('active')
            }
        })
    }
}
Tabs()
