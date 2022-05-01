const canvas = document.querySelector('#canvas')
const sizeEl = document.querySelector('#size')
const colorEl = document.querySelector('#color')

const ctx = canvas.getContext("2d")
let clicked = false
let x
let y

canvas.addEventListener('mousedown', (e) => {
  clicked = true 
  x = e.offsetX
  y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
  clicked = false
  console.log('ha') 
})

canvas.addEventListener('mousemove', (e) => {
  if(clicked) {
    const x2 = e.offsetX
    const y2 = e.offsetY
    console.log('hae') 
    drawLine(x, y, x2, y2)

    x = x2
    y = y2
  }
})

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}



// const canvas = document.querySelector('#canvas')
// const btnIncrease = document.querySelector('#increase')
// const btnDecrease = document.querySelector('#decrease')
// const sizeEl = document.querySelector('#size')
// const colorEl = document.querySelector('#color')
// const clearEl = document.querySelector('#clear')

// const ctx = canvas.getContext("2d")

// let size = +sizeEl.innerHTML
// let clicked = false
// let x
// let y
// canvas.addEventListener('mousedown', (e) => {
//   clicked = true

//   x = e.offsetX
//   y = e.offsetY

//   console.log('down')
// })

// canvas.addEventListener('mouseup', (e) => {
//   clicked = false
//   console.log('up')
// })

// canvas.addEventListener('mousemove', (e) => {
//   if(clicked) {
//     console.log('move')
//     const x2 = e.offsetX
//     const y2 = e.offsetY

//     drawLine(x, y, x2, y2)

//     x = x2
//     y = y2
//   }
// })

// function drawLine(x1, y1, x2, y2) {
//   ctx.beginPath()
//   ctx.moveTo(x1, y1)
//   ctx.lineTo(x2, y2)
//   ctx.lineWidth = size * 2
//   ctx.stroke()
// }