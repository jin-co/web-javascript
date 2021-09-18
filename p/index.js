const container = document.querySelector('.container')
const circle = document.querySelector('.circle')
const menu = document.querySelector('.menu')
const close = document.querySelector('.close')

menu.addEventListener('click', () => {
    container.classList.add('open')
})

close.addEventListener('click', () => {
    container.classList.remove('open')
})