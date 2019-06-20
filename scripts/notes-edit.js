'use strict'

const titleElement = document.querySelector('#note-title')
const updatedElement = document.querySelector('#updated')
const bodyElement = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

let notes = getSavedNotes()

let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

titleElement.value = note.title
updatedElement.textContent = generateLastEdited(note.updatedAt)
bodyElement.value = note.body

titleElement.addEventListener('input', (e) => {
   note.title = e.target.value
   note.updatedAt = moment().valueOf()
   updatedElement.textContent = generateLastEdited(note.updatedAt)
   saveNotes(notes)
})

bodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    updatedElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

removeButton.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
   if (e.key === 'notes') {
       notes = JSON.parse(e.newValue)
       note = notes.find((note) => note.id === noteId)

       if (!note) {
           location.assign('/index.html')
       }
       titleElement.value = note.title
       bodyElement.value = note.body
        note.updatedAt = moment().valueOf()
        updatedElement.textContent = generateLastEdited(note.updatedAt)

   }
})