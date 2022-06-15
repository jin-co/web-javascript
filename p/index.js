const btnAddNote = document.querySelector(".btn-add-note");
const body = document.querySelector("body");
const notes = [];
let btnsDelete;

btnAddNote.addEventListener("click", () => {
  console.log("clicked");
  addNote();
});

function addNote() {
  const newNote = document.createElement("div");
  newNote.className = "note";
  newNote.innerHTML = `
    <div class="control">
      <button class="edit btn">Edit</button>
      <button class="delete btn">Delete</button>
    </div>
    <textarea class="paper"></textarea>
  `;
  notes.push(newNote);
  body.appendChild(newNote);
  btnDelete = newNote.querySelector(".delete");
  btnEdit = newNote.querySelector(".edit");
  paper = newNote.querySelector(".paper");
  btnDelete.addEventListener('click', () => deleteNote(newNote))
  btnEdit.addEventListener('click', () => editNote(paper))
  
}

function deleteNote(El) {    
  El.remove();
}

function editNote(El) {    
  // El.dataset.readonly = 'readonly'
  if(El.getAttribute('readonly')) {
    El.removeAttribute("readonly")
    return
  } 
  El.setAttribute("readonly", 'true')
  console.log(El)
}
