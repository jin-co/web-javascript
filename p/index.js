const speedEl = document.querySelector(".speed");
const textEl = document.querySelector(".text");
const text = "what the fuck";
let speed = 300;
let idx = 1
speedEl.addEventListener("change", (e) => {  
  speed = 300 / e.target.value
  console.log(speed)
});

writeText();
function writeText() {
    textEl.innerText = text.slice(0, idx);

    idx++;
    console.log(idx)

    if (idx > text.length) {
        idx = 1;
    }

    setTimeout(writeText, speed);
}
