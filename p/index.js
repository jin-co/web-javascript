const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')
const btnsStart = document.querySelectorAll('.btn')

let btns = []
let word = ""
let words = []

function resetGame() {
    btns = []
    word = ''
    words = []
    btnBox.innerHTML = ''
    moveCursor()
}

function moveCursor() {
    text.focus()
    text.setSelectionRange(0,0)
}

text.addEventListener('click', () => {
    resetGame()
})

text.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        words = text.value.split(',').filter(w => w.trim() !== '')
        addChoice(words)
        chooseOne()
        e.target.value = ''
        setTimeout(moveCursor, 100)
    }
})

function addChoice(words) {
    btnBox.innerHTML = ''
    words.forEach(word => {
        const choiceEl = document.createElement('button')
        choiceEl.className = 'btn'
        choiceEl.textContent = word
        btns.push(choiceEl)
        btnBox.appendChild(choiceEl)    
    });
}

function chooseOne() {
    const btnsEl = document.querySelectorAll('.btn')

    var effect = setInterval(spin, 100)
    function spin() {
        num = Math.floor(Math.random() * btnsEl.length)
        console.log(num)
        btnsEl.forEach(btn => {
            btn.classList.remove('chosen')
        });
        btnsEl[num].classList.add('chosen')
    }
    
    setTimeout(() => {
        clearInterval(effect)
    }, 3000);
}
