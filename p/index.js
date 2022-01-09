const cups = document.querySelectorAll('.cup.small')
const bigCup = document.querySelector('.cup.big .percent')
const br = document.querySelector('br')
const remainedGauge = document.querySelector('.remained-guage')

const MAX_CUP = 8

cups.forEach((cup, idx)=> {
    cup.addEventListener('click', () => {
        cup.classList.toggle('fill')
        autoFill(idx)
        updateBigCup(cup, idx)
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

function updateBigCup(cup, idx) {  
    console.log(idx)      
    if (cup.classList.contains('fill')) {
        let percent = ((idx + 1) / MAX_CUP) * 100
        bigCup.style.height = `${percent}%`
        bigCup.textContent = `${percent}%`
    } else {
        bigCup.style.height = 0
        bigCup.innerHTML = ''
    }

    if (idx >= 6) {
        br.classList.add('disappear')
    } else {
        br.classList.remove('disappear')        
    }

    if (idx >= 7) {
        remainedGauge.style.display = 'none'
    } else {
        remainedGauge.style.display = 'initial'
    }
}
