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
                    <h1 class="section-title">${newSection.title}</h1>
                    <span class="buttons">
                        <button class="btn btn-primary" onclick="createNote('${newSection._id}')">New note</button>
                        <button class="btn btn-primary" onclick="renameSection('${newSection._id}')">Rename section</button>
                        <button class="btn btn-primary" onclick="deleteSection('${newSection._id}')">Delete section</button>
                    </span>
                </div>
                    
            ` + sections.innerHTML;

        }).catch(err => {
            console.log(err)
        })
    section.value = ''
}

function createNote(sectionId) {
    var section = document.getElementById(sectionId);
    
    axios.post('')
}

function renameSection(sectionId) {
    var section = document.getElementById(sectionId).childNodes[0];
    
    if (section.innerText.length == 0) {
        return;
    }

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
            section.parentNode.removeChild(section);
        })
        .catch(err => {
            console.log(err)
        })
}


