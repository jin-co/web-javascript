const btn = document.querySelector('.btn');
const ripple = document.querySelector('.ripple-box')

btn.addEventListener('click', (e) => {
    console.log('e x: ', e.clientX, 'e y: ', e.clientY)    
    console.log('rec x: ', btn.getBoundingClientRect().x, 'rect y: ', btn.getBoundingClientRect().y)
    console.log('sub x', e.clientX - btn.getBoundingClientRect().x)

    console.log('sub y', e.clientY - btn.
    getBoundingClientRect().y)
    
    let x = e.clientX - btn.getBoundingClientRect().x
    let y = e.clientY - btn.getBoundingClientRect().y
    
    ripple.classList.add('ripple')
    ripple.style.top = `${y}px`
    ripple.style.left = `${x}px`

    setTimeout(() => {
        ripple.classList.remove('ripple')
    }, 1000)
    
})

// let ripple = setInterval(() => {
//     let rippleEl = document.createElement('div')
//     rippleEl.classList.add('ripple')
//     btn.appendChild(rippleEl)
// })