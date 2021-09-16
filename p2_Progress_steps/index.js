const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle'); // somehow getElementByClassname doesn't give me the index that i need

// index
let currentActive = 1;

next.addEventListener('click', () => {
    currentActive++
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update();
})

prev.addEventListener('click', () => {
    currentActive--
    if (currentActive < 1) {
        currentActive = 1;
    }
    update();
})

function update() {
    circles.forEach((circle, idx) => {
        if (idx < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');
    progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';

    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === circles.length) {
        next.disabled = true;
    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}

// let index = 1;

// next.addEventListener('click', () => {
//     index++;
//     if (index > circles.length) {
//         index = 4
//     }
//     circles.forEach(circle => {
//         circles[index - 1].classList.add('active');
//     });
//     update();
// })

// prev.addEventListener('click', () => {
//     index--;
//     if (index < 1) {
//         index = 1
//     }
//     circles.forEach(circle => {
//         circles[index].classList.remove('active');
//     });
//     update();
// })

// function update() {
//     if (index === 1) {
//         prev.disabled = true;
//     } else if (index === 4) {
//         next.disabled = true;
//     } else {
//         prev.disabled = false;
//         next.disabled = false;
//     }

//     line.style.width = `${300*((index - 1) /(circles.length - 1))}px`; 
//     console.log(index, circles.length)
// }



// const pre = document.querySelector('.pre')
// const next = document.querySelector('.next')
// const line = document.querySelector('.line')
// const nums = document.querySelectorAll('.num')

// let idx = 0
// next.addEventListener('click', () => {
//     idx++
//     if (idx > 3) {
//         idx = 0
//     }
//     toggleButton()
//     fillCircle()
//     // line.style.width = `${idx * (200 / 3)}px`
//     const actives = document.querySelectorAll('.active')
//     line.style.width = `${(actives.length - 1) / (nums.length - 1) * 100}%`
//     console.log(actives.length, nums.length)
// })

// pre.addEventListener('click', () => {
//     idx--
//     if (idx < 0) {
//         idx = 0
//     }
//     toggleButton()
//     fillCircle()
//     const actives = document.querySelectorAll('.active')
//     line.style.width = `${(actives.length - 1) / (nums.length - 1) * 100}%`
//     console.log(actives.length, nums.length)
// })

// function toggleButton() {
//     if (idx == 0) {
//         next.removeAttribute('disabled')
//         pre.setAttribute('disabled', true)
//     } else if (idx == 3) {
//         pre.removeAttribute('disabled')
//         next.setAttribute('disabled', true)
//     } else {
//         pre.removeAttribute('disabled')
//         next.removeAttribute('disabled')
//     }
// }

// function fillCircle() {
//     nums.forEach(num => {
//         num.classList.remove('active')
//     });
//     for (let i = 0; i <= idx; i++) {
//         nums[i].classList.add('active')
//     }
// }