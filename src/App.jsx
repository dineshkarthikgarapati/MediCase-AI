import { useState } from 'react'
import './App.css'

function App() {
// =========================
// STATES
// =========================

const [page, setPage] = useState('home')

const [patient, setPatient] = useState({
name: '',
age: '',
gender: '',
language: 'English',
phone: ''
})

const [message, setMessage] = useState('')

const [messages, setMessages] = useState([
{
sender: 'ai',
text: "Hello! I'm MediCase AI. Please tell me what health problem or symptoms you are currently experiencing."
}
])

const [questions, setQuestions] = useState([])
const [answers, setAnswers] = useState([])
const [currentQuestion, setCurrentQuestion] = useState(0)
const [caseComplete, setCaseComplete] = useState(false)
const [detectedCondition, setDetectedCondition] = useState('General Medical Case')

// =========================
// SMART SYMPTOM DETECTION
// =========================

const detectSymptoms = (symptomText) => {
const text = symptomText.toLowerCase()
if (
  text.includes('headache') ||
  text.includes('head pain') ||
  text.includes('migraine')
) {
  return {
    condition: 'Headache / Migraine',
    questions: [
      'How long have you been experiencing the headache?',
      'Where exactly is the headache located?',
      'How severe is the headache: mild, moderate, or severe?',
      'Do you have dizziness, nausea, or blurred vision?',
      'Have you taken any medication for the headache?'
    ]
  }
}

if (
  text.includes('fever') ||
  text.includes('temperature')
) {
  return {
    condition: 'Fever',
    questions: [
      'How long have you had the fever?',
      'Do you know your approximate temperature?',
      'Do you have chills or body pain?',
      'Do you have cough, cold, or weakness?',
      'Have you taken any medication or visited a doctor?'
    ]
  }
}

if (
  text.includes('stomach') ||
  text.includes('abdominal') ||
  text.includes('abdomen')
) {
  return {
    condition: 'Stomach / Abdominal Pain',
    questions: [
      'Where exactly is the stomach pain located?',
      'How long have you been experiencing the pain?',
      'How severe is the pain: mild, moderate, or severe?',
      'Do you have nausea, vomiting, or diarrhea?',
      'Have you taken any medication or consulted a doctor?'
    ]
  }
}

if (
  text.includes('cough') ||
  text.includes('cold') ||
  text.includes('breathing') ||
  text.includes('breath')
) {
  return {
    condition: 'Respiratory Symptoms',
    questions: [
      'How long have you been experiencing these symptoms?',
      'Is your cough dry or producing mucus?',
      'Do you have fever, sore throat, or chest discomfort?',
      'Are you experiencing any difficulty breathing?',
      'Have you taken any medication or visited a doctor?'
    ]
  }
}

return {
  condition: 'General Medical Case',
  questions: [
    'How long have you been experiencing these symptoms?',
    'Can you describe the symptoms in more detail?',
    'How severe are the symptoms: mild, moderate, or severe?',
    'Do you have any other associated symptoms?',
    'Have you taken any medication or visited a doctor?'
  ]
}

}

// =========================
// HANDLE CHAT
// =========================

const handleSend = () => {
if (message.trim() === '' || caseComplete) {
return
}

const userText = message.trim()

const userMessage = {
  sender: 'user',
  text: userText
}

// First patient message
if (questions.length === 0) {
  const result = detectSymptoms(userText)

  setDetectedCondition(result.condition)
  setQuestions(result.questions)
  setAnswers([userText])
  setCurrentQuestion(0)

  setMessages([
    ...messages,
    userMessage,
    {
      sender: 'ai',
      text: result.questions[0]
    }
  ])

  setMessage('')
  return
}

// Store answer
const newAnswers = [...answers, userText]
const nextQuestion = currentQuestion + 1

// More questions available
if (nextQuestion < questions.length) {
  setAnswers(newAnswers)
  setCurrentQuestion(nextQuestion)

  setMessages([
    ...messages,
    userMessage,
    {
      sender: 'ai',
      text: questions[nextQuestion]
    }
  ])
} else {
  // Case completed
  setAnswers(newAnswers)
  setCaseComplete(true)

  setMessages([
    ...messages,
    userMessage,
    {
      sender: 'ai',
      text: 'Thank you. I have collected the important information for the patient case. You can now generate the clinical report.'
    }
  ])
}

setMessage('')

}

// =========================
// VALIDATE PATIENT DETAILS
// =========================

const handleContinue = () => {
if (
patient.name.trim() === '' ||
patient.age === '' ||
patient.gender === '' ||
patient.phone.trim() === ''
) {
alert('Please fill in all required patient details.')
return
}

setPage('case')

}

// =========================
// START NEW CASE
// =========================

const startNewCase = () => {
setPatient({
name: '',
age: '',
gender: '',
language: 'English',
phone: ''
})

setMessage('')

setMessages([
  {
    sender: 'ai',
    text: "Hello! I'm MediCase AI. Please tell me what health problem or symptoms you are currently experiencing."
  }
])

setQuestions([])
setAnswers([])
setCurrentQuestion(0)
setCaseComplete(false)
setDetectedCondition('General Medical Case')

setPage('registration')

}

// =========================
// REGISTRATION PAGE
// =========================

if (page === 'registration') {
return ( <div className="registration-page">

    <nav className="navbar">
      <div className="logo">
        🏥 MediCase <span>AI</span>
      </div>

      <button
        className="back-btn"
        onClick={() => setPage('home')}
      >
        ← Back to Home
      </button>
    </nav>

    <div className="registration-container">
      <div className="registration-card">

        <div className="form-header">
          <div className="form-icon">👤</div>

          <h1>New Patient Case</h1>

          <p>
            Enter the patient's basic information to begin the AI-powered case-taking process.
          </p>
        </div>

        <form>

          <div className="form-row">

            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter patient name"
                value={patient.name}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    name: e.target.value
                  })
                }
              />
            </div>

            <div className="input-group">
              <label>Age</label>

              <input
                type="number"
                placeholder="Enter age"
                value={patient.age}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    age: e.target.value
                  })
                }
              />
            </div>

          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Gender</label>

              <select
                value={patient.gender}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    gender: e.target.value
                  })
                }
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Preferred Language</label>

              <select
                value={patient.language}
                onChange={(e) =>
                  setPatient({
                    ...patient,
                    language: e.target.value
                  })
                }
              >
                <option value="English">English</option>
                <option value="Kannada">Kannada</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>

          </div>

          <div className="input-group full-width">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter phone number"
              value={patient.phone}
              onChange={(e) =>
                setPatient({
                  ...patient,
                  phone: e.target.value
                })
              }
            />
          </div>

          <button
            type="button"
            className="continue-btn"
            onClick={handleContinue}
          >
            Continue to Case Taking →
          </button>

        </form>

      </div>
    </div>

  </div>
)

}

