const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach((note) => {
    addNote(note)
  })
}

const addBtn = document.querySelector('.add')

addBtn.addEventListener('click', () => {
  addNote()
})

function addNote(text = '') {
  const newNote = document.createElement('div')
  newNote.className = 'note'
  newNote.innerHTML = `
    <div class="tools">
      <i class="btn edit fas fa-edit"></i>
      <i class="btn delete fas fa-trash-alt"></i>
    </div>
    <textarea class="${text ? '' : 'hide'}" ></textarea>
    <div class="main ${text ? 'hide' : ''}"></div>
  `

  const editBtn = newNote.querySelector('.edit')
  const deleteBtn = newNote.querySelector('.delete')
  const main = newNote.querySelector('.main')
  const textarea = newNote.querySelector('textarea')

  textarea.value = text
  main.textContent = text

  document.body.appendChild(newNote)

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hide')
    textarea.classList.toggle('hide')
  })
  
  deleteBtn.addEventListener('click', () => {
    newNote.remove()
    updateLS() 
  })

  textarea.addEventListener('input', (e) => {
    main.textContent = e.target.value
    updateLS() 
  })
}

function updateLS() {
  const noteList = []
  const createdNotes = document.querySelectorAll('textarea')
  createdNotes.forEach(note => {
    noteList.push(note.value)
  });

  localStorage.setItem('notes', JSON.stringify(noteList))
}

