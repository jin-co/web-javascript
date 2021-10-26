const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')
// const btnsStart = document.querySelectorAll('.btn')

let btns = []
let word = ""
let words = []
text.focus()

flag = false

function resetGame() {
    btns = []
    word = ''
    words = []
    const btnsEl = document.querySelectorAll('.btn')
    btnsEl.forEach(btn => {
        btn.style.opacity = '0'
    });
    console.log(btnsEl)
    
    setTimeout(() => {
        btnBox.innerHTML = ''
    }, 300)    
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
    if (!flag) {   
        btnCreated = addBtn()
    }
    if (e.key != 'Backspace') {
        btnCreated.textContent = btnCreated.textContent.splice(-1)    
    }
    btnCreated.textContent += e.key
    // if (e.key == "Enter") {
    //     words = text.value.split(',').filter(w => w.trim() !== '')
    //     addChoice(words)
    //     chooseOne()
    //     e.target.value = ''
    //     setTimeout(moveCursor, 100)
    // }
})

function addBtn() {    
    const btn = document.createElement('button')
    btn.className = 'btn'
    btnBox.appendChild(btn)        
    flag = true
    return btn
}

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
