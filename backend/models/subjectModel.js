const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({

    subjectCode: {
        type: String,

    },

    subjectName: {
        type: String,
        required: true

    },

    criteria: {
        type: Number,
        required: true,

    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    }


})

const subjectModel = mongoose.model("subjectModel", subjectSchema);
module.exports = subjectModel;