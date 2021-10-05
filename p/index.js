const labels = document.querySelectorAll('label')

labels.forEach(label => {
    label.innerHTML = label.textContent
    .split('')
    .map((letter, idx) => `<span style="transition-delay:${idx * 40}ms">${letter}</span>`)
    .join('')
});