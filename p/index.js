const numTwitter = document.querySelector('.num-twitter')
const numYoutube = document.querySelector('.num-youtube')
const numFacebook = document.querySelector('.num-facebook')

const TWITTER_MAX = 12000
const YOUTUBE_MAX = 5000
const FACEBOOK_MAX = 7500

const test = document.querySelector('.test')

setTimeout(() => {
    numTwitter.textContent = numTwitter.textContent ++
    console.log('h')
}, 100)

let increment = setInterval(() => {    
    if (test.value < +test.max - 1) {
        test.value = +test.value + 10
        console.log(test.value++, +test.max)
    } else {
        clearInterval(increment)
    }
    console.log(test.value++, test.max)    
}, 1)