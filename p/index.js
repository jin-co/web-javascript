const btnAdd = document.querySelector('.add')

btnAdd.addEventListener('click', () => addNote())

function addNote() {
  const newNote = document.createElement('div')
  newNote.className = 'note'
  newNote.innerHTML = `
    <div class="note">
    <div class="tools">
      <i class="btn fas fa-edit"></i>
      <i class="btn fas fa-trash-alt"></i>
    </div>
    <textarea></textarea>
    <div class="main hide"></div>
  `
  document.body.appendChild(newNote)
}

const notes = JSON.parse(localStorage.getItem('notes'))
if(notes) {
  notes.forEach(note => {
    addNote(note)
  });
}