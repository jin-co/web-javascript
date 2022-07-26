const boxes = document.querySelector('.boxes')
const colors = [
  '#76BA99',
  '#0096FF',
  '#FFF9CA',
  '#FFDEB4',
  '#FFB4B4',
  '#B2A4FF',
  '#513252',
  '#7A4069',
  '#CA4E79',
]

let idx = 0

fillBox()

function fillBox() {
  for (let i = 0; i < 400; i++) {
    const newBox = document.createElement('div')
    newBox.className = 'box'
    boxes.appendChild(newBox)
    newBox.addEventListener('mouseenter', () => addColor(newBox))
    newBox.addEventListener('mouseleave', () => removeColor(newBox))
  }
}

function addColor(newBox) {
  idx++
  if (idx > colors.length - 1) idx = 0
  newBox.style.backgroundColor = `${colors[idx]}`
  newBox.style.boxShadow = `0 0 2px ${colors[idx]}, 0 0 10px ${colors[idx]}`
  console.log('in')
}

function removeColor(newBox) {
  setTimeout(() => {
    newBox.style.backgroundColor = ``
  }, 200)
  console.log('out')
}
