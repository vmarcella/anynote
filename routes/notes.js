const express = require('express');
const router = express.Router();

const Note = require('../models/note')

router.post('/', (req, res) => {
    Note.create(req.body).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

router.put('/:noteId', (req, res) => {
    Note.findByIdAndUpdate(req.params.noteId, req.body).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

router.delete('/:noteId', (req, res) => {
    Note.findByIdAndRemove(req.params.noteId).then(note => {
        res.status(200).send(note);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})


module.exports = router;
