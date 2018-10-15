const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Section', {
    title: String,
    notes:[{type: Schema.Types.ObjectId, ref:"Note", default: []}]
})
