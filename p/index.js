const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')
const btnsStart = document.querySelectorAll('.btn')

let btns = []
let isOn = false
let word = ""
let words = []

text.addEventListener('keydown', (e) => {
    if (!isOn) {
        btnsStart.forEach(btn => {
            btn.remove()
        });
        isOn = true    
    }
    
    word += e.target.value    
    
    console.log(word)
    if (e.key == ",") {
        words = word.split(',')
        addChoice(words)
        console.log('comma')
    }

    if (e.key == "Enter") {
        chooseOne()
        text.innerHTML = ''
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
