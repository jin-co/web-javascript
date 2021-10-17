const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')

let btns = []

text.addEventListener('keydown', (e) => {
    let word = ""
    console.log(e.target.value)

    if (e.key != ',') {
        word += e.target.value    
        console.log(word)
    }
    
    console.log(word)
    if (e.key == ",") {
        addChoice(word)
        e.target.value = ''
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
    console.log(btns)
    
    
    setTimeout(() => {
        let num = Math.floor(Math.random() * btns.length)
        console.log(num)
        btns[num].className = 'btn chosen'    
    }, 3000);
    
}
