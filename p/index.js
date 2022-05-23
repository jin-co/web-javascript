const speedEl = document.querySelector('.speed')
const text = document.querySelector('.text')
const sentence = "what the fuck"
let speed = 1
speedEl.addEventListener('change', (e) => {
    speed = e.target.value
    console.log(speed)
})
runText()
function runText() {
    text.textContent = ""
    const sentenceArr = Array.from(sentence)
    console.log(sentenceArr)
    sentenceArr.forEach((w, idx) => {        
        setTimeout(() => {
            console.log(w)
            text.textContent += w                
            if(idx == sentence.length - 1) {
                setTimeout(() => {
                    text.textContent = ''
                }, speed * 1000 * idx)                
            }       
        }, speed * 1000 * idx);       
        console.log(idx, sentence.length)       

    });    
}