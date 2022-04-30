const canvas = document.querySelector('#canvas')
const btnIncrease = document.querySelector('#increase')
const btnDecrease = document.querySelector('#decrease')
const sizeEl = document.querySelector('#size')
const colorEl = document.querySelector('#color')
const clearEl = document.querySelector('#clear')

const ctx = canvas.getContext("2d")

let size = 5
let clicked = false
colorEl.value = 'black'
let color = colorEl.value
let x
let y

canvas.addEventListener('mousedown', (e) => {
  clicked = true
  x = e.offsetX
  y = e.offsetY

  console.log('x:', x, 'y:', y)
})

canvas.addEventListener('mouseup', (e) => {
  clicked = false  
})

canvas.addEventListener('mousemove', (e) => {
  if(clicked) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    drawCircle(x2, y2)
    // drawLine(x, y, x2, y2)
    x = x2
    y = y2
  }
})

function drawLine(x1, y1, x2, y2) {  
  ctx.beginPath()
  ctx.moveTo(x1, x2)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = size * 2 // making line with the 
  ctx.stroke()
}

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fill()
}
