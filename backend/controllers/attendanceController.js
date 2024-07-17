const attendanceModel = require("../models/attendanceModel");

const createAttendance = async (req, res) => {
    const date = req.body.date;
    const subjectId = req.body.subjectId;
    const status = req.body.status;


    const newAttendance = new attendanceModel({ date, subjectId, status })
    await newAttendance.save();
    console.log('created new attendance', newAttendance);

    res.json({
        message: "new attendance submitted",
        success: true
    })

}

const updateAttendance = async (req, res) => {
    const id = req.params.id;

    const updated_status = req.body.status;
    console.log('status received', updated_status);
    console.log('id received is', id);

    const data = await attendanceModel.updateOne({ _id: id }, { $set: { status: updated_status } });


    res.json({
        message: " attendance updated successfully",
        success: true,

    })
}

const getAttendance = async (req, res) => {
    const subjectId = req.params.id;
    //const userId = req.params.userId;
    const data = await attendanceModel.find({ subjectId: subjectId }).populate("subjectId");
    res.json(
        {
            message: "Found the attendance record",
            success: true,
            data: data
        }
    )
}

const deleteAttendance = async (req, res) => {
    const attendanceId = req.params.id;

    const data = await attendanceModel.deleteOne({ _id: attendanceId });
    res.json(
        {
            message: "Deleted attendance successfully",
            success: true,
            data: data
        }
    )
}



module.exports = { createAttendance, updateAttendance, getAttendance, deleteAttendance }