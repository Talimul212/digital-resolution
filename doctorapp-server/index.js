const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    // collection list
    const userCollection = client.db("doctordb").collection("users");
    const doctorCollection = client.db("doctordb").collection("doctors");
    const appointmentCollection = client
      .db("doctordb")
      .collection("appointments");

    // 5.1 Authentication
    // Register API
    app.post("/api/auth/register", async (req, res) => {
      const { name, email, password, role } = req.body;

      const existingUser = await userCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword, role };
      const result = await userCollection.insertOne(newUser);
      res.status(201).json({ message: "User registered successfully" });
    });

    // Login API
    app.post("/api/auth/login", async (req, res) => {
      const { email, password } = req.body;

      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });

    // Logout API (Frontend should handle token removal)
    app.post("/api/auth/logout", (req, res) => {
      res.json({ message: "Logged out successfully" });
    });

    // 5.2 Patient Routes

    // Get list of available doctors
    app.post("/api/doctors", async (req, res) => {
      const doctors = await doctorCollection.find().toArray();
      res.status(200).json({
        message: "List of available doctors",
        data: doctors,
      });
    });
    app.get("/api/doctors", async (req, res) => {
      const doctors = await doctorCollection.find().toArray();
      res.status(200).json({
        message: "List of available doctors",
        data: doctors,
      });
    });

    // Book an appointment
    app.post("/api/appointments", async (req, res) => {
      const { doctorId, patientId, dateTime } = req.body;
      const newAppointment = {
        doctorId,
        patientId,
        dateTime,
        status: "booked",
      };

      const result = await appointmentCollection.insertOne(newAppointment);
      res.status(201).json({
        message: "Appointment booked successfully",
        appointment: result.ops[0],
      });
    });

    // View appointments
    app.get("/api/appointments", async (req, res) => {
      const { patientId } = req.query;
      const appointments = await appointmentCollection
        .find({ patientId: ObjectId(patientId) })
        .toArray();
      res.status(200).json({
        message: "List of appointments",
        data: appointments,
      });
    });

    // Cancel or reschedule an appointment
    app.put("/api/appointments/:id", async (req, res) => {
      const { id } = req.params;
      const { newDateTime, status } = req.body;

      const updateData = {};
      if (newDateTime) updateData.dateTime = newDateTime;
      if (status) updateData.status = status;

      const result = await appointmentCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updateData }
      );

      if (result.modifiedCount > 0) {
        res
          .status(200)
          .json({ message: `Appointment ${id} updated successfully` });
      } else {
        res.status(400).json({ message: "Appointment update failed" });
      }
    });

    // main route call
    app.get("/", (req, res) => {
      res.send("Doctors portal server is running");
    });
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => console.log(`Server running on port ${port}`));
