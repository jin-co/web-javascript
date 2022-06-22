// const playBtn = document.querySelector('.btn-play')
// const goBox = document.querySelector('.go-box')
// const countBox = document.querySelector('.count-box')
// const nums = document.querySelectorAll('.num')

// playBtn.addEventListener('click', () => {
//   goBox.classList.add('hide')
//   countBox.classList.remove('hide')    
//   nums.forEach((num, idx) => {
//     setTimeout(() => {
//       num.classList.add('spin')      
//       if(idx >= nums.length - 1) resetCounter() 
//     }, 1000 * idx);   
//   });
// })

// function resetCounter() {
//   goBox.classList.remove('hide')
//   countBox.classList.add('hide')   
//   nums.forEach(num => {
//     num.classList.remove('spin')
//   });
// }

const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.querySelector('#replay');

runAnimation();

function runAnimation() {
    nums.forEach((num, idx) => {
        // console.log(num, idx)
        const nextToLast = nums.length - 1;

        num.addEventListener('animationend', (e) => {
            if (e.animationName === 'goIn' && idx !== nextToLast) {
                num.classList.remove('in');
                num.classList.add('out');
            } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                num.nextElementSibling.classList.add('in')
            } else {
                counter.classList.add('hide');
                finalMessage.classList.add('show');
            }
        })
    });
};

function resetDOM() {
    counter.classList.remove('hide');
    finalMessage.classList.remove('show');
    
    nums.forEach((num) => {
        num.classList.value = '';
    });

    nums[0].classList.add('in');
};

replay.addEventListener('click', () => {
    resetDOM();
    runAnimation();
})
