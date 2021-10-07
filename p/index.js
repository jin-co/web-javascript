const API = 'https://v2.jokeapi.dev/joke/Any'

const btn = document.querySelector('.btn')
const joke = document.querySelector('.joke')

btn.addEventListener('click', () => {
    getJoke()
})

async function getJoke() {
    const res = await fetch(API)
    const data = await res.json()
    joke.textContent = data.delivery
    console.log(data)
    console.log(data.id)


}