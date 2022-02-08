const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')

let secondNeedle = 0;
let minuteNeedle = 0;
let hourNeedle = 0;

setInterval(() => {
    second.style.transform = `rotate(${secondNeedle}deg)`
    secondNeedle++       
}, 1000)

setInterval(() => {
    minute.style.transform = `rotate(${minuteNeedle}deg)`
    minuteNeedle++       
}, 60000)

setInterval(() => {
    hour.style.transform = `rotate(${hourNeedle}deg)`
    hourNeedle++       
}, 3600000)