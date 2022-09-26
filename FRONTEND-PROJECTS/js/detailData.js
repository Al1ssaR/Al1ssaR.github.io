const detailData = () => {
    let preloader = document.querySelector('.preloder')
    const renderGanreList = (ganres)=>{
        let dropdonwBlock = document.querySelector('.header__menu .dropdown')
        ganres.forEach(ganre =>{
            dropdonwBlock.insertAdjacentHTML('beforeend',`
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }
    const renderAnimeDetails = ((array, ItemId)=>{
        const animeObj = array.find(item => item.id == ItemId)
        const imageBlock = document.querySelector('.anime__details__pic')
        const viewBlock = imageBlock.querySelector('.view')
        const titleBlock = document.querySelector('.anime__details__title h3')
        const subTitleBlock = document.querySelector('.anime__details__title span')
        const descriptionBlock = document.querySelector('.anime__details__text p')
        const widgetList = document.querySelectorAll('.anime__details__widget ul li')
        const breadcrumbs = document.querySelector('.breadcrumb__links span')
        if (animeObj){
            imageBlock.dataset.setbg = animeObj.image
           
            viewBlock.insertAdjacentHTML('beforeend',`
            <i class="fa fa-eye"></i>${animeObj.views}</div>
            `)
            
            titleBlock.textContent = animeObj.title
            subTitleBlock.textContent = animeObj['original-title']
            descriptionBlock.textContent = animeObj.description

            widgetList[0].insertAdjacentHTML('beforeend',`
                <span>Date aired:</span> ${animeObj.date}
            `)
            widgetList[1].insertAdjacentHTML('beforeend',`
                <span>Rating:</span> ${animeObj.rating}
           `)
            widgetList[2].insertAdjacentHTML('beforeend',`
                <span>Genre:</span> ${animeObj.tags.join(", ")}
          `)
          breadcrumbs.textContent = animeObj.ganre


            document.querySelectorAll('.set-bg').forEach((el, index , array) => {
                el.style.backgroundImage = `url(${el.dataset.setbg})`
            });

        } else {
            console.log('Аниме отсутсутствует!') 
        }
    })
    
   
    fetch('https://anime-site-db-default-rtdb.firebaseio.com/anime.json')
    .then((response) => {
        return response.json()
    })
    .then((data) =>{
        const ganres = new Set()
        const ganreParams = new URLSearchParams(window.location.search).get('ItemId')
       
        data.forEach((item) =>{
            ganres.add(item.ganre)
        })
        
        if (ganreParams){
            renderAnimeDetails(data, ganreParams)
            setTimeout(() => {
                preloader.classList.remove('active')
            }, 500)
        } else {
            console.log('Аниме отсутсутствует!')
        }
        renderGanreList(ganres)
    })


}
detailData()