// =========================
// CASE-TAKING PAGE
// =========================

if (page === 'case') {
return ( <div className="case-page">
  <nav className="navbar">
    <div className="logo">
      🏥 MediCase <span>AI</span>
    </div>

    <button
      className="back-btn"
      onClick={() => setPage('registration')}
    >
      ← Patient Details
    </button>
  </nav>


    <div className="case-container">

      <div className="case-info">

        <div className="case-badge">
          🤖 AI CASE-TAKING SESSION
        </div>

        <h1>
          Let's Understand the Patient's Condition
        </h1>

        <p>
          MediCase AI analyzes symptoms and asks relevant follow-up questions.
        </p>

      </div>

      <div className="case-chat-card">

        <div className="chat-header">
          <h3>🤖 MediCase AI Assistant</h3>

          <span>
            ● {caseComplete ? 'Case Completed' : 'Ready to assist'}
          </span>
        </div>

        <div className="conversation">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === 'ai'
                  ? 'ai-message'
                  : 'patient-message'
              }
            >
              {msg.text}
            </div>
          ))}

        </div>

        {!caseComplete ? (

          <div className="answer-area">

            <input
              type="text"
              placeholder="Describe the patient's symptoms..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend()
                }
              }}
            />

            <button
              type="button"
              onClick={handleSend}
            >
              ➤
            </button>

          </div>

        ) : (

          <button
            className="generate-report-btn"
            onClick={() => setPage('report')}
          >
            📋 Generate Clinical Report
          </button>

        )}

        <div className="voice-option">
          🎙️ Voice input coming next
        </div>

      </div>

    </div>

  </div>
)

}

