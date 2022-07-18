const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const imgEls = document.querySelectorAll('img')
const imgs = document.querySelector('.img-box')

let idx = 0

let inter = setInterval(() => {
  idx++
  changeImage()
}, 2000);

function changeImage() {
  if (idx > imgEls.length - 1) {
    idx = 0
  } else if (idx < 0) {
    idx = imgEls.length - 1
  }
  console.log('chan', idx)  
  console.log('img length: ', imgEls.length)  
  imgs.style.transform = `translateX(${idx * -100}%)`
}

prev.addEventListener('click', () => {
  idx--
  changeImage()
  resetIn()
  console.log('prev', idx)  
})

next.addEventListener('click', () => {
  idx++
  changeImage()
  resetIn()
  console.log('next', idx)  
})

function resetIn() {
  clearInterval(inter)
  inter = setInterval(changeImage, 2000)
}