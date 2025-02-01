const { EMAIL } = require("../config");
const transporter = require('../config/mail.config');
const path = require('path');
const ejs = require('ejs');


const sendMail = async (to, subject, html) => {
    try {
        const mail = {
            to, 
            subject,
            html,
            from: EMAIL.USER
        }

        await transporter.sendMail(mail);

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Something went wrong in sending the email", error);
    }
}

const sendConfirmationMail = async (to, subject, meetingLink, meetingDate, meetingTime, name) => {
    // 1. We will provide the template path
    const templatePath = path.join(__dirname, "../templates/mailer/confirmation.ejs");

    // 2. Read the file using ejs
    const data = await ejs.renderFile(templatePath, {
        name,
        meetingLink,
        meetingDate,
        meetingTime
    });

    // 3. Send the mail
    sendMail(to, subject, data);
}

module.exports = {
    sendMail,
    sendConfirmationMail
}