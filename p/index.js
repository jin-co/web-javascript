const btnDecrease = document.querySelector(".btn-decrease");
const btnIncrease = document.querySelector(".btn-increase");
const size = document.querySelector(".btn-size");
const colorPicker = document.querySelector(".color-picker");
const canvas = document.querySelector(".canvas");

let sizeValue = 5;
let selectedColor = "";
let clicked = false;
let ctx = canvas.getContext("2d");
let x;
let y;

btnIncrease.addEventListener("click", () => {
  if (sizeValue < 50) sizeValue += 5;
  size.textContent = sizeValue;
});

btnDecrease.addEventListener("click", () => {
  if (sizeValue > 5) sizeValue -= 5;
  size.textContent = sizeValue;
});

canvas.addEventListener("mouseup", (e) => {
  clicked = false;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mousedown", (e) => {
  clicked = true;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  console.log(clicked);
  if (clicked) {
    let x2 = e.offsetX;
    let y2 = e.offsetY;
  
    // let x = e.clientX - canvas.getBoundingClientRect().top;
    // let y = e.clientY - canvas.getBoundingClientRect().left;
    
    draw(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

// canvas.addEventListener('click', () => clicked = !clicked)

function draw(x, y, x2, y2) {
  ctx.fillStyle = selectedColor;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // ctx.fillRect(0, 0, x, y)
}

colorPicker.addEventListener("change", (e) => {
  console.log("changed", e);
  console.log("color", e.target.value);
  selectedColor = e.target.value;
});
