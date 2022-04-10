let tempData = localStorage.getItem("tempData")
let summaryData = {}
if (tempData !== null) {
    summaryData = JSON.parse(tempData)
}

const summaryDays = document.querySelector('.summary-days')
const summaryPrice = document.querySelector('.summary-price')

showSummary()

function showSummary() {    
    summaryDays.innerHTML = `${(summaryData.day1 !== null) ? 'day1' : ''} ${(summaryData.day2 !== null) ? 'day2' : ''}`    
    summaryPrice.innerHTML = `$${summaryData.price}`
}