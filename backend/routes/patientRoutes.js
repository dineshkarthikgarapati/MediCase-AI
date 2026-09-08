const express = require('express')
const bcrypt = require('bcryptjs')
const Patient = require('../models/Patient')

const router = express.Router()


// ==============================
// PATIENT REGISTRATION
// ==============================

router.post('/register', async (req, res) => {
  try {

    const { name, email, phone, password } = req.body


    // Check if all fields are provided
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, phone number and password'
      })
    }


    // Check if email or phone already exists
    const existingPatient = await Patient.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone }
      ]
    })


    if (existingPatient) {
      return res.status(400).json({
        message: 'A patient with this email or phone number already exists'
      })
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)


    // Create patient
    const patient = await Patient.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword
    })


    res.status(201).json({
      message: 'Patient registered successfully',

      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone
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
// PATIENT LOGIN
// ==============================

router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body


    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      })
    }


    // Find patient
    const patient = await Patient.findOne({
      email: email.toLowerCase()
    })


    if (!patient) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }


    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      patient.password
    )


    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }


    // Successful login
    res.status(200).json({
      message: 'Patient login successful',

      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone
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