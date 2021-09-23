const btns = document.querySelectorAll('.btn-buy')
const containers = document.querySelectorAll('.container')

containers.forEach(container => {
    container.addEventListener('mouseenter', () => {
        container.style.width = '280%'
        container.classList.add('active')
    })
});

containers.forEach(container => {
    container.addEventListener('mouseleave', () => {
        container.style.width = '100%'
        container.classList.remove('active')
    })
});