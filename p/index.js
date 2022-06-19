const btnAdd = document.querySelector('.add')

btnAdd.addEventListener('click', () => addNote())

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

  btnEdit.addEventListener('click', () => {
    main.classList.toggle('hide')
    textarea.classList.toggle('hide')
  })

  btnDelete.addEventListener('click', () => {
    newNote.remove()
    UpdateLS()
  })

  textarea.addEventListener('input', (e) => {
    main.textContent = e.target.value
    UpdateLS()
  })
}

let noteList = []
const notes = JSON.parse(localStorage.getItem('notes'))
if(notes) {
  notes.forEach(note => {
    addNote(note)
  });
}

function UpdateLS() {
  const createdNotes = document.querySelectorAll('.main')
  createdNotes.forEach(note => {
    noteList.push(note)
  });
  localStorage.setItem('notes', JSON.stringify(noteList))
}