const playBtn = document.querySelector('.btn-play')
const goBox = document.querySelector('.go-box')
const countBox = document.querySelector('.count-box')
const nums = document.querySelectorAll('.num')

playBtn.addEventListener('click', () => {
  goBox.classList.add('hide')
  countBox.classList.remove('hide')    
  nums.forEach((num, idx) => {
    setTimeout(() => {
      num.classList.add('spin')      
      if(idx >= nums.length - 1) resetCounter() 
    }, 1000 * idx);   
  });
})

function resetCounter() {
  goBox.classList.remove('hide')
  countBox.classList.add('hide')   
  nums.forEach(num => {
    num.classList.remove('spin')
  });
}