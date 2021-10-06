// const applause = document.querySelector('.applause')
// const boo = document.querySelector('.boo')
// const gasp = document.querySelector('.gasp')
// const tada = document.querySelector('.tada')
// const victory = document.querySelector('.victory')
// const wrong = document.querySelector('.wrong')
const boxes = document.querySelectorAll('.box')


boxes.forEach(box => {
    box.addEventListener('click', () => {
        stopAudio()
        // console.log(box.firstChild)
        // console.log(box.childNodes)
        // console.log(box.children[0])
        // console.log(applause)
        box.children[0].play()
    })
});

function stopAudio() {
    boxes.forEach(box => {
        box.children[0].pause()
    });
}