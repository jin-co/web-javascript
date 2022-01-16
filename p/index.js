const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0fed9c20700500bedf3c21265dc090eb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=0fed9c20700500bedf3c21265dc090eb&query=';

const cards = document.querySelectorAll('.card')
callApi()
async function callApi() {
    let res = await fetch(API_URL)
    let data = await res.json()
    console.log(res)
    console.log(data)
    console.log('logo: ', data.results[0].poster_path)
    console.log('img: ', IMG_PATH + data.results[0].poster_path)
    
    let cardEl = document.createElement('div')
    cardEl.className = 'card'
    cardEl.innerHTML = `
        <img class="img" src="${IMG_PATH + data.results[0].poster_path}" alt="">   
        <div class="content">
            <div class="title">${data.results[0].title}</div>
            <div class="rating">${data.results[0].vote_average}</div>
        </div>
        <div class="detail">detail</div>
    `
    document.querySelector('main').appendChild(cardEl)
}

cards.forEach(card => {    
    card.addEventListener('mouseenter', () => {
        console.log('h')
        card.classList.add('show-detail')
    })
});

cards.forEach(card => {
    card.addEventListener('mouseleave', () => {
        console.log('h')
        card.classList.remove('show-detail')
    })
});
