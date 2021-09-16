const pre = document.querySelector('.pre')
const next = document.querySelector('.next')
const line = document.querySelector('.line')
const nums = document.querySelectorAll('.num')

let idx = 0
next.addEventListener('click', () => {
    idx++
    if (idx > 3) {
        idx = 0
    }
    toggleButton()
    fillCircle()
    // line.style.width = `${idx * (200 / 3)}px`
    const actives = document.querySelectorAll('.active')
    line.style.width = `${(actives.length - 1) / (nums.length - 1) * 100}%`
    console.log(actives.length, nums.length)
})

pre.addEventListener('click', () => {
    idx--
    if (idx < 0) {
        idx = 0
    }
    toggleButton()
    fillCircle()
    const actives = document.querySelectorAll('.active')
    line.style.width = `${(actives.length - 1) / (nums.length - 1) * 100}%`
    console.log(actives.length, nums.length)
})

function toggleButton() {
    if (idx == 0) {
        next.removeAttribute('disabled')
        pre.setAttribute('disabled', true)
    } else if (idx == 3) {
        pre.removeAttribute('disabled')
        next.setAttribute('disabled', true)
    } else {
        pre.removeAttribute('disabled')
        next.removeAttribute('disabled')
    }
}

function fillCircle() {
    nums.forEach(num => {
        num.classList.remove('active')
    });
    for (let i = 0; i <= idx; i++) {
        nums[i].classList.add('active')
    }
}