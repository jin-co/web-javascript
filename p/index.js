const count = document.querySelector('.count')
const container = document.querySelector('.container')

let idx = 0

window.addEventListener('load', () => {
    let increment = setInterval(() => {
        idx++

        // bg opacity
        count.textContent = idx + "%" 
        count.style.opacity = `${1 - (idx / 100)}`
        container.style.filter = `blur(${25 - (idx / 4)}px)`
        if (idx >= 4000) {
            clearInterval(increment)
            idx = 0
        }
     }, 10);
})
