//Creates a new section and then adds it into our display (Creates one on server side as well)
function createSection() {
    var section = document.getElementById('section')
    var sectionName = section.value;

    if (sectionName.length == 0) {
        section.placeholder = 'Enter a name plz!'
        return;
    }else {
        section.placeholder = '';
    }

    //Create section and then display it on the page
    axios.post('/sections', {title: sectionName}).then(response => {
        var sections = document.querySelector('.sections-display');
        var newSection = response.data;
        sections.innerHTML = `
        <div class="section-container">    
            <div class="section-card" id="${newSection._id}">
                <h1 class="section-title" contenteditable="true">${newSection.title}</h1>
                <span class="buttons">
                    <button class="btn btn-primary" onclick="createNote('${newSection._id}')">New note</button>
                    <button class="btn btn-primary" onclick="renameSection('${newSection._id}')">Rename section</button>
                    <button class="btn btn-primary" onclick="deleteSection('${newSection._id}')">Delete section</button>
                </span>
            </div>
            <div class="notes" id="notes-${newSection._id}">
            </div>
        </div>
        ` + sections.innerHTML;

    }).catch(err => {
        console.log(err)
    })
    section.value = ''
}

//Create a new note and then adds it into our display (Creates a new one on server side)
function createNote(sectionId) {
    var section = document.getElementById(sectionId);
    var title = 'untitled note'
    var date = new Date();
    
    var note = {
        title: title,
        content: '',
        date: date,
        sectionId: sectionId
    }
    
    //Create notes and then display it on the page
    axios.post('/notes', note).then(response => {
        var notes = document.getElementById(`notes-${sectionId}`);
        var newNote = response.data;
        notes.innerHTML = `
            <div class="note" id=${newNote._id}>
                <h3 class="note-title" contenteditable="true">${newNote.title}</h3>
                <span class="buttons">
                    <button class="btn btn-primary" onclick="editNote('${newNote._id}')">Edit note</button>
                    <button class="btn btn-primary" onclick="renameNote('${newNote._id}')">Rename note</button>
                    <button class="btn btn-primary" onclick="saveNote('${newNote._id}')">Save Note</button>
                    <button class="btn btn-primary" onclick="deleteNote('${newNote._id}')">Delete note</button>
                </span>
            </div>  
        ` + notes.innerHTML;
    }).catch(err => {
        console.log(err);
    })
}

//Rename the section after changing the text (Updates on server side as well)
function renameSection(sectionId) {
    var section = document.getElementById(sectionId).childNodes[0];

    axios.put(`/sections/${sectionId}`, {title: section.innerText}).then(response => {
        console.log(response);
    }).catch(err => {
       console.log(err);
    })
}


//Delete an entire section from the notes app (Deletes on the server side as well)
function deleteSection(sectionId) {
    var sectionTitle = document.getElementById(sectionId);
    var notes = document.getElementById(`notes-${sectionId}`)
   
    axios.delete(`/sections/${sectionId}`).then(response => {
        notes.parentNode.removeChild(notes);
        sectionTitle.parentNode.removeChild(sectionTitle);
            
    }).catch(err => {
        console.log(err);
    })
}

/*
    Note section
*/

//Retrieves more information about notes from our server and then updates the screen to display new
//information about the note
function editNote(noteId) {
    var note = document.getElementById(noteId);
    axios.get(`/notes/${noteId}`).then(response => {
        var retrievedNote = response.data;
        var notepad = document.getElementById('notepad');
        var workingOn = document.getElementById('working-on');
        var lastSaved = document.getElementById('last-save');
        var createdOn = document.getElementById('created-at');
    
        notepad.value = retrievedNote.content;
        note.classList.add('active-note');

        workingOn.innerText = 'Currently working on: ' + retrievedNote.title;
        lastSaved.innerText = 'Last saved on: ' + retrievedNote.updatedAt;
        createdOn.innerText = 'Created on: ' + retrievedNote.createdAt; 
    }).catch(err => {
        console.log(err);
    })

}

//Rename the note, update what you're working on, and then save the note. 
function renameNote(noteId){
    var note = document.getElementById(noteId);
    var title = document.querySelector('.note-title');

    axios.put(`/notes/${noteId}`, {title: title.innerText}).then(response => {
        var updatedNote = response.data;
        var workingOn = document.getElementById('working-on');
        
        workingOn.innerText = 'Currently working on: ' + title.innerText;
        saveNote(noteId);
    }).catch(err => {
        console.log(err)
    })
}

//Save the notes content to the server and then returns the saved note back
function saveNote(noteId){
    var note = document.getElementById(noteId);
    var notepad = document.getElementById('notepad');
    var date = new Date();

    var note = {
        content: notepad.value,
        updatedAt: date
    }

    axios.put(`/notes/${noteId}`, note).then(response => {
        var savedNote = response.data;
        var lastSaved = document.getElementById('last-save');
        lastSaved.innerText = 'Last saved on: ' + savedNote.updatedAt;
        
    }).catch(err => {
        console.log(err);
    })
}

//Deletes a note from the app and server and then removes it from the display.
function deleteNote(noteId){
    var note = document.getElementById(noteId);
    var notepad = document.getElementById('notepad');
    
    axios.delete(`/notes/${noteId}`).then(response => {
        var deletedNote = response.data;
        notepad.value = '';
        note.parentElement.removeChild(note);
    })
}
