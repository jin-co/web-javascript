const nextBtns = document.querySelectorAll('.next')
const goBackBtns = document.querySelectorAll('.go-back')
const pages = document.querySelectorAll('.pages')
const characterBoxContainer = document.querySelector('.character-box-container')

// for generated characters
let characters = []
let players = 0

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
            <div class="circle"></div>
        `
        characterBoxContainer.appendChild(playerEl)
    }
    getImageEl()
})


// adds selected player to an array for selection
const playerCount = document.querySelector('.player-count')

let playerChosen = []
const displayBox = document.querySelector('.display-box')

function getImageEl() {
    const imgs = document.querySelectorAll('.img')
    imgs.forEach(img => {
        img.addEventListener('click', (e) => {
            // capsule
            console.log(e.target.parentNode)
            e.target.parentNode.className = 'character-box pick'            

            let copied = e.target.parentNode.cloneNode()
            
            let picCopied = e.target.cloneNode()
            copied.appendChild(picCopied)
            
            let circleCopied = document.createElement('div') 
            circleCopied.className = 'circle'
            copied.appendChild(circleCopied)

            displayBox.appendChild(copied)
            players++
            console.log(players, copied)
            playerCount.textContent = players
        })  
    });
}
//* /player choice

//* Selection 
const runBtn = document.querySelector('.run')

runBtn.addEventListener('click', () => {
    console.log('ht')
})


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