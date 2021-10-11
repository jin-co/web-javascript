const btn = document.querySelector('.btn')
const box = document.querySelector('.box')

window.addEventListener('keydown', (e) => {
    box.innerHTML = ''
    btn.style.display = 'none'
    console.log(e)

    const itemEl = document.createElement('div')
    itemEl.className = 'items'
    itemEl.innerHTML = `
    <div class="item">
            <small class="item-label">e.key</small>
            ${e.key}
        </div>
        <div class="item">
            <small class="item-label">e.code</small>
            ${e.code}
        </div>
        <div class="item">
            <small class="item-label">e.keyCode</small>
            ${e.keyCode}
    </div>
    `
    box.appendChild(itemEl)

})






