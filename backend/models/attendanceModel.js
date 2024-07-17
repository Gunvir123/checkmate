const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({

    date: {
        type: Date
    },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjectModel'


    },

    status: {
        type: String //absent or present
    },




})

const attendanceModel = mongoose.model("attendanceModel", attendanceSchema);
module.exports = attendanceModel;