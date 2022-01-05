const cups = document.querySelectorAll('.cup.small')
const bigCup = document.querySelector('.cup.big .percent')
const MAX_CUP = 8

cups.forEach((cup, idx)=> {
    cup.addEventListener('click', () => {
        cup.classList.toggle('fill')
        autoFill(idx)
        updateBigCup(idx)
    })
});

function autoFill(selectedIndex) {
    cups.forEach((cup, idx) => {
        if (idx < selectedIndex) {
            cup.classList.add('fill')
        } else if (idx > selectedIndex) {
            cup.classList.remove('fill')
        }
    });
}

function updateBigCup(idx) {  
    console.log(idx)      
    let percent = ((idx + 1) / MAX_CUP) * 100
    bigCup.style.height = `${percent}%`
    bigCup.textContent = `${percent}%`
}