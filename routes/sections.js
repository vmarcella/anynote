const express = require('express');
const router = express.Router();

const Section = require('../models/section')

router.post('/', (req, res) => {
    Section.create(req.body).then(section => {
        res.status(200).send(section)
    }).catch(err => {
        res.status(500).send('Cannot create sections at the moment, sorry!')
    })
})

router.put('/:sectionId', (req, res) => {
    Section.findByIdAndUpdate(req.params.sectionId, req.body).then(section => {
        res.status(200).send(section);
    }).catch(err => {
        res.status(500).send('Cannot update sections at the moment, sorry!')
    })
})

router.delete('/:sectionId', (req, res) => {
    Section.findByIdAndRemove(req.params.sectionId).then(section => {
        res.status(200).send()
    }).catch(err => {
        console.log(err);
        res.status(500).send('Cannot delete sections at the moment, sorry!')
    })
})

module.exports = router;
