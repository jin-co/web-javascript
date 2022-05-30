const chkUpper = document.querySelector(".chk-upper");
const chkLower = document.querySelector(".chk-lower");
const chkNumber = document.querySelector(".chk-number");
const chkSymbol = document.querySelector(".chk-symbol");
const checkBoxesEls = document.querySelectorAll(".field input[type='checkbox']")

const lengthEl = document.querySelector("#length");
const form = document.querySelector(".form");
const display = document.querySelector(".display");

// let addUpper = false;
// let addLower = false;
// let addNumber = false;
// let addSymbol = false;
let length = lengthEl.value;

let generatedPassword = "";
const upper = ["Z", "X", "C", "B", "N", "M", "H", "J", "K", "L", "U"];
const lower = ["q", "w", "e", "r", "t", "a", "s", "d", "f", "g", "i"];
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbol = ["@", "#", "$", "%", "^", "&", "*", "(", "_", "+"];
let mixed = []

// checks = [false, false, false, false]
// checkBoxesEls.forEach((chk, idx) => {
//     chk.addEventListener('change', (e) => {
//         console.log(idx)
//         checks[idx] = e.target.checked
//         console.log(checks)
//     })
// });
chkUpper.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed.push(upper)
  }
  console.log(mixed)

});

chkLower.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed.push(lower)
  }
  console.log(mixed)
});

chkNumber.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed.push(number)
  }
  console.log(mixed)
});

chkSymbol.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed.push(symbol)
  }
  console.log(mixed)
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("e");
  createPassword();
});

function createPassword() {  
  generatedPassword = "";
  for (let i = 0; i < length; i++) {
    generatedPassword += Math.floor(Math.random() * length);
    // generatedPassword += upper[Math.floor(Math.random() * upper.length)];
    console.log(generatedPassword);
  }
  display.value = generatedPassword;
}
