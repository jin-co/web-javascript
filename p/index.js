const canvas = document.querySelector('.canvas')
const ctv = canvas.getContext('2d')

let isClicked = false
let x
let y

canvas.addEventListener('mouseup', (e) => {
  isClicked = false  
})

canvas.addEventListener('mousedown', (e) => {
  isClicked = true
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mousemove', (e) => {
  if(isClicked) {
    const x2 = e.offsetX
    const y2 = e.offsetY

    ctv.beginPath()
    ctv.moveTo(x, y)
    ctv.lineTo(x2, y2)
    ctv.stroke()

    x = x2
    y = y2    
  }
})