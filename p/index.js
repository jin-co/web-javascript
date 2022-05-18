const card = document.querySelector('.card')
const search = document.querySelector('.search')

search.addEventListener('input', (e) => {
    card.classList.add('hide')
})