// =========================
// REPORT PAGE
// =========================

if (page === 'report') {
return ( <div className="report-page">

    <nav className="navbar">
      <div className="logo">
        🏥 MediCase <span>AI</span>
      </div>

      <button
        className="back-btn"
        onClick={() => setPage('case')}
      >
        ← Back to Case
      </button>
    </nav>

    <div className="report-container">

      <div className="report-card">

        <div className="report-header">

          <div>
            <h1>📋 Clinical Case Report</h1>
            <p>AI-Assisted Patient Case Summary</p>
          </div>

          <div className="report-status">
            ✓ Case Completed
          </div>

        </div>

        <div className="report-section">

          <h2>👤 Patient Information</h2>

          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Language:</strong> {patient.language}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>

        </div>

        <div className="report-section">

          <h2>🩺 Detected Condition</h2>

          <p>{detectedCondition}</p>

        </div>

        <div className="report-section">

          <h2>📝 Main Complaint</h2>

          <p>{answers[0] || 'Not provided'}</p>

        </div>

        {questions.map((question, index) => (
          <div
            className="report-section"
            key={index}
          >
            <h2>🩺 {question}</h2>

            <p>
              {answers[index + 1] || 'Not provided'}
            </p>
          </div>
        ))}

        <div className="ai-summary">

          <h2>🤖 AI Case Summary</h2>

          <p>
            MediCase AI identified the primary symptom category as
            <strong> {detectedCondition}</strong> and collected relevant follow-up information.
          </p>

          <p>
            This structured report is designed to assist healthcare professionals
            during patient consultation and documentation.
          </p>

          <p>
            <strong>Important:</strong> This system does not provide a medical diagnosis
            and should not replace professional medical advice.
          </p>

        </div>

        <button
          className="new-case-btn"
          onClick={startNewCase}
        >
          ➕ Start New Case
        </button>

      </div>

    </div>

  </div>
)

}

// =========================
// HOME PAGE
// =========================

return ( <div className="app">

  <nav className="navbar">

    <div className="logo">
      🏥 MediCase <span>AI</span>
    </div>

    <div className="nav-links">
      <a href="#home">Home</a>
      <a href="#features">Features</a>
    </div>

    <button className="login-btn">
      Doctor Login
    </button>

  </nav>

  <main className="hero" id="home">

    <div className="hero-content">

      <div className="badge">
        🤖 AI-Powered Healthcare Assistant
      </div>

      <h1>
        Intelligent Patient
        <br />
        <span>Case-Taking System</span>
      </h1>

      <p>
        An AI-powered multilingual platform that helps healthcare professionals
        collect patient information, ask intelligent follow-up questions,
        and generate structured clinical case reports.
      </p>

      <div className="hero-buttons">

        <button
          className="primary-btn"
          onClick={() => setPage('registration')}
        >
          ➕ Start New Case
        </button>

        <button className="secondary-btn">
          ▶ See How It Works
        </button>

      </div>

    </div>

    <div className="hero-card">

      <div className="card-header">
        <span className="status">
          ● AI Assistant Active
        </span>
      </div>

      <div className="chat">

        <div className="ai-message">
          Hello! I'm MediCase AI.
          <br />
          Let's begin the patient case-taking process.
        </div>

        <div className="patient-message">
          I have been experiencing fever and headache.
        </div>

        <div className="ai-message">
          I understand. How long have you been experiencing these symptoms?
        </div>

      </div>

    </div>

  </main>

  <section className="features" id="features">

    <h2>Smarter Healthcare Documentation</h2>

    <div className="feature-grid">

      <div className="feature-card">
        <div className="feature-icon">🤖</div>
        <h3>AI Guided Questions</h3>
        <p>Symptom-based follow-up questions for better case taking.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">🎙️</div>
        <h3>Voice Case Taking</h3>
        <p>Patients can describe symptoms naturally using voice.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">🌐</div>
        <h3>Multilingual Support</h3>
        <p>Support for Indian languages to reduce communication barriers.</p>
      </div>

      <div className="feature-card">
        <div className="feature-icon">📄</div>
        <h3>Smart Reports</h3>
        <p>Automatically generate structured patient case documentation.</p>
      </div>

    </div>

  </section>

</div>


)
}

export default App
