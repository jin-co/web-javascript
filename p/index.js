const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0fed9c20700500bedf3c21265dc090eb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=0fed9c20700500bedf3c21265dc090eb&query=';

const cards = document.querySelectorAll('.card')

async function callApi() {
    let res = await fetch(API_URL)
    let data = await res.json()
    console.log(res)
    console.log(data)
    console.log('logo: ', data.results[0].poster_path)
    console.log('img: ', IMG_PATH + data.results[0].poster_path)
    return data
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
createCards()
async function createCards() {
    let data = await callApi() //test
    let cardEl = await document.createElement('div')
    cardEl.className = 'card'
    cardEl.innerHTML = `
        <img class="img" src="${IMG_PATH + callAPI().results[0].poster_path}" alt="">   
        <div class="content">
            <div class="title">title</div>
            <div class="rating">9</div>
        </div>
        <div class="detail">detail</div>
    `
    await document.querySelector('main').appendChild(cardEl)
}