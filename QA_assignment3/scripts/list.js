const container = document.querySelector('.container')
let dataList = [];
let carLink = 'http://www.jdpower.com/cars/'

const colors = [
    'rgba(182, 255, 206, .5)',
    'rgba(143, 189, 211, .5)',
    'rgba(253, 93, 93, .5)',
    'rgba(132, 121, 225, .5)'    
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
            <small class="col-12">${list.address}</small>
            <small class="col">${list.city}</small>
            <small class="col">${list.province}</small>
            <small class="col">${list.postal}</small>
          </div>
          <div class="row mt-3">            
            <a class="col summary-link" target="_blank" href="${carLink}${list.make}/${list.model}/${list.year}">${list.make} ${list.model} ${list.year}</a>       
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
