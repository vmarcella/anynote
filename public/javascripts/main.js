function createSection() {
    var section = document.getElementById('section')
    var sectionName = section.value;

    if (sectionName.length == 0) {
        section.placeholder = 'Enter a name plz!'
        return;
    }else {
        section.placeholder = '';
    }

    axios.post('/sections', {title: sectionName})
        .then(response => {
            console.log(response)
            var sections = document.querySelector('.sections-display');
            var newSection = response.data;
            sections.innerHTML = `
                <div class="section-card" id="${newSection._id}">
                    <h1 class="section-title" contenteditable="true">${newSection.title}</h1>
                    <span class="buttons">
                        <button class="btn btn-primary" onclick="createNote('${newSection._id}')">New note</button>
                        <button class="btn btn-primary" onclick="renameSection('${newSection._id}')">Rename section</button>
                        <button class="btn btn-primary" onclick="deleteSection('${newSection._id}')">Delete section</button>
                    </span>
                </div>
                <div class="notes" id="${newSection._id}">
                </div>
                    
            ` + sections.innerHTML;

        }).catch(err => {
            console.log(err)
        })
    section.value = ''
}

function createNote(sectionId) {
    var section = document.getElementById(sectionId);
    var title = 'untitled note'
    axios.post('/notes', {title: title, content:'', sectionId: sectionId})
        .then(response => {
            var notes = document.querySelector(`.notes[id='${sectionId}']`);
            var newNote = response.data;
  
            notes.innerHTML = `
                <div class="note" id=${newNote._id}>
                    <h3 class="note-title" contenteditable="true">${newNote.title}</h3>
                    <span class="buttons">
                        <button class="btn btn-primary" onclick="editNote('${newNote._id}')">Edit note</button>
                        <button class="btn btn-primary" onclick="renameNote('${newNote._id}')">Rename note</button>
                        <button class="btn btn-primary" onclick="deleteNote('${newNote._id}')">Delete note</button>
                    </span>
                </div>  
            ` + notes.innerHTML;
        }).catch(err => {
            console.log(err);
        })
}

function renameSection(sectionId) {
    var section = document.getElementById(sectionId).childNodes[0];

    axios.put(`/sections/${sectionId}`, {title: section.innerText})
        .then(response => {
            console.log(response);
        }).catch(err => {
           console.log(err);
        })
}



function deleteSection(sectionId) {
    var sectionTitle = document.getElementById(sectionId);

    axios.delete(`/sections/${sectionId}`)
        .then(response => {
            sectionTitle.parentNode.removeChild(sectionTitle);
        })
        .catch(err => {
            console.log(err)
        })
}


