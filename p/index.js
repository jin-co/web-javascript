const img = document.querySelector('.img')
const count = document.querySelector('.count')

let idx = 0
img.addEventListener('dblclick', (e) => {
  console.log(e.offsetX, e.offsetY)
  idx++
  count.textContent = idx
  const heartEl = document.createElement('i')  
  heartEl.className = 'heart-effect'
  heartEl.textContent = '❤️'
  heartEl.style.top = `${e.offsetY}px`
  heartEl.style.left = `${e.offsetX}px`
  img.appendChild(heartEl)
})