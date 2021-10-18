const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')
const btnsStart = document.querySelectorAll('.btn')

let btns = []
let isOn = false
let word = ""

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
        addChoice(word)
        console.log('comma')
    }

    if (e.key == "Enter") {
        chooseOne()
        text.innerHTML = ''
    }
})

function addChoice(word) {
    const choiceEl = document.createElement('button')
    choiceEl.className = 'btn'
    choiceEl.textContent = word
    btns.push(choiceEl)
    btnBox.appendChild(choiceEl)
}

function chooseOne() {
    setTimeout(() => {
        let num = Math.floor(Math.random() * btns.length)
        console.log(num)
        btns[num].className = 'btn chosen'    
    }, 3000);
}
