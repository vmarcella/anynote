const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Note', {
    title: String,
    content: String,
    sectionId: {type: Schema.Types.ObjectId, ref:"Section"}
})
