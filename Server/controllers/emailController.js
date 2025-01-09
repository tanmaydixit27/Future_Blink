const EmailSequence = require("../models/EmailSequence");
const agenda = require("../agenda/emailJobs");

exports.createEmailSequence = async (req, res) => {
  const { email, subject, body, delay } = req.body;

  try {
    const emailSequence = new EmailSequence({ email, subject, body, delay });
    await emailSequence.save();

    // Schedule the email using Agenda
    await agenda.schedule(`${delay} seconds`, "send email", {
      email,
      subject,
      body,
    });

    res.status(201).json({ message: "Email sequence created successfully" });
  } catch (error) {
    console.error("Error creating email sequence:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
