const attendanceModel = require("../models/attendanceModel");
const subjectModel = require("../models/subjectModel");


const addSubjectController = async (req, res) => {


    try {

        const subjectCode = req.body.code;
        const subjectName = req.body.name;
        const criteria = req.body.criteria;
        const userId = req.body.userId;

        const newSubject = new subjectModel({ subjectCode, subjectName, criteria, userId })
        await newSubject.save();
        console.log(newSubject);

        // console.log(data);
        res.json({
            message: "subject added successfully",
            success: true,
            data: newSubject
        })

    } catch (error) {
        console.log(error);
        res.json({
            message: "some server error",
            success: false
        })
    }


}



const deleteSubjectController = async (req, res) => {
    const id = req.params.id;
    console.log('this is the object id ', id);
    await subjectModel.deleteOne({ _id: id })
    res.json(
        {
            "message": "subject deleted successfully",
            success: true
        }
    )

}





const updateSubjectController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const subjectCode = req.body.code;
        const subjectName = req.body.name;
        const criteria = req.body.criteria;

        const data = await subjectModel.updateOne({ _id: id }, { $set: { subjectCode: subjectCode, subjectName: subjectName, criteria: criteria } })

        res.json(
            {
                message: "subject details updated successfully",
                success: true
            }
        )
    } catch (error) {
        console.log(error);
        res.json({
            message: "some error updating details",
            success: false
        })
    }
}


const getAllSubjects = async (req, res) => {
    try {
        // Fetch all subjects
        const userId = req.params.id;
        const subjects = await subjectModel.find({ userId: userId });
        // Array to store subjects with attendance statistics
        const subjectsWithStats = [];

        // Iterate through each subject
        for (const subject of subjects) {
            // Fetch attendance statistics for the current subject
            const presentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Present' });
            const absentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Absent' });

            // Add attendance statistics to the subject object
            const subjectWithStats = {
                _id: subject._id,
                subjectCode: subject.subjectCode,
                subjectName: subject.subjectName,
                criteria: subject.criteria,
                presentCount,
                absentCount
                // Add other subject properties as needed
            };

            // Push the subject with attendance statistics to the array
            subjectsWithStats.push(subjectWithStats);
        }

        // Send response with subjects array including attendance statistics
        res.json({
            message: "Found subjects with attendance statistics",
            success: true,
            subjects: subjectsWithStats
        });
    } catch (error) {
        console.error("Error fetching subjects with attendance statistics:", error);
        res.status(500).json({
            message: "Failed to fetch subjects with attendance statistics",
            success: false
        });
    }
};



module.exports = { addSubjectController, deleteSubjectController, updateSubjectController, getAllSubjects }