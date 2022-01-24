const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0fed9c20700500bedf3c21265dc090eb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=0fed9c20700500bedf3c21265dc090eb&query=';

// const cards = document.querySelectorAll('.card')
const cards = []
callApi()
async function callApi() {
    let res = await fetch(API_URL)
    let data = await res.json()
    console.log(data)    

    for (let i = 0; i < data.results.length; i++) {
        let cardEl = document.createElement('div')
        cardEl.className = 'card'
        cardEl.setAttribute('data-title', `${data.results[i].title}`)
        cardEl.innerHTML = `
        <img class="img" src="${IMG_PATH + data.results[i].poster_path}" alt="">   
        <div class="content">
            <div class="title">${data.results[i].title}</div>
            <div class="rating">${data.results[i].vote_average}</div>
        </div>
        <div class="detail">
            <h3>Overview</h3>
            ${data.results[i].overview}
        </div>
        `
        cards.push(cardEl)
        document.querySelector('main').appendChild(cardEl)
            
    }

    // let cardEl = document.createElement('div')
    // cardEl.className = 'card'
    // cardEl.innerHTML = `
    //     <img class="img" src="${IMG_PATH + data.results[0].poster_path}" alt="">   
    //     <div class="content">
    //         <div class="title">${data.results[0].title}</div>
    //         <div class="rating">${data.results[0].vote_average}</div>
    //     </div>
    //     <div class="detail">
    //         <h3>Overview</h3>
    //         ${data.results[0].overview}
    //     </div>
    // `
    // cards.push(cardEl)
    // document.querySelector('main').appendChild(cardEl)
    cards.forEach(card => {    
        card.addEventListener('mouseenter', () => {        
            card.classList.add('show-detail')
        })
    });
    
    cards.forEach(card => {
        card.addEventListener('mouseleave', () => {        
            card.classList.remove('show-detail')
        })
    });
}

const search = document.querySelector('.search')
let searchKeyword = ''
search.addEventListener('keydown', (e) => {
    console.log(e.target.value)
    console.log(e)
    if (e.key != ' ' && e.key != 'Enter') {
        searchKeyword += e.key
        
    }
    if (e.key == 'Enter') {
        console.log('enter: ', searchKeyword)
        sortMovies()
        searchKeyword = ''
        e.target.value = ''
    }
    console.log(searchKeyword)
})

function sortMovies() {
    // cards.filter(function(val) {        
    //     console.log('val: ', val, 'title: ', val.dataset.title.toLowerCase(), 'search word: ', searchKeyword, 'include?: ', val.dataset.title.toLowerCase().includes(searchKeyword))
    //     return val.dataset.title.toLowerCase().includes('eter')
    // })
    // console.log(cards)
    // console.log(cards[0].dataset.title)
    
}
