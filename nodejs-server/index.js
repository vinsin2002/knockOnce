const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/appointments', { useNewUrlParser: true });

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNo: String, 
  date: Date
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    console.log(appointment);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000);