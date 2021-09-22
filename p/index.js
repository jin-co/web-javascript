const container = document.querySelector('.container')
const contents = document.querySelectorAll('.content')

window.addEventListener('wheel', () => {
    console.log(window.innerHeight)
    contents.forEach(content => {
        if (window.innerHeight -100 < content.getBoundingClientRect().top) {
            content.classList.add('show')
            console.log(content.getBoundingClientRect().top)
            // const box = document.createElement('div')
            // box.classList.add('content')
            // container.appendChild(box)
            console.log('h')
        }
    });  
})

