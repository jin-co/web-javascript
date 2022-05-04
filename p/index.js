const canvas = document.querySelector('.canvas')
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
})

canvas.addEventListener('mousemove', (e) => {
    if(clicked) {
        const x2 = e.offsetX
        const y2 = e.offsetY

        drawLine(x, y, x2, y2)
        console.log('h')

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