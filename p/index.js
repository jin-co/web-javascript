const btnUp = document.querySelector(".cursor-up");
const btnDown = document.querySelector(".cursor-down");
const leftPanelEls = document.querySelectorAll(".box-left div");
const rightPanelEls = document.querySelectorAll(".box-right div");
let idx = 100

btnUp.addEventListener("click", () => {
  moveUp();
});

btnDown.addEventListener("click", () => {
  console.log("down");
  moveDown();
});

function moveDown() {
  console.log(leftPanelEls);
  console.log(idx)
  idx += 100
  if(idx >= 400) {
    idx = 0
  }
  for (let i = 0; i < leftPanelEls.length; i++) {    
    leftPanelEls[i].style.transform = `translateY(-${idx}%)`;
    rightPanelEls[i].style.transform = `translateY(${-(300 - idx)}%)`;
  }  
}

function moveUp() {
  console.log(idx)
  if(idx < 100) {
    idx = 400
  }
  idx -= 100
  for (let i = 0; i < leftPanelEls.length; i++) {    
    leftPanelEls[i].style.transform = `translateY(-${idx}%)`;
    rightPanelEls[i].style.transform = `translateY(${-(300 - idx)}%)`;
  }

}
