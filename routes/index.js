const express = require('express');
const router = express.Router();

const Section = require('../models/section');
const Note = require('../models/note')

/* GET home page. */
router.get('/', function(req, res, next) {
    Section.find().populate('notes').then(sections => {      
            res.render('index', {title:'anynote', sections: sections})
            }).catch(err => {
                console.log(err)
            })
});



module.exports = router;
