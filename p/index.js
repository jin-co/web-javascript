const container = document.querySelector('.container')
const contents = document.querySelectorAll('.content')

showBoxes()

window.addEventListener('scroll', () => showBoxes())
window.addEventListener('scroll', showBoxes)

function showBoxes() {
    contents.forEach(content => {
        if ((window.innerHeight / 5 * 4) > content.getBoundingClientRect().top) {
            content.classList.add('show')
        } else {
            content.classList.remove('show')
        }
    });
}

