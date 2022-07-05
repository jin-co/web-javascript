const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

let x
let y
let clicked = false

canvas.addEventListener('mouseup', (e) => {
  clicked = false
})

canvas.addEventListener('mousedown', (e) => {
  clicked = true
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mousemove', (e) => {
  if(clicked) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    x = x2
    y = y2
  }
})