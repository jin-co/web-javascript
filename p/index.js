const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

const fetchPoke = async () => {
  const res = await fetch(API_URL)
  const data = await res.json()  
  return data
}

async function getPoke() {
  const res = await fetch(API_URL)
  const data = await res.json()  
  // console.log(data)
  return data
}

createCards() 

async function createCards() {
  console.log(fetchPoke().results)
  console.log(getPoke())
  // for (let i = 0; i < fetchPoke().results.length; i++) {
  //   console.log(i)

  // }
  const newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `
    <img src="https://source.unsplash.com/random" alt="">
    <div class="text-box">
      <div class="number-box">
        <p class="number">#001</p>
      </div>

      <div class="name">
        bu
      </div>

      <div class="type-box">
        <p>Type: <span class="type">a</span></p>
      </div>
    </div>
  `
}