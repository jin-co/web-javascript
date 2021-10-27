const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')

let btns = []
let word = ""
let words = []
text.focus()
flag = false
let btnEl = null

text.addEventListener('keydown', (e) => {
    if (!flag) {
        btnEl = document.createElement('button')
        btnEl.className = 'btn'
        btnBox.appendChild(btnEl)
        flag = true
    }    
    
    if (e.key == ',') {
        flag = false
    }
    console.log(e.key)
    if (e.key != ',' && e.key != 'Backspace') {
        btnEl.textContent += e.key
    }
    
})


