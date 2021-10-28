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
            'btns length: ', lastBtnEl.length, '\n'
            )
        
        lastBtnEl.forEach(btnEl => {
            console.log(btnEl.textContent)
        });
        //test

        // let words = btnEl.textContent.split('')
        let words = lastBtnEl[lastBtnEl.length - 1].textContent.split('')
        words.splice(-1, 1)
        lastBtnEl.forEach(btnEl => {
            if (bntEl.textContent == '') {
                btnEl.remove()                
            }
        });
        btnEl.textContent = words.join('')
        
    }

    if (e.key != ',' && e.key != 'Backspace') {
        btnEl.textContent += e.key
    }
})


