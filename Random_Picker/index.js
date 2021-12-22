const nextBtns = document.querySelectorAll('.next')
const goBackBtns = document.querySelectorAll('.go-back')
const pages = document.querySelectorAll('.pages')
const characterBoxContainer = document.querySelector('.character-box-container')

// for generated characters
let characters = []

//* page moving
nextBtns.forEach((next, index) => {
    next.addEventListener('click', () => {
        shufflePage(index)
    })
});

let idx = 0
goBackBtns.forEach((pre, index) => {
    pre.addEventListener('click', () => {
        idx = index
        if (idx >= 0) {
            idx--
            shufflePage(idx)
        } 
        if (idx < 0) {
            shufflePage(3)    
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
        
            playerChosen.push(copied)            
            
            displayBox.appendChild(copied)
            console.log(copied, '\narray ', playerChosen)
            playerCount.value = playerChosen.length
        })  
    });
}
//* /player choice

//* Selection 
const runBtn = document.querySelector('.run')

runBtn.addEventListener('click', () => {
    let random = 0
    let effect = setInterval(() => {
        playerChosen.forEach(pocket => {
            pocket.classList.remove('select')
        });
        random = Math.floor(Math.random() * playerChosen.length)
        playerChosen[random].classList.add('select')    
    }, 100); 
    setTimeout(() => {               
        clearInterval(effect)
        playerChosen[random].classList.add('select')
        openPocket(playerChosen[random])         
    }, 3000)    
})
//* /Selection

// functions
/// removes the pocket after it has been chosen
const selectedPlayersBox = document.querySelector('.selected-players-box')
function openPocket(chosenPocket) {    
    setTimeout(() => {
        chosenPocket.className = 'character-box'    
        selectedPlayersBox.appendChild(chosenPocket)
    }, 1000);        
    playerChosen.splice(playerChosen.indexOf(chosenPocket), 1)
}

function shufflePage(index) {
    console.log(index)
    console.log(pages)
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
            pages[3].style.transform = 'translate(0%, -200%)'
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