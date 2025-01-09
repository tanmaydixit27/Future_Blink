const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const sendEmail = require("./utils/nodemailer");
const userRoutes = require("./routes/userRoutes");
// Load environment variables

dotenv.config();

// Check MONGO_URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("Error: MONGO_URI is not defined in the environment variables.");
  process.exit(1); // Exit the process with a failure code
}

// Initialize Express app
const app = express();

// Set up CORS to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow cookies to be sent with requests if needed
};

app.use(cors(corsOptions));  // Apply CORS middleware with the specific options

app.use(express.json()); // Parse JSON bodies

// Use the userRoutes for /api/users endpoint
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', userRoutes);

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const emailResponse = await sendEmail(to, subject, text, html);
    res.status(200).json({ message: "Email sent successfully", response: emailResponse });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
});

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with a failure code
  });
