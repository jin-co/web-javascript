const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')
const btnsStart = document.querySelectorAll('.btn')

let btns = []
let isOn = false
let word = ""
let words = []

// text.addEventListener('click', () => {
    
// })

// function resetGame() {
//     btns = []
//     isOn = false
//     word = ''
//     words = []
//     btnBox.innerHTML = ''
// }

text.addEventListener('keydown', (e) => {
    if (!isOn) {
        btnsStart.forEach(btn => {
            btn.remove()
        });
        isOn = true    
    }
    if (e.target.value !== '') {
        word += e.target.value        
    }
    
    
    console.log(word)
    if (e.key == ",") {
        
        
    }

    if (e.key == "Enter") {
        words = word.split(',')
        addChoice(words)
        console.log(words)
        chooseOne()
        e.target.value = ''
    }
})

function addChoice(words) {
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

    // var effect
    // effect = setInterval(() => {
    //     num = Math.floor(Math.random() * btnsEl.length)
    //     console.log(num)
    //     btnsEl.forEach(btn => {
    //         btn.classList.remove('chosen')
    //     });
    //     btnsEl[num].classList.add('chosen')
    // }, 100);

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
