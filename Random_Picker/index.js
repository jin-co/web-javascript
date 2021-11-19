const nextBtns = document.querySelectorAll('.next')
const goBackBtns = document.querySelectorAll('.go-back')
const pages = document.querySelectorAll('.pages')
const characterBoxContainer = document.querySelector('.character-box-container')

// for generated characters
let characters = []


//* page moving
nextBtns.forEach((next, index) => {
    next.addEventListener('click', () => {
        shuffleCard(index)
    })
});

let idx = 0
goBackBtns.forEach((pre, index) => {
    pre.addEventListener('click', () => {
        idx = index
        if (idx >= 0) {
            idx--
            shuffleCard(idx)
        } 
        if (idx < 0) {
            shuffleCard(3)    
        }
    })
});
//* page moving

//* player choice
const POKEPICAPI = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png'
const MAX_NUM = 150

async function fetchCharacter() {
    const res = await fetch(POKEPICAPI + '2')    
    const data = await res.json()
    console.log(data.sprites.front_shiny)
    return data.sprites.front_shiny
}

// loads characters
window.addEventListener('load', () => {
    for (let i = 1; i <= MAX_NUM; i++) {
        const playerEl = document.createElement('div')
        playerEl.className = 'character-box'
        playerEl.innerHTML = `
            <img class="img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${i}.png" alt="">
        `
        characterBoxContainer.appendChild(playerEl)
    }
    getImageEl()
})

const playerCount = document.querySelector('.player-count')
playerCount.addEventListener('click', () => {
    playerCount.readOnly = false
})

//test
playerCount.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
    }
})

// adds selected player to an array for selection
let playerChosen = []
function getImageEl() {
    const imgs = document.querySelectorAll('.img')
    imgs.forEach(img => {
        img.addEventListener('click', (e) => {
            console.log(e)
            playerChosen.push(e)
        })  
    });
}
//* /player choice

//* Selection
const displayBox = document.querySelector('display-box')

playerChosen.forEach(p => {
    displayBox.appendChild(p)
});

//* /Selection

// functions
function getRandom(max) {
    let num = Math.floor((Math.random() * max) + 1)
    console.log(num)
    return num
}

function shuffleCard(index) {
    switch (index) {
        case 0:
            // two
            pages[0].style.transform = 'translate(0%, 100%)'
            pages[1].style.transform = 'translate(0%, -100%)'
            pages[2].style.transform = 'translate(100%, -100%)'
            pages[3].style.transform = 'translate(100%, 0%)'
            break;
        case 1:
            // three
            pages[0].style.transform = 'translate(100%, 100%)'
            pages[1].style.transform = 'translate(0%, 0%)'
            pages[2].style.transform = 'translate(0%, -100%)'
            pages[3].style.transform = 'translate(100%, -100%)'
            break;
        case 2:
            // four
            pages[0].style.transform = 'translate(100%, 0%)'
            pages[1].style.transform = 'translate(100%, 0%)'
            pages[2].style.transform = 'translate(0%, 0%)'
            pages[3].style.transform = 'translate(0%, -100%)'
            break;
        case 3:
            // one
            pages[0].style.transform = 'translate(0%, 0%)'
            pages[1].style.transform = 'translate(100%, -100%)'
            pages[2].style.transform = 'translate(100%, 0%)'
            pages[3].style.transform = 'translate(0%, 0%)'
            break;    
        default:
            break;
    }
}