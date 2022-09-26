const BgElements = ()=>{
    let elements = document.querySelectorAll('.set-bg')
    elements.forEach((el) => {
        el.style.backgroundImage = `url(${el.dataset.setbg})`
    });
}
BgElements()