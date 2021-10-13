const btns = document.querySelectorAll('.btn')
const openBtns = document.querySelectorAll('.open')
const closeBtns = document.querySelectorAll('.close')


btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('show')
    })
});
