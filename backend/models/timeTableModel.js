const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    course:
    {
        type: mongoose.Types.ObjectId,
        ref: 'subjectModel'
    },
    startTime:
    {
        type: String
    },
    endTime:
    {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "userModel"
    }

});

const timetableModel = mongoose.model('timetableModel', timetableSchema);
module.exports = timetableModel;
