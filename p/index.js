const text = document.querySelector('.text')
const btnBox = document.querySelector('.btn-box')

let btns = []
let word = ""
let words = []
text.focus()
flag = false
let btnEl = null

text.addEventListener('keydown', (e) => {
    const lastBtnEl = document.querySelectorAll('.btn')
    if (!flag && e.key != 'Backspace') {
        btnEl = document.createElement('button')
        btnEl.className = 'btn'
        btnBox.appendChild(btnEl)
        flag = true
    }    
    
    if (e.key == ',') {
        flag = false
    }

    if (e.key == 'Backspace') {                
        if (lastBtnEl[lastBtnEl.length - 1].textContent.length <= 0) {
            lastBtnEl[lastBtnEl.length - 1].remove()
            flag = false
        }      

        if (lastBtnEl.length > 0) {
            let words = lastBtnEl[lastBtnEl.length - 1].textContent.split('')        
            let aa = words.splice(-1, 1)
            lastBtnEl[lastBtnEl.length - 1].textContent = words.join('')
            console.log('in: ', flag)
        }        
    }

    if (e.key != ',' && e.key != 'Backspace') {
        btnEl.textContent += e.key
    }
})


