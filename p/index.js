const cups = document.querySelectorAll('.cup.small')

cups.forEach((cup, idx)=> {
    cup.addEventListener('click', () => {
        cup.classList.toggle('fill')
        autoFill(idx)
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