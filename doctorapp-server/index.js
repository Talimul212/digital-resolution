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

async function run() {
  try {
    // collection list
    const userCollection = client.db("doctordb").collection("users");
    const doctorCollection = client.db("doctordb").collection("doctors");
    const appointmentCollection = client
      .db("doctordb")
      .collection("appointments");

    // Register API
    app.post("/api/auth/register", async (req, res) => {
      const { name, email, password, role, specialty, location, availability } =
        req.body;

      try {
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { name, email, password: hashedPassword, role };

        // If role is doctor, store doctor details separately
        if (role === "doctor") {
          const doctorData = {
            name,
            email,
            specialty,
            location,
            availability,
            rating: 0,
            reviews: [],
          };
          await doctorCollection.insertOne(doctorData);
        }

        const result = await userCollection.insertOne(newUser);
        const insertedUser = { id: result.insertedId, name, email, role };

        // Generate JWT token
        const token = jwt.sign(
          { id: insertedUser.id, email: insertedUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(201).json({
          token,
          data: insertedUser,
          message: "User registered successfully",
        });
      } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
      }
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

    // Patient Routes
    app.get("/api/doctors", async (req, res) => {
      const doctors = await doctorCollection.find().toArray();
      res.status(200).json({
        message: "List of available doctors",
        data: doctors,
      });
    });

    // Book an appointment
    app.post("/api/appointments", async (req, res) => {
      try {
        const { doctorId, patientId, dateTime, contact, gender, address } =
          req.body;

        if (
          !doctorId ||
          !patientId ||
          !dateTime ||
          !contact ||
          !gender ||
          !address
        ) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const newAppointment = {
          doctorId,
          patientId,
          dateTime,
          contact,
          gender,
          address,
          status: "pending",
        };

        const result = await appointmentCollection.insertOne(newAppointment);
        const appointment = await appointmentCollection.findOne({
          _id: result.insertedId,
        });

        res.status(201).json({
          message: "Appointment booked successfully",
          appointment,
        });
      } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Error booking appointment" });
      }
    });

    // View appointments
    app.get("/api/appointments", async (req, res) => {
      try {
        const { patientId } = req.query;

        if (!patientId) {
          return res.status(400).json({ message: "Patient ID is required" });
        }

        const appointments = await appointmentCollection
          .find({ patientId })
          .toArray();

        if (appointments.length === 0) {
          return res.status(404).json({ message: "No appointments found" });
        }

        res.status(200).json({
          message: "List of appointments",
          data: appointments,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments" });
      }
    });

    // Cancel or reschedule
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

    // Admin Routes
    app.get("/api/users", async (req, res) => {
      try {
        const users = await userCollection.find().toArray();
        res.status(200).json({
          message: "List of all users",
          data: users,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
      }
    });

    // Admin: Delete doctor
    app.delete("/api/admin/doctors/:doctorId", async (req, res) => {
      try {
        const { doctorId } = req.params;

        if (!ObjectId.isValid(doctorId)) {
          return res.status(400).json({ message: "Invalid Doctor ID" });
        }

        const deletedDoctor = await doctorCollection.findOneAndDelete({
          _id: new ObjectId(doctorId),
        });

        if (!deletedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor deleted successfully" });
      } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

run();
