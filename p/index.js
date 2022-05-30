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
    mixed[0] = upper
  } else {
    mixed[0] = ''
  }  
  console.log(mixed)
});

chkLower.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed[1] = lower
  } else {
    mixed[1] = ''
  }
  console.log(mixed)
});

chkNumber.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed[2] = number
  } else {
    mixed[2] = ''
  }
  console.log(mixed)
});

chkSymbol.addEventListener("change", (e) => {
  if(e.target.checked) {
    mixed[3] = symbol
  } else {
    mixed[3] = ''
  }
  console.log(mixed)
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("e");
  createPassword();
});

function createPassword() {  
  const merged = [...mixed[0], ...mixed[1], ...mixed[2], ...mixed[3]]
  generatedPassword = "";

  console.log('merged: ', merged)

  if (merged !== '') {
    for (let i = 0; i < length; i++) {
      generatedPassword += merged[Math.floor(Math.random() * merged.length)];
      // generatedPassword += upper[Math.floor(Math.random() * upper.length)];
      console.log(generatedPassword);
    }  
  } else {
    for (let i = 0; i < length; i++) {
      generatedPassword += Math.floor(Math.random() * 10);
      // generatedPassword += upper[Math.floor(Math.random() * upper.length)];
      console.log(generatedPassword);
    }
  }  
  display.value = generatedPassword;
}
