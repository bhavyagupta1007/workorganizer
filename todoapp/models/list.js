const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate: {
        type: Date,
        required: true
    }

})


const List = mongoose.model('List', ListSchema);

module.exports = List;