const btnAdd = document.querySelector('.add')

btnAdd.addEventListener('click', () => addNote())

const notes = JSON.parse(localStorage.getItem('notes'))
if(notes) {
  console.log('stored notes: ', notes)
  notes.forEach(note => {
    addNote(note)
  });
}

function addNote(text = '') {
  const newNote = document.createElement('div')
  newNote.className = 'note'
  newNote.innerHTML = `
    <div class="note">
    <div class="tools">
      <i class="btn edit fas fa-edit"></i>
      <i class="btn delete fas fa-trash-alt"></i>
    </div>
    
    <textarea class="${text ? "": "hide"}"></textarea>
    <div class="main ${text ? "hide": ""}"></div>
  `
  document.body.appendChild(newNote)

  const btnDelete = newNote.querySelector('.delete')
  const btnEdit = newNote.querySelector('.edit')
  const main = newNote.querySelector('.main')
  const textarea = newNote.querySelector('textarea')

  textarea.value = text

  btnEdit.addEventListener('click', () => {
    main.classList.toggle('hide')
    textarea.classList.toggle('hide')
  })

  btnDelete.addEventListener('click', () => {
    newNote.remove()
    updateLS()
  })

  textarea.addEventListener('input', (e) => {
    main.textContent = e.target.value
    updateLS()
  })
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')
  const notes = []
  notesText.forEach(note => notes.push(note.value))
  localStorage.setItem('notes', JSON.stringify(notes))
}