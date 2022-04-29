/*
Problems with XHR
- old 
- no streaming (the only way to check the value is after getting the whole data that was requested)
*/

const SHREG = document.querySelector('.xhr-eg')
// https://github.com/zen
let XHR = new XMLHttpRequest()
XHR.onreadystatechange = function() {
    if(XHR.readyState == 4) {
        if(XHR.status == 200) {
            SHREG.innerHTML = XHR.responseText            
        } else {
            SHREG.innerHTML = 'fail'
        }
    }     
}
XHR.open("GEt", "https://api.github.com/zen")
XHR.send()

// example 2: random dog picture
const getDog = document.querySelector('.get-dog')
const img = document.querySelector('.img')

getDog.addEventListener('click', () => {
    let XHR2 = new XMLHttpRequest()
    XHR2.onreadystatechange = function() {
        if(XHR2.readyState == 4 && XHR2.status == 200) {
            console.log(XHR2.responseText) // this is not an object but a string
            let data = JSON.parse(XHR2.responseText)
            console.log(data)
            img.src = data.message
        } else {
            console.log('fail')
        }
    } 
    XHR2.open("GET", "https://dog.ceo/api/breeds/image/random")
    XHR2.send()
})

// example 3 bit coin price
const getPrice = document.querySelector('.get-price')
const price = document.querySelector('.price')

getPrice.addEventListener('click', () => {
    let XHR2 = new XMLHttpRequest()
    XHR2.onreadystatechange = function() {
        if(XHR2.readyState == 4 && XHR2.status == 200) {
            console.log(XHR2.responseText) // this is not an object but a string
            let data = JSON.parse(XHR2.responseText)
            console.log(data)
            price.innerHTML = `${data.bpi.USD.rate_float} ${data.bpi.USD.code}` 
        } else {
            console.log('fail')
        }
    } 
    XHR2.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json")
    XHR2.send()
})

