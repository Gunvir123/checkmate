const subjectModel = require("../models/subjectModel")
const attendanceModel = require("../models/attendanceModel")
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/userModel");
const userModel = require("../models/userModel");


const getSubjectsForAlerts = async (req, res) => {
    try {
        const id = req.params.id;
        //console.log("user id is", id);
        const user = await userModel.findOne({ _id: id });
        console.log('user details are', user);
        // Fetch all subjects
        const subjects = await subjectModel.find({ userId: id });

        // Array to store subjects with attendance statistics
        const subjectsWithAlerts = [];

        // Iterate through each subject
        for (const subject of subjects) {
            // Fetch attendance statistics for the current subject
            const presentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Present' });
            const absentCount = await attendanceModel.countDocuments({ subjectId: subject._id, status: 'Absent' });
            const totalClasses = presentCount + absentCount;
            const attendanceAchieved = presentCount / totalClasses * 100;
            if (attendanceAchieved < subject.criteria) {

                subjectsWithAlerts.push(subject);
            }


        }

        let email = user.email;
        for (subject of subjectsWithAlerts) {
            sendEmail(email, subject.subjectName);
        }

        // Send response with subjects array including attendance statistics
        return res.json({
            message: "Found subjects with alerts",
            success: true,
            subjects: subjectsWithAlerts
        });

    } catch (error) {
        console.error("Error fetching subjects with attendance statistics:", error);
        res.status(500).json({
            message: "Failed to fetch subjects with attendance statistics",
            success: false
        });
    }
}


const sendEmail = (to, subjectName) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",

        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "gsingh13_be21@thapar.edu",
            pass: "okncxbxjnikmyelb",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '<gsingh13_be21@thapar.edu>', // sender address
            to, // list of receivers
            subject: "Alert from Checkmate! ", // Subject line
            //text: "Hello world?", // plain text body
            html: `<b>Attendance got short in ${subjectName}Checkout the platform for more details`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

module.exports = { getSubjectsForAlerts }



