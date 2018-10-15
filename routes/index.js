const express = require('express');
const router = express.Router();

const Section = require('../models/section');
const Note = require('../models/note')

/* GET home page. */
router.get('/', function(req, res, next) {
    Section.find().then(sections => {
        sectionsWithNotes = {}
   
        for (section in sections){
            sections[section].notes = []
            Note.find({sectionId: sections[section]._id}).then(notes => {
                sections[section].notes = notes;
                console.log(sections[section].notes)
            }).catch(err => {
                console.log(err);
            });
        }
             res.render('index', { title: 'anynote', sections: sections});
    }).catch(err => {
        console.log(error);
    });
});


module.exports = router;
