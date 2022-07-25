const boxes = document.querySelector('.boxes')
const colors = [
  "#76BA99",
  "#0096FF",
  "#FFF9CA",
  "#FFDEB4",
  "#FFB4B4",
  "#B2A4FF",
  "#513252",
  "#7A4069",
  "#CA4E79",
]

fillBox()

function fillBox() {
  for (let i = 0; i < 400; i++) {
    const newBox = document.createElement('div')
    newBox.className = 'box'
    boxes.appendChild(newBox)
    newBox.addEventListener('mouseenter', addColor(newBox))
    newBox.addEventListener('mouseleave', removeColor(newBox))
  }
}

function addColor(newBox) {
  newBox.style.backgroundColor = `${colors[0]}`
  console.log('in')
}

function removeColor(newBox) {
  newBox.style.backgroundColor = ``
  console.log('out')
}