const imgBox = document.querySelector('#imgs')
const imgs = document.querySelectorAll('img') 
const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')

let index = 0

let auto = setInterval(runIt, 1000)

function runIt() {
  index++
  swipe()
}

prevBtn.addEventListener('click', () => {  
  index--
  swipe()
  reset()
})

function swipe() {
  if(index > imgs.length - 1) {
    index = 0
  } else if (index < 0 ) {
    index = imgs.length - 1
  }
  imgBox.style.transform = `translateX(${index * -100}%)`
}

nextBtn.addEventListener('click', () => {  
  index++
  swipe()
  reset()
})

function reset() {
  clearInterval(auto)
  auto = setInterval(runIt, 1000)
}
