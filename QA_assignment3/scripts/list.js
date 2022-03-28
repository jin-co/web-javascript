const container = document.querySelector('.container')
let dataList = [];
const colors = [
    'rgba(182, 255, 206, .7)',
    'rgba(143, 189, 211, .7)',
    'rgba(253, 93, 93, .7)',
    'rgba(132, 121, 225, .7)'    
]
let colorIndex = colors.length - 1 

let storedData = localStorage.getItem("dataList");
if (storedData !== null) {
  dataList = JSON.parse(storedData);
}

console.log(dataList)
createList()

function createList() {
    dataList.forEach(list => {
        let cardEl = document.createElement('div')
        cardEl.className = 'summary-card'
        cardEl.innerHTML = `
        <h3>${list["first-name"]} ${list["last-name"]}
        <hr/>
        </h3>
          <div class="row">
            <p class="col">${list.email}</p>
            <p class="col">${list.phone}</p>
          </div>
          <div class="row">
            <p class="col">${list.address}</p>
            <p class="col">${list.city}</p>
            <p class="col">${list.province}</p>
            <p class="col">${list.postal}</p>
          </div>
          <div class="row">
            <p class="col">${list.make}</p>
            <p class="col">${list.model}</p>
            <p class="col">${list.year}</p>            
          </div>        
        `
        cardEl.style.backgroundColor = `${colors[colorIndex]}`
        
        colorIndex--
        if(colorIndex < 0) {
            colorIndex = colors.length -1
        }
        container.appendChild(cardEl)

    });
}
