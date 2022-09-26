const mainData = ()=>{
    const renderGanreList = (ganres)=>{
        let dropdonwBlock = document.querySelector('.header__menu .dropdown')
        ganres.forEach(ganre =>{
            dropdonwBlock.insertAdjacentHTML('beforeend',`
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }
    const renderAnimeList = ((array, ganres)=>{
        let wrapper = document.querySelector('.product .col-lg-8')
        console.log(wrapper)
        console.log(array)
        console.log(ganres)
        ganres.forEach((ganre) =>{
            const productBlock = document.createElement('div')
            const listBlock = document.createElement('div')
            const list = array.filter(item => item.ganre === ganre)
            listBlock.classList.add('row')
            productBlock.classList.add('mb-5')
            productBlock.insertAdjacentHTML('beforeend',`
                <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-8">
                                <div class="section-title">
                                    <h4>${ganre}</h4>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <div class="btn__all">
                                    <a href="./categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
                                </div>
                            </div>
                </div>
            `)
            productBlock.append(listBlock)
            wrapper.append(productBlock)
            list.forEach(item =>{
                let ulBlock = document.createElement('ul')
                item.tags.forEach(tag =>{
                    ulBlock.insertAdjacentHTML('beforeend',`
                        <li>${tag}</li>
                    `)
                })
                listBlock.insertAdjacentHTML('beforeend',`
                <div class="col-lg-4 col-md-6 col-sm-6">
                   <div class="product__item">
                                 <div class="product__item__pic set-bg" data-setbg="${item.image}">
                                        <div class="ep">${item.rating} / 10</div>
                                        <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                                    </div>
                                    <div class="product__item__text">
                                        ${ulBlock.outerHTML}
                                        <h5><a href="./anime-details.html?ItemId=${item.id}">${item.title}</a></h5>
                                    </div>
                                 </div>
                    </div>
                </div>
                `)
            })
            wrapper.querySelectorAll('.set-bg').forEach((el, index , array) => {
                el.style.backgroundImage = `url(${el.dataset.setbg})`
            });
        })
        
    })


    const renderTopAnime = (array) =>{
        let wrapper = document.querySelector('.filter__gallery')
        wrapper.innerHTML = ''
        array.forEach((item) => {
            wrapper.insertAdjacentHTML('beforeend', `
            <div class="product__sidebar__view__item set-bg mix month week" data-setbg="${item.image}">
                <div class="ep">${item.rating} / 10</div>
                <div class="view"><i class="fa fa-eye"></i> ${item.views} </div>
                <h5><a href="./anime-details.html?ItemId=${item.id}">${item.title}</a></h5>
            </div>
            `)
        })
        wrapper.querySelectorAll('.set-bg').forEach((el, index , array) => {
            el.style.backgroundImage = `url(${el.dataset.setbg})`
        });
    }
    fetch('https://anime-site-db-default-rtdb.firebaseio.com/anime.json')
    .then((response) => {
        return response.json()
    })
    .then((data) =>{
        const ganres = new Set()

        data.forEach((item) =>{
            ganres.add(item.ganre)
        })

        renderTopAnime(data.sort((a,b) => b.views - a.views).slice(0,5))
        renderAnimeList(data,ganres)
        renderGanreList(ganres)
        preloader()
    })
}
mainData()