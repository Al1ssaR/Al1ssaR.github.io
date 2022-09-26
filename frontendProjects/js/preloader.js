const preloader = ()=>{
    let preloader = document.querySelector('.preloder')
    setTimeout(() => {
        preloader.classList.remove('active')
    }, 500)
}
