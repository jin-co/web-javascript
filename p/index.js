const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
    console.log('e x: ', e.clientX, 'e y: ', e.clientY)    
    console.log('rec x: ', btn.getBoundingClientRect().x, 'rect y: ', btn.getBoundingClientRect().y)
    console.log('sub x', e.clientX - btn.getBoundingClientRect().x)
    console.log('sub y', e.clientY - btn.getBoundingClientRect().y)
})