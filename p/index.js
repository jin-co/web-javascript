const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
const imgs = document.querySelectorAll('img')

let index = 1
prev.addEventListener('click', () => {
  index--
  if(index < 1) index = 3    
  console.log('btn minus', index)
})

next.addEventListener('click', () => {
  index++
  if(index > 3) index = 0  
  console.log('btn plus', index)
})

shuffle()

function shuffle() {  
  console.log('shuffle', index)
  setInterval(() => {
    if(index > 3) {
      index = 0
    }
    imgs.forEach((img, idx) => {
      img.style.transform = `translateX(${index * -100}%)`
    });
    index++
  }, 1000 * index)
}
