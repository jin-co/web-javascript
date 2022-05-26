const chkUpper = document.querySelector(".chk-upper");
const chkLower = document.querySelector(".chk-lower");
const chkNumber = document.querySelector(".chk-number");
const chkSymbol = document.querySelector(".chk-symbol");
const lengthEl = document.querySelector("#length");
const form = document.querySelector(".form");
const display = document.querySelector(".display");

let addUpper = false;
let addLower = false;
let addNumber = false;
let addSymbol = false;
let length = lengthEl.value;

let generatedPassword = "";
const upper = ["Z", "X", "C", "B", "N", "M", "H", "J", "K", "L", "U"];
const lower = ["q", "w", "e", "r", "t", "a", "s", "d", "f", "g"];
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbol = ["@", "#", "$", "%", "^", "&", "*", "(", "_"];

chkUpper.addEventListener("change", (e) => {
  addUpper = e.target.checked;
});

chkLower.addEventListener("change", (e) => {
  addLower = e.target.checked;
});

chkNumber.addEventListener("change", (e) => {
  addNumber = e.target.checked;
});

chkSymbol.addEventListener("change", (e) => {
  addSymbol = e.target.checked;
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
    console.log(generatedPassword);
  }
  display.value = generatedPassword;
}
