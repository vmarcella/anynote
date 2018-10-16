//express imports
const express = require('express');
const router = express.Router();

//model imports
const Section = require('../models/section')
const Note = require('../models/note')

//Create a new section and then return JSON back to the user containing the new section
router.post('/', (req, res) => {
    console.log(req.body)
    Section.create(req.body).then(section => {
        res.status(200).send(section)
    }).catch(err => {
        res.status(500).send('Cannot create sections at the moment, sorry!')
    })
})

//Update a section and then then return JSON back to the user containing the updated section
router.put('/:sectionId', (req, res) => {
    console.log(req.body)
    Section.findByIdAndUpdate(req.params.sectionId, req.body, {new: true}).then(section => {
        console.log(section.title)
        res.status(200).send(section);
    }).catch(err => {
        res.status(500).send('Cannot update sections at the moment, sorry!')
    })
})

//Delete a section and then return JSON back to the user containing the deleted section
router.delete('/:sectionId', (req, res) => {
    Section.findByIdAndRemove(req.params.sectionId).then(section => {
        Note.deleteMany({sectionId: section._id}).then(notes => {
            res.status(200).send(section);
        }).catch(err => {
            console.log(er)
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send('Cannot delete sections at the moment, sorry!')
    })
})

module.exports = router;
