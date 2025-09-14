import { createNote } from "./create.js";
import { getDate, getNotes, saveNotes } from "./utils.js";


window.addEventListener("DOMContentLoaded", () => {
  const notes = getNotes();
  notes.forEach(n =>
    createNote(n.title, n.desc, n.date, n.status, handleEdit, n.id)
  );
});



const dialog = document.querySelector("#dialog");
const closeBtn = document.querySelector("#close");
const cancelBtn = document.querySelector("#cancel");
const addNote1 = document.querySelector("#addNote1")
const addNote2 = document.querySelector("#addNote2")
const saveNote = document.querySelector("#saveNote")
const titleInput = document.querySelector("#dialog-mid-input")
const titleDesc = document.querySelector("#dialog-footer-input")

const openDialog = () => {
    dialog.style.display = "flex"
}

const closeDialog = () => {
    dialog.style.display = "none"
}



// CLOSING DIALOG BOX
closeBtn.addEventListener('click', closeDialog)
cancelBtn.addEventListener('click', closeDialog)

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        closeDialog();
    }
})




// SAVING NOTE

let editingNote = null;


saveNote.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const desc = titleDesc.value.trim();
    const date = getDate();


    if (!title || !desc) {
        alert("Title or Description is missing")
        return
    }

    let notes = getNotes();


    if (!editingNote) {

    const id = Date.now();
    const newNote = { id, title, desc, date, status: "pending" };
    notes.push(newNote);
    saveNotes(notes);
    createNote(title, desc, date, "pending", handleEdit, id);

  } else {

    // find and update in storage

    const id = parseInt(editingNote.header.closest("li").dataset.id);
    const note = notes.find(n => n.id === id);
    if (note) {
      note.title = title;
      note.desc = desc;
      note.date = date;
    }
    saveNotes(notes);

    editingNote.header.textContent = title;
    editingNote.footer.textContent = desc;
    editingNote.time.textContent = `Last Updated at: ${date}`;
    editingNote = null;
  }


    closeDialog();
    titleInput.value = ""
    titleDesc.value = ""

});




// OPNENING DIALOG BOX


addNote1.addEventListener("click", () => {

    editingNote = null;
    titleInput.value = "";
    titleDesc.value = "";

    openDialog();

});


addNote2.addEventListener("click", () => {

    editingNote = null;
    titleInput.value = "";
    titleDesc.value = "";

    openDialog();

});

function handleEdit(headerEl, footerEl, timeEl) {

    titleInput.value = headerEl.textContent;
    titleDesc.value = footerEl.textContent;
    editingNote = { header: headerEl, footer: footerEl, time: timeEl };

    openDialog();

}





