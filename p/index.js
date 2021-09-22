const container = document.querySelector('.container')
const contents = document.querySelectorAll('.content')

window.addEventListener('wheel', () => {
    console.log(window.innerHeight)
    contents.forEach(content => {
        if ((window.innerHeight / 2) +150 > content.getBoundingClientRect().top) {
            content.classList.add('show')
            console.log("window: ", window.innerHeight / 2 + 100)
            console.log("client top: ", content.getBoundingClientRect().top)
            // const box = document.createElement('div')
            // box.classList.add('content')
            // container.appendChild(box)
        } else {
            content.classList.remove('show')
        }
    });  
})

