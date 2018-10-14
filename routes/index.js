const express = require('express');
const router = express.Router();

const Section = require('../models/section');
const Note = require('../models/note')

/* GET home page. */
router.get('/', function(req, res, next) {
    Section.find().then(sections => {
        sectionsWithNotes = {}
        console.log(sections)
        for (section in sections){
            sections[section].notes = []
            console.log(sections[section])
            Note.find({sectionId: sections[section]._id}).then(notes => {
                sections[section].notes = notes;
            }).catch(err => {
                console.log(err);
            });
        }
            console.log(sections)
             res.render('index', { title: 'anynote', sections: sections, notes: sections.notes});
    }).catch(err => {
        console.log(error);
    });
});

module.exports = router;
