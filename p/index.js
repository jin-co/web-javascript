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

    if (e.key == 'Backspace') {
        const lastBtnEl = document.querySelectorAll('.btn')
        
        //test
        console.log(
            'btns: ', lastBtnEl, '\n',
            'btns length: ', lastBtnEl.length, '\n',
            'btns last: ', lastBtnEl[lastBtnEl.length - 1], '\n'
            )        
        //test
        
        if (lastBtnEl.length > 0) {
            let words = lastBtnEl[lastBtnEl.length - 1].textContent.split('')        
            let aa = words.splice(-1, 1)
            lastBtnEl.forEach(btnEl => {
                if (btnEl.textContent == '') {
                    btnEl.remove()                
                }
            });
            lastBtnEl[lastBtnEl.length - 1].textContent = words.join('')
        } else {
            flag = false
        }
    }

    if (e.key != ',' && e.key != 'Backspace') {
        btnEl.textContent += e.key
    }
})


