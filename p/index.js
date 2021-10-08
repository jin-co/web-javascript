const API = 'https://v2.jokeapi.dev/joke/Any'

const btn = document.querySelector('.btn')
const joke = document.querySelector('.joke')

getJoke()

btn.addEventListener('click', () => {
    getJoke()
})

// async function getJoke() {
//     const res = await fetch(API)
//     const data = await res.json()
//     joke.textContent = data.delivery
// }

let user = {
    name: 'j',
    tell: '123'
}

function getJoke() {
    fetch(API, {
        method: 'POST',
        headers: {
            Authentication: 'secret'
        },
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
        console.log(data, data.id)
    }).catch(error => {

    })
}

// https://javascript.info/fetch
// https://www.w3schools.com/js/js_api_fetch.asp