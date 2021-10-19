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
    // text.target.value = ''
    setTimeout(() => {
        let num
        const btnsEl = document.querySelectorAll('.btn')        
        const effect = setInterval(() => {
            num = Math.floor(Math.random() * btnsEl.length)
            console.log(num)
            btnsEl.forEach(btn => {
                btn.classList.remove('chosen')
            });
            btnsEl[num].classList.add('chosen')
        }, 100);
        
        btnsEl[num].className = 'btn chosen'    
    }, 3000);
}
