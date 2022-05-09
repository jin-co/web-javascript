const header = document.querySelector('header')

window.addEventListener('scroll', (e) => {
    // console.log(header.getBoundingClientRect().y)
    if(header.getBoundingClientRect().y < -200) {
        header.classList.add('light')
        console.log('down')
    } else {
        header.classList.remove('light')
    }
})