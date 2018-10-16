//notes router

//express imports
const express = require('express');
const router = express.Router();

//model imports
const Section = require('../models/section')
const Note = require('../models/note')

//Create a new note and return back json containing information about the newly created note.
router.post('/', (req, res) => {
    //Validate that the content is less than 1000 characters
    if (req.body.content.length > 1000){
        return res.status(400).send('You are trying to save content longer than 1000 characters!')
    }

    Note.create(req.body).then(note => {
        Section.findByIdAndUpdate(note.sectionId, {$push: {notes: note}}).then(section => {
            res.status(200).send(note)
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

//Get a specific note and return back json containing information about it. (Used to display content)
router.get('/:noteId', (req, res) => {
    Note.findById(req.params.noteId).then(note => {
        res.status(200).send(note);
    })
})


//Update the note and then return JSON containg information about the updated note.
router.put('/:noteId', (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId, req.body, {new: true}).then(note => {
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
