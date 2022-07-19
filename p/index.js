const imgBox = document.querySelector('#imgs')
const imgs = document.querySelectorAll('img')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let index = 0

let runIt = setInterval(goGo, 500)

function goGo() {
  index++
  swipe()
}

function swipe() {  
  if (index > imgs.length - 1) {
    index = 0
  } else if (index < 0) {
    index = imgs.length - 1
  }
  imgBox.style.transform = `translateX(${index * -100}%)`
}

function reset() {
  clearInterval(runIt)
  runIt = setInterval(goGo, 500)
}

btnPrev.addEventListener('click', () => {
  index--
  swipe()
  reset()  
})

btnNext.addEventListener('click', () => {
  index++
  swipe()
  reset()  
})