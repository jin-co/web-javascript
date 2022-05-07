let url = "https://pokeapi.co/api/v2/pokemon/1";

async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.name);
}

function fetchDataAgain() {
  fetch(url)
    .then((data) => data.json())
    .then((da) => {
      console.log("fetch two 2", da.name);
    });
}

fetchData();
fetchDataAgain();
