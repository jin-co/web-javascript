const inputTexts = document.querySelectorAll('.input-text')
const inputBoxes = document.querySelectorAll('.input-box')
const container = document.querySelector('.container')
const eachWords1 = document.querySelectorAll('.each-word1')
const eachWords2 = document.querySelectorAll('.each-word2')

inputBoxes.forEach((box, idx) => {
    box.addEventListener('focus', () => {
        if (idx == 0) {
            eachWords1.forEach((eachWord, idx) => {
                setTimeout(() => {
                    eachWord.style.transform = 'translateY(0)'
                    eachWord.style.color = 'red'    
                }, idx * 40);
            });
        }
        if (idx == 1) {
            eachWords2.forEach((eachWord, idx) => {
                setTimeout(() => {
                    eachWord.style.transform = 'translateY(0)'
                    eachWord.style.color = 'red'    
                }, idx * 40);
            });
        }
    })
});

inputBoxes.forEach(box => {
    box.addEventListener('focusout', () => {
        eachWords1.forEach((eachWord, idx) => {
            setTimeout(() => {
                eachWord.style.transform = 'translateY(100%)'
                eachWord.style.color = '#fff'    
            }, idx * 40);
        });
        eachWords2.forEach((eachWord, idx) => {
            setTimeout(() => {
                eachWord.style.transform = 'translateY(100%)'
                eachWord.style.color = '#fff'    
            }, idx * 40);
        });
    })
});


