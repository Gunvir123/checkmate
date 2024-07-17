const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const registerController = async (req, res) => {

    try {
        // console.log("hello");
        const email = req.body.email;
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            console.log(existingUser);
            return res.json({
                success: false,
                message: "user already exists"
            })

        }

        const newUser = new userModel(req.body);

        await newUser.save();

        // console.log(req.body);
        sendEmail(email);
        res.status(201).json({
            success: true,
            message: "new user created..",
            user: newUser
        })


    } catch (error) {
        console.log(error);
    }





}

const loginController = async (req, res) => {

    try {
        const email = req.body.email;

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.json({
                message: "User does not exists",
                success: false
            })
        }
        const password = req.body.password;
        //const username = req.body.username;

        if (existingUser.password != password) {
            return res.json({
                message: "Wrong credentials!",
                success: false
            })
        }

        const token = jwt.sign({ id: existingUser._id }, 'secretKey', { expiresIn: '1d' });
        return res.status(200).json({
            message: "login successfully",
            success: true,
            token: token,
            username: existingUser.username,
            id: existingUser._id,
            email: email

        })


        // return res.json({
        //     message: "user logged in successfully....",
        //     success: true
        // })

    } catch (error) {
        console.log(error);
    }

}


const updateUser = async (req, res) => {
    try {

        const id = req.params.id;
        console.log("id is ", id);
        let username = req.body.username;
        let email = req.body.email;
        // console.log(username);
        // console.log(email);
        let data = await userModel.updateOne({ _id: id }, { $set: { username: username, email: email } });
        data = await userModel.findOne({ _id: id });
        console.log(data);
        res.json({
            data: data,
            success: true,
            message: "data updated successfully"

        })
    } catch (error) {
        console.log(error);
    }
}


const sendEmail = () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",

        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "gsingh13_be21@thapar.edu",
            pass: "okncxbxjnikmyelb",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main(to) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '<gsingh13_be21@thapar.edu>', // sender address
            to, // list of receivers
            subject: "Welcome to CheckMate!", // Subject line
            //text: "Hello world?", // plain text body
            html: "<b>Thank you for registering with us ... Have fun on this platform ! Can't wait to see you there</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

module.exports = { registerController, loginController, updateUser }