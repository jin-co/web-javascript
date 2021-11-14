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
const POKEAPI = 'https://pokeapi.co/api/v2/pokemon/'

async function fetchCharacter() {
    const res = await fetch(POKEAPI + '2')    
    const data = await res.json()
    console.log(data.sprites.front_shiny)
    return '"' + data.sprites.front_shiny + '"'
}

const playerCount = document.querySelector('.player-count')
playerCount.addEventListener('click', () => {
    playerCount.readOnly = false
})

playerCount.addEventListener('keydown', (e) => {
    fetchCharacter()
    if (e.key === 'Enter') {
        playerCount.readOnly = true
        let count = playerCount.value
        for (let i = 0; i < count; i++) {
            const playerEl = document.createElement('div')
            playerEl.className = 'character-box'
            playerEl.innerHTML = `
                <img class="img" src="${1}" alt="">
                <input type="text">            
            `
            characterBoxContainer.appendChild(playerEl)
        }
    }
})
//* player choice

// functions
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