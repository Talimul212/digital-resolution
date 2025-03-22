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
      console.log(email);

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
    app.get("/api/doctors/:doctorId", async (req, res) => {
      const { doctorId } = req.params;
      console.log("Requested Doctor ID:", doctorId);

      try {
        let doctor;

        // Try fetching doctor by _id
        if (ObjectId.isValid(doctorId)) {
          doctor = await doctorCollection.findOne({
            _id: new ObjectId(doctorId),
          });
        }

        // If not found by _id, try fetching by userID
        if (!doctor) {
          doctor = await doctorCollection.findOne({ userID: doctorId });
        }

        if (!doctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({
          message: "Doctor details fetched successfully",
          data: doctor,
        });
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        res.status(500).json({ message: "Internal server error" });
      }
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

    //Doctor
    app.post("/api/doctor/registration", async (req, res) => {
      try {
        const {
          userID,
          name,
          specialty,
          location,
          availability,
          rating,
          registrations,
          contact,
          gender,
          address,
        } = req.body;

        // Validate required fields
        if (
          !userID ||
          !name ||
          !specialty ||
          !location ||
          !availability ||
          !registrations
        ) {
          return res
            .status(400)
            .json({ message: "All required fields must be provided" });
        }

        // Construct the new doctor object
        const newDoctor = {
          userID,
          name,
          specialty,
          location,
          availability, // Expected as an array of ISO date strings
          rating: rating || 0, // Default rating if not provided
          reviews: [], // Default empty reviews array
          registrations, // Registration status
          contact,
          gender,
          address,
          createdAt: new Date(), // Store creation timestamp
        };

        // Insert the new doctor record into the collection
        const result = await doctorCollection.insertOne(newDoctor);

        // Fetch the inserted doctor to return complete data
        const doctor = await doctorCollection.findOne({
          _id: result.insertedId,
        });

        res.status(201).json({
          message: "Doctor registered successfully",
          doctor,
        });
      } catch (error) {
        console.error("Error registering doctor:", error);
        res.status(500).json({ message: "Error registering doctor" });
      }
    });

    app.get("/api/doctor/appointments/doctorID", async (req, res) => {
      try {
        const { doctorID } = req.query;

        if (!doctorID) {
          return res.status(400).json({ message: "Doctor ID is required" });
        }

        const appointments = await appointmentCollection.find({ doctorID });
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
    app.delete("/api/admin/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;

        if (!ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid Doctor ID" });
        }

        const deletedDoctor = await userCollection.findOneAndDelete({
          _id: new ObjectId(userId),
        });

        if (!deletedDoctor) {
          return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({ message: "user deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
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
    app.get("/api/admin/allappointment", async (req, res) => {
      try {
        const appointment = await appointmentCollection.find().toArray();
        res.status(200).json({
          message: "List of all Appointment",
          data: appointment,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching Appointment" });
      }
    });
    // //appoved
    app.put("/api/admin/doctors/:doctorId", async (req, res) => {
      try {
        const { doctorId } = req.params;

        // Validate doctorId
        if (!ObjectId.isValid(doctorId)) {
          return res.status(400).json({ message: "Invalid Doctor ID format" });
        }

        // Update the doctor's registration status
        const updatedDoctor = await doctorCollection.findOneAndUpdate(
          { _id: new ObjectId(doctorId) },
          { $set: { registrations: "Approve" } }, // ✅ Set registration to "Approved"
          { returnDocument: "after" } // ✅ Return the updated document
        );

        // Check if doctor was found and updated
        if (!updatedDoctor?.value) {
          return res
            .status(404)
            .json({ message: "Doctor not found or already approved" });
        }

        res.status(200).json({
          message: "Doctor registration approved successfully",
          data: updatedDoctor.value, // ✅ Send the updated doctor data
        });
      } catch (error) {
        console.error("Error approving doctor registration:", error);
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
