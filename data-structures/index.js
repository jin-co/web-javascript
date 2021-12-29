const btn = document.querySelector('.btn')
const navBox = document.querySelector('.nav-box')


btn.addEventListener('click', () => {
    navBox.classList.toggle('show')
})