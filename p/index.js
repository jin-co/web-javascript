const speedEl = document.querySelector(".speed");
const textEl = document.querySelector(".text");
const text = "what the fuck"
let speed = 300
let idx = 1
runText()

function runText() {
  textEl.textContent = text.slice(0, idx)
  idx++
  setTimeout(runText, speed)
  if(idx === text.length + 1) idx = 1
}

speedEl.addEventListener('change', (e) => {
  speed = 300 / e.target.value
  console.log(speed)
})