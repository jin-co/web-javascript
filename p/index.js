const btnAddNote = document.querySelector(".btn-add-note");
const body = document.querySelector("body");

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
  body.appendChild(newNote);
  
}
