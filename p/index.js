const btnDecrease = document.querySelector('.btn-decrease')
const btnIncrease = document.querySelector('.btn-increase')
const size = document.querySelector('.btn-size')
const canvas = document.querySelector('.canvas')

let sizeValue = 5

btnIncrease.addEventListener('click', () => {
  if(sizeValue < 50 )
  sizeValue += 5
  size.textContent = sizeValue
})

btnDecrease.addEventListener('click', () => {
  if(sizeValue > 5 )
  sizeValue -= 5
  size.textContent = sizeValue
})

canvas.addEventListener('click', (e) => {
  console.log(e.client.x, e.client.y)
  draw(e.target.x, e.target.y)
})

function draw(x, y) {
  let ctx = canvas.getContext("2d")
  ctx.moveTo(0, 0)
  ctx.lineTo(x, y)
  ctx.stroke()
}