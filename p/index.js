const btnUp = document.querySelector(".cursor-up");
const btnDown = document.querySelector(".cursor-down");
const leftPanelEls = document.querySelectorAll(".box-left div");
const rightPanelEls = document.querySelectorAll(".box-right div");
btnUp.addEventListener("click", () => {
  console.log("up");
});
let idx = 100

btnDown.addEventListener("click", () => {
  console.log("down");
  moveDown();
});

function moveDown() {
  console.log(leftPanelEls);
  for (let i = 0; i < leftPanelEls.length; i++) {    
    leftPanelEls[i].style.transform = `translateY(-${idx}%)`;
    rightPanelEls[i].style.transform = "translateY(100%)";
  }
  idx += 100
}
