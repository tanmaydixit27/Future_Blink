const Agenda = require("agenda");
const nodemailer = require("nodemailer");

const agenda = new Agenda({
    db: { address: process.env.MONGO_URI, collection: "agendaJobs"},
});

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

agenda.define("send email", async(job) =>{
    const { email, subject, body} = job.attrs.data;

    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: body,
        })
        console.log(`Email sent to ${email}`);
    }catch(error){
        console.error("Error sending email:", error.message);
    }
});

(async () =>{
    await agenda.start();
})();

module.exports = agenda;