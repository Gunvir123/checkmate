const subjectModel = require("../models/subjectModel");
const timetableModel = require("../models/timeTableModel");
const attendanceModel = require("../models/attendanceModel");
const { getSubjectsForAlerts } = require("./alertController");

const getDashboardData = async (req, res) => {

    try {

        //no. of subjects
        const userId = req.params.id;
        const countOfSubjects = await subjectModel.find({ userId: userId }).countDocuments();
        console.log("subjects are", countOfSubjects);

        //no. of subjects which has alerts 
        let countOfAlerts = 0;
        const subjects = await subjectModel.find({ userId: userId });
        const subjectWithPercentange = [[]];
        for (const subject of subjects) {
            const presentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Present' });
            const absentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Absent' });
            const totalClasses = presentCount + absentCount;
            const attendanceAchieved = presentCount / totalClasses * 100;
            if (attendanceAchieved < subject.criteria) {

                countOfAlerts++;
            }

            subjectWithPercentange.push([subject.subjectName, attendanceAchieved]);


        }


        //no.of classes i have today
        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let today = new Date().getDay();
        let dayName = daysOfWeek[today];

        const countOfClasses = await timetableModel.find({ userId: userId, day: dayName }).countDocuments();


        //course vs attendance precentage // going to be a array of objects
        console.log(subjectWithPercentange);



        //time table of today classes

        const todaysTimeTable = await timetableModel.find({ userId: userId, day: dayName }).populate("course");
        console.log(todaysTimeTable);

        return res.json({
            message: "Founded data sucessfully",
            success: true,
            countOfSubjects: countOfSubjects,
            countOfAlerts: countOfAlerts,
            countOfClasses: countOfClasses,
            subjectWithPercentange: subjectWithPercentange,
            todaysTimeTable: todaysTimeTable
        })
    } catch (error) {
        console.log("error is ", error);
    }

}

module.exports = { getDashboardData }