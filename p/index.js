const label = document.querySelector('label')
const ball = document.querySelector('.ball')

label.addEventListener('click', () => {
  ball.classList.toggle('show')
})