const nums = document.querySelectorAll('.nums span')
const counter = document.querySelector('.counter')
const finalMessage = document.querySelector('.final')
const replay = document.querySelector('#replay')

runAnimation()

function runAnimation() {
  nums.forEach(num => {
    num.addEventListener('animationend', (e) => {
      console.log(e)
      if(e.animationName === 'goIn' && num.nextElementSibling) {
        num.classList.remove('in')
        num.classList.add('out')
        num.nextElementSibling.classList.add('in')
      } else {
        counter.classList.add('hide')
        finalMessage.classList.add('show')
      }
    })
  });
}

function resetDOM() {
  counter.classList.remove('hide')
  finalMessage.classList.remove('show')
  nums.forEach(num => {
    num.classList.remove('in')    
    num.classList.remove('out')    
  });
  nums[0].classList.add('in')
}

replay.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})
