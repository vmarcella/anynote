//Section model
//Sections are used to categorize notes. They have two attributes,
//title and notes, which is a list of note object ids.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Section', {
    title: String,
    notes:[{type: Schema.Types.ObjectId, ref:"Note", default: []}]
})
