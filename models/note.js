//Note model
//Notes can be created, read, updated, and deleted by the user on the app.
//They contain a title, content, updatedAt, createdAt, and a sectionId tag.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Note', {
    title: String,
    content: String,
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    sectionId: {type: Schema.Types.ObjectId, ref:"Section"}
})
