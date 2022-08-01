const cardContainer = document.querySelector('.card-container')

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPoke = async () => {
  for (let i = 1; i < 30; i++) {
    const res = await fetch(API_URL + `${i}`)
    const data = await res.json()
    createCards(data, i)
  }
}

fetchPoke()

function createCards(data, idx) {
  console.log(data)
  const {name, } = data  
  const newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `
    <img src="https://source.unsplash.com/random" alt="">
    <div class="text-box">
      <div class="number-box">
        <p class="number">#${idx}</p>
      </div>

      <div class="name">
        ${name}
      </div>

      <div class="type-box">
        <p>Type: <span class="type">a</span></p>
      </div>
    </div>
  `
  cardContainer.appendChild(newCard)
}
