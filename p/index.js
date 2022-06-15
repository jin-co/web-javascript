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
  btnsDelete = document.querySelectorAll(".delete");
  btnsDelete.forEach((e, idx) => {
    e.addEventListener("click", e.parentElement.parentElement.remove());
  });
}

function deleteNote(idx) {
  const notesEl = document.querySelectorAll(".note");
  console.log(notesEl);
  notesEl[idx].remove();
  // console.log(idx)
  // console.log(notes)
  // delete notes[idx]
  // notes.splice(idx, 1)
  // console.log(notes)
  // btnsDelete[idx].remove()
}
