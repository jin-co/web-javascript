const inputTexts = document.querySelectorAll('.input-text')
const inputBoxes = document.querySelectorAll('.input-box')
const container = document.querySelector('.container')


inputBoxes.forEach(box => {
    box.addEventListener('click', () => {
        let words = box.previousElementSibling.textContent.split('')
        console.log(typeof(words))
        words.forEach((word, idx) => {
            console.log(word)
            setTimeout(() => {
                word.style.color = 'red'
                word.style.transform = 'translateY(-10px)'
            }, idx * 30);
        });
        
        // inputTexts.forEach(text => {
        //     let words = text.textContent.split('')
        //     words.forEach(word => {
        //         console.log(word)
        //     });
        // });
    })
});


