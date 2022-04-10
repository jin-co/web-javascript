let tempData = localStorage.getItem("tempData")
let summaryData = {}
if (tempData !== null) {
    summaryData = JSON.parse(tempData)
}

const summaryDays = document.querySelector('.summary-days')
const summaryPrice = document.querySelector('.summary-price')

showSummary()

function showSummary() {
    console.log(tempData)
    summaryDays.innerHTML = `${tempData.days}`
    summaryPrice.innerHTML = `${2}`
}