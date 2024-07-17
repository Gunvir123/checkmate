const timetableModel = require("../models/timeTableModel");

const createTimeTable = async (req, res) => {
    const { day, course, startTime, endTime, userId } = req.body;
    const timetable = new timetableModel({ day, course, startTime, endTime, userId });
    await timetable.save();
    res.json({
        message: "Time table created",
        success: true
    })
}

const getTimeTable = async (req, res) => {
    const id = req.params.id
    const data = await timetableModel.find({ userId: id }).populate("course");
    res.json({
        message: "Time table fetched successfully",
        success: true,
        data: data
    })
}

const updateTimeTable = async (req, res) => {
    const timeid = req.params.id;
    //const userId = req.body.userId;
    console.log(timeid);
    const { day, course, startTime, endTime } = req.body;
    const updatedData = await timetableModel.updateOne({ _id: timeid, }, { $set: { day: day, course: course, startTime: startTime, endTime: endTime } });
    res.json({
        message: "Time table updated successfully",
        success: true,
        data: updatedData
    })
}

const deleteTimeTable = async (req, res) => {
    const id = req.params.id
    console.log(id);
    await timetableModel.deleteOne({ _id: id });
    res.json({
        message: "Field deleted successfully",
        success: true
    })
}

module.exports = { createTimeTable, getTimeTable, deleteTimeTable, updateTimeTable }