const img = document.querySelector("img");
const boxes = document.querySelectorAll(".box");

img.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("image", e.target.id);
  console.log(e);
});

boxes.forEach((b) => {
  b.addEventListener("dragover", (e) => {
    b.style.borderColor = 'red'
    e.preventDefault();
  });
});

boxes.forEach((b) => {
  b.addEventListener("dragleave", (e) => {
    console.log('leave')
    b.style.borderColor = 'black'  
  });
});

boxes.forEach((b) => {
  b.addEventListener("drop", (e) => {
    console.log("drop");
    e.preventDefault();
    var data = e.dataTransfer.getData("image");
    e.target.appendChild(document.getElementById(data));
  });
});
