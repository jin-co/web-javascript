const card = document.querySelector(".card");
const search = document.querySelector(".search");
const main = document.querySelector("main");
const URL = "https://api.github.com/users/";

search.addEventListener("keydown", (e) => {
  if (main.childNodes.length > 5) {
    main.removeChild(main.lastChild);
  }

  if (e.key === "Enter") {
    getData(e.target.value);
  }
});

async function getData(name) {
  const res = await fetch(URL + name);
  const data = await res.json();
  console.log(data.avatar_url);
  createCard(data);
}

async function createCard(data) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `    
    <div class="img-box">
      <img src="${data.avatar_url}" alt="${data.login} avatar" />
    </div>

    <div class="text-box">
      <h2 class="name">${data.name}</h2>
      <p class="text">
        ${data.bio}
      </p>
      <div class="following-box">
        <p>
          <span class="count count-follower">${data.followers}</span>
          a
        </p>
        <p>
          <span class="count count-following">${data.following}</span>
          a
        </p>
        <p>
          <span class="count count-repos">${data.public_repos}</span>
          a
        </p>
      </div>
      <div class="extra-box">
        <small class="tag">ah</small>
        <small class="tag">ah</small>
        <small class="tag">ah</small>
        <small class="tag">ah</small>
        <small class="tag">ah</small>
      </div>
    </div>  
    `;
  main.appendChild(card);
}
