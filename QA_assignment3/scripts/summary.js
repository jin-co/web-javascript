const summaryName = document.querySelector
const summaries = document.querySelectorAll('.summary')
const confirmBtn = document.querySelector('.btn-summary-confirm')

let tempData = {};
let dataList = []

tempData = JSON.parse(localStorage.getItem("tempData"));

createSummary();

console.log(tempData)

function createSummary() {
    summaries[0].innerHTML = tempData["first-name"] + " " + tempData["last-name"]
    summaries[1].innerHTML = tempData.address     
    summaries[2].innerHTML = tempData.city 
    summaries[3].innerHTML = tempData.province 
    summaries[4].innerHTML = tempData.postal
    summaries[5].innerHTML = tempData.phone 
    summaries[6].innerHTML = tempData.email 
    summaries[7].innerHTML = tempData.make
    summaries[8].innerHTML = tempData.model
    summaries[9].innerHTML = tempData.year
}

confirmBtn.addEventListener('click', () => {
    let storedData = localStorage.getItem("dataList")
    if (storedData !== null) {
        dataList = JSON.parse(storedData)
    }

    dataList.push(tempData)

    localStorage.setItem("dataList", JSON.stringify(dataList))

    window.location.href = '/pages/list.html'
})