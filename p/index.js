const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
    console.log(e.target)
    console.log(btn.getBoundingClientRect())
})