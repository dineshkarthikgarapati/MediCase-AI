const express = require('express')
const bcrypt = require('bcryptjs')
const Doctor = require('../models/Doctor')

const router = express.Router()

// ==============================
// DOCTOR REGISTRATION
// ==============================

router.post('/register', async (req, res) => {
  try {
    const { name, doctorId, password } = req.body

    if (!name || !doctorId || !password) {
      return res.status(400).json({
        message: 'Please provide name, Doctor ID and password'
      })
    }

    const existingDoctor = await Doctor.findOne({ doctorId })

    if (existingDoctor) {
      return res.status(400).json({
        message: 'Doctor ID already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const doctor = await Doctor.create({
      name,
      doctorId,
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Doctor registered successfully',
      doctor: {
        id: doctor._id,
        name: doctor.name,
        doctorId: doctor.doctorId
      }
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
})


// ==============================
// DOCTOR LOGIN
// ==============================

router.post('/login', async (req, res) => {
  try {
    const { doctorId, password } = req.body

    if (!doctorId || !password) {
      return res.status(400).json({
        message: 'Please provide Doctor ID and password'
      })
    }

    const doctor = await Doctor.findOne({ doctorId })

    if (!doctor) {
      return res.status(401).json({
        message: 'Invalid Doctor ID or password'
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      doctor.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid Doctor ID or password'
      })
    }

    res.status(200).json({
      message: 'Doctor login successful',
      doctor: {
        id: doctor._id,
        name: doctor.name,
        doctorId: doctor.doctorId
      }
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Server error'
    })
  }
})


module.exports = router