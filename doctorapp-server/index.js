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
      const { name, email, password, role, specialty, location, availability } =
        req.body;
      console.log(email);

      try {
        // Check if user already exists
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = { name, email, password: hashedPassword, role };

        let insertedUser;

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

          const doctorCollection = client.db("doctordb").collection("doctors");
          await doctorCollection.insertOne(doctorData);
        }

        const result = await userCollection.insertOne(newUser);
        insertedUser = { id: result.insertedId, name, email, role };

        // Generate JWT token
        const token = jwt.sign(
          { id: insertedUser.id, email: insertedUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Send response
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

    // Logout API (Frontend should handle token removal)
    app.post("/api/auth/logout", (req, res) => {
      res.json({ message: "Logged out successfully" });
    });

    // 5.2 Patient Routes

    // Get list of available doctors

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

      try {
        const result = await appointmentCollection.insertOne(newAppointment);

        const appointment = await appointmentCollection.findOne({
          _id: result.insertedId,
        });

        res.status(201).json({
          message: "Appointment booked successfully",
          appointment,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error booking appointment" });
      }
    });

    // View appointments
    app.get("/api/appointments", async (req, res) => {
      try {
        const { patientId } = req.query;
        console.log(patientId);

        if (!patientId) {
          return res.status(400).json({ message: "Patient ID is required" });
        }

        const appointments = await appointmentCollection
          .find({ patientId: new ObjectId(patientId) })
          .toArray();

        console.log(appointments);
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

    // 5.3 Doctors Routes
    app.get("/api/appointments", async (req, res) => {
      const { doctorId } = req.query; // The doctor's ID will be passed as a query parameter

      if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required" });
      }

      try {
        const appointments = await appointmentCollection
          .find({ doctorId: new ObjectId(doctorId) }) // Assuming doctorId is stored in the appointment
          .toArray();

        res.status(200).json({
          message: "List of appointments",
          data: appointments,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching appointments" });
      }
    });
    // / Approve or reject
    app.put("/api/appointments/:id/status", async (req, res) => {
      const { id } = req.params; // The appointment ID passed as a parameter
      const { status } = req.body; // The status to update (approve or reject)

      if (!status || !["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      try {
        const updatedAppointment = await appointmentCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { status } },
          { returnDocument: "after" } // Return the updated appointment
        );

        if (!updatedAppointment.value) {
          return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
          message: "Appointment status updated successfully",
          appointment: updatedAppointment.value,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating appointment status" });
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
    app.get("/api/reports", async (req, res) => {
      try {
        const userCount = await userCollection.countDocuments();
        const appointmentCount = await appointmentCollection.countDocuments();
        const doctorCount = await userCollection.countDocuments({
          role: "doctor",
        });

        const analytics = {
          totalUsers: userCount,
          totalAppointments: appointmentCount,
          totalDoctors: doctorCount,
        };

        res.status(200).json({
          message: "System Analytics",
          data: analytics,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching system analytics" });
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
