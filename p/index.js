const btn = document.querySelector('.btn-show')
const nBox = document.querySelector('.notification-box')

btn.addEventListener('click', () => {
    console.log('he')
    const newEl = document.createElement('div')
    newEl.className = 'notification'
    newEl.innerText = 'what'
    nBox.appendChild(newEl)

    setTimeout(() => {
        nBox.removeChild(newEl)
    }, 1000)
})