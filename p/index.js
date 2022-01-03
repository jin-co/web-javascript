const nums = document.querySelectorAll('.num')

const increment = setInterval(() => {
    nums.forEach(num => {            
        if(num.innerHTML < +num.getAttribute('data-target')) {
            num.innerHTML = Math.floor(+num.innerHTML + (+num.getAttribute('data-target') / 20))
            if (num.innerHTML > +num.getAttribute('data-target')) {
                num.innerHTML = +num.getAttribute('data-target')
            }
        } else {
            clearInterval(increment)            
        }
    });    
}, 20);

