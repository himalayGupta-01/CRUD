import nodemailer from "nodemailer";
const sendMail = async (email,subject,text) => {
    console.log("Send Mail Called")
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "him9644622@gmail.com",
            pass: "hhcsudilwtyavmqr"
        }
    });

    let mailDetails = {
        from: "him9644622@gmail.com",
        to: email,
        subject: subject,
        text: text
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });

}

export default sendMail;