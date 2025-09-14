
import { getNotes, saveNotes } from "./utils.js";

const ul = document.querySelector('ul')

const createNote = (Header, Footer, Date, status, onEdit, id = Date.now()) => {

    // Creating Elements

    let li = document.createElement("li")
    li.dataset.id = id

    let note = document.createElement("div")
    note.id = "note"

    let checkbox = Object.assign(document.createElement("input"), {
        id: "checkbox",
        type: "checkbox"
    })

    let noteContent = Object.assign(document.createElement("div"), {
        id: "note-content",
    })

    let noteHeader = Object.assign(document.createElement('div'), {
        id: "note-header"
    })

    let noteFooter = Object.assign(document.createElement('div'), {
        id: "note-footer"
    })

    let noteEdit = Object.assign(document.createElement('div'), {
        id: "note-edit"
    })

    let pencilParent = Object.assign(document.createElement('div'), {
        id: "pencil-parent",
        className: "mini-btn"
    })

    let pencilSVG = Object.assign(document.createElement('img'), {
        src: "./assets/pencil.svg",
        className: "mini-btn-child",
        alt: "edit"
    })

    let dustbinParent = Object.assign(document.createElement('div'), {
        id: "dustbin-parent",
        className: "mini-btn"
    })

    let dustbinSVG = Object.assign(document.createElement('img'), {
        src: "./assets/dustbin.svg",
        className: "mini-btn-child",
        alt: "delete"
    })

    let noteParentFooter = Object.assign(document.createElement('div'), {
        id: "note-parent-footer"
    })

    let timeParent = Object.assign(document.createElement('div'), {
        id: "time-parent"
    })
    let statusParent = Object.assign(document.createElement('div'), {
        id: "status-parent"
    })



    // Build structure

    noteHeader.appendChild(document.createTextNode(Header))
    noteFooter.appendChild(document.createTextNode(Footer))
    noteContent.append(noteHeader, noteFooter)

    pencilParent.appendChild(pencilSVG)
    dustbinParent.appendChild(dustbinSVG)
    noteEdit.append(pencilParent, dustbinParent)

    note.append(checkbox, noteContent, noteEdit)

    timeParent.appendChild(document.createTextNode(`Last Updated at: ${Date}`))
    statusParent.appendChild(document.createTextNode(status))
    noteParentFooter.append(timeParent, statusParent)

    li.append(note, noteParentFooter)

    ul.prepend(li)




    // Checkbox Initialize

    checkbox.checked = status === "completed";
    if (checkbox.checked) {
        noteHeader.style.textDecoration = "line-through";
        noteFooter.style.textDecoration = "line-through";
    }
    
    // Set status color based on status
    statusParent.style.color = status === "completed" ? "lightgreen" : "red";



    // Checkbox change listner

    checkbox.addEventListener("change", () => {
        const done = checkbox.checked;
        statusParent.textContent = done ? "completed" : "pending";
        statusParent.style.color = done ? "lightgreen" : "red";
        noteHeader.style.textDecoration = done ? "line-through" : "none";
        noteFooter.style.textDecoration = done ? "line-through" : "none";


        const notes = getNotes();
        const note = notes.find(n => n.id === parseInt(li.dataset.id));
        if (note) {
            note.status = done ? "completed" : "pending";
            saveNotes(notes);
        }

    });



    // Delete


    dustbinParent.addEventListener("click", () => {
        li.remove();
        let notes = getNotes();
        notes = notes.filter(n => n.id !== parseInt(li.dataset.id));
        saveNotes(notes);
    });


    // Edit

    pencilParent.addEventListener("click", () => {
        if (typeof onEdit === "function") {
            onEdit(noteHeader, noteFooter, timeParent);
        }

    });





}


export { createNote }