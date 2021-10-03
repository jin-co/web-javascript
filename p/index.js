const letters = document.querySelectorAll('.input-control label')

letters.forEach(letter => {
    letter.innerHTML = letter.textContent.split('').map((span, idx) => 
    `<span style="transition-delay:${idx * 50}ms">${span}</span>`).join('')
});