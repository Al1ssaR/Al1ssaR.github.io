const scrolltop = ()=>{
    let topBtn = document.querySelector('#scrollToTopButton')
    console.log(topBtn)
    topBtn.addEventListener('click',(e)=>{
        seamless.scrollIntoView(document.querySelector(".header"), {
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    })
}
scrolltop()