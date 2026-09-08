const express = require('express');

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: 'Please enter your health concern.'
      });
    }

    const userMessage = message.toLowerCase();

    let reply = '';

    // FEVER
    if (userMessage.includes('fever')) {
      reply = `Fever can occur due to infections such as viral or bacterial illnesses.

Make sure to:
• Drink plenty of fluids
• Take adequate rest
• Monitor your temperature

If your fever is very high, lasts for several days, or is accompanied by severe symptoms, please consult a doctor.`;
    }

    // HEADACHE
    else if (userMessage.includes('headache')) {
      reply = `Headaches can happen due to stress, dehydration, lack of sleep, eye strain, or other medical conditions.

You can try:
• Drinking water
• Resting in a quiet room
• Getting proper sleep

If the headache is sudden, extremely severe, or happens with weakness, confusion, or vision problems, seek medical help immediately.`;
    }

    // COUGH
    else if (userMessage.includes('cough')) {
      reply = `A cough may occur because of a cold, throat irritation, allergies, or respiratory infections.

You can try:
• Drinking warm fluids
• Staying hydrated
• Avoiding smoke and dust

If you have difficulty breathing, chest pain, or a persistent cough, please consult a doctor.`;
    }

    // COLD
    else if (userMessage.includes('cold')) {
      reply = `Common cold symptoms may include a runny nose, sneezing, sore throat, and mild fever.

Try:
• Getting enough rest
• Drinking warm fluids
• Staying hydrated

If symptoms become severe or continue for a long time, consult a healthcare professional.`;
    }

    // STOMACH PAIN
    else if (
      userMessage.includes('stomach') ||
      userMessage.includes('abdominal')
    ) {
      reply = `Stomach pain can have many causes, including indigestion, gas, food-related issues, or infections.

Try to:
• Drink water
• Eat light food
• Avoid oily or spicy food temporarily

If the pain is severe, persistent, or accompanied by vomiting or bleeding, seek medical attention immediately.`;
    }

    // DEFAULT RESPONSE
    else {
      reply = `I understand your concern.

Please provide more details about:
• Your symptoms
• How long you have had them
• Whether the symptoms are getting worse

MediCase AI provides general health information and is not a replacement for a qualified doctor.`;
    }

    return res.status(200).json({
      reply: reply
    });

  } catch (error) {
    console.error('AI Chat Error:', error);

    return res.status(500).json({
      reply: 'Something went wrong while processing your request.'
    });
  }
});

module.exports = router;