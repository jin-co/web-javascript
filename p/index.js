const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const imgEls = document.querySelectorAll('img')
const imgs = document.querySelector('.img-box')

let idx = 0

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
  console.log('prev', idx)  
})

next.addEventListener('click', () => {
  idx++
  changeImage()
  console.log('next', idx)  
})
