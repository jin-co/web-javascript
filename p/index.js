const icon = document.querySelector('.icon')
const search = document.querySelector('.search')

icon.addEventListener('click', () => {
    search.classList.toggle('active')
})