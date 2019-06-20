'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e){
        return []
    }
}

//Save the notes to localStoreage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');
    

    //Setup the note title text
    if(note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = "Unnamed note";
    }
    textEl.classList.add('list-item__title');
    noteEl.appendChild(textEl);

    //Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`);
    noteEl.classList.add('list-item');

    //Setup the status message
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    noteEl.appendChild(statusEl);
    
    return noteEl;
};

//Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a,b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a,b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byAlpha') {
        return notes.sort((a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesEl.innerHTML = '';

    if (!notes.length) {
        let greetParagraph = document.createElement('p');
        greetParagraph.innerText = `You have no notes. Click on "Create Note" to get started!`;
        greetParagraph.classList.add('empty-message');
        document.querySelector('#notes').appendChild(greetParagraph);

    } else {
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note);
            notesEl.appendChild(noteElement);
        });
    }

};

//Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;




/* const button = document.createElement('button');

    //Setup the remove note button
    button.textContent = 'x';
    noteEl.appendChild(button);
    button.addEventListener('click', () => {
        removeNote(note.id);
        saveNotes(notes);
        renderNotes(notes, filters);
    });*/