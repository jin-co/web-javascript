const inputTexts = document.querySelectorAll('.input-text')
const inputBoxes = document.querySelectorAll('.input-box')
const container = document.querySelector('.container')
const eachWords = document.querySelectorAll('.each-word')

inputBoxes.forEach(box => {
    box.addEventListener('click', () => {
        eachWords.forEach((eachWord, idx) => {
            setTimeout(() => {
                eachWord.style.transform = 'translateY(0)'
                eachWord.style.color = 'red'    
            }, idx * 20);
        });

        // let words = box.previousElementSibling.textContent.split('')
        // console.log('words type: ', typeof(words))
        // console.log('words array? ', words)
        // words[0].style.transform = 'translateY(-20px)'
        // words.forEach((word, idx) => {
        //     console.log(word)
        //     setTimeout(() => {
        //         word.style.color = 'red'
        //         word.style.transform = 'translateY(-10px)'
        //     }, idx * 30);
        // });
        
        // inputTexts.forEach(text => {
        //     let words = text.textContent.split('')
        //     words.forEach(word => {
        //         console.log(word)
        //     });
        // });
    })
});


