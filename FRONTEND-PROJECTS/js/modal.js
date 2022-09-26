const modal = ()=>{
    let modal = document.querySelector('.search-model')
    let modalBtn = document.querySelector('.icon_search')
    let modalClose = modal.querySelector('.icon_close')
    modalBtn.addEventListener('click',()=>{
        modal.style.display = 'block'
    })
    modalClose.addEventListener('click',()=>{
        modal.style.display = 'none'
    })
}
modal()