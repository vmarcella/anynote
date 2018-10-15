const express = require('express');
const router = express.Router();

const Note = require('../models/note')

//Create a new note and return back json containing information about the newly created note.
router.post('/', (req, res) => {
    Note.create(req.body).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

//Update the note and then return JSON containg information about the updated note.
router.put('/:noteId', (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId, req.body).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

//Delete the note and then return JSON containing information about the deleted note.
router.delete('/:noteId', (req, res) => {
    Note.findByIdAndRemove(req.params.noteId).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})


module.exports = router;
