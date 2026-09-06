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
  const [isListening, setIsListening] = useState(false)

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
  const [cases, setCases] = useState([])


  // =========================
  // SMART SYMPTOM DETECTION
  // =========================

  const detectSymptoms = (symptomText) => {

  const text = symptomText.toLowerCase()

  const language = patient.language


  // =========================
  // ENGLISH
  // =========================

  const englishQuestions = {
    fever: [
      'How long have you had the fever?',
      'Do you know your approximate temperature?',
      'Do you have chills or body pain?',
      'Do you have cough, cold, or weakness?',
      'Have you taken any medication or visited a doctor?'
    ],

    headache: [
      'How long have you been experiencing the headache?',
      'Where exactly is the headache located?',
      'How severe is the headache: mild, moderate, or severe?',
      'Do you have dizziness, nausea, or blurred vision?',
      'Have you taken any medication for the headache?'
    ],

    general: [
      'How long have you been experiencing these symptoms?',
      'Can you describe the symptoms in more detail?',
      'How severe are the symptoms: mild, moderate, or severe?',
      'Do you have any other associated symptoms?',
      'Have you taken any medication or visited a doctor?'
    ]
  }


  // =========================
  // TELUGU
  // =========================

  const teluguQuestions = {
    fever: [
      'మీకు జ్వరం ఎంతకాలంగా ఉంది?',
      'మీ శరీర ఉష్ణోగ్రత ఎంత ఉందో తెలుసా?',
      'మీకు చలి లేదా ఒళ్ళు నొప్పులు ఉన్నాయా?',
      'మీకు దగ్గు, జలుబు లేదా బలహీనత ఉందా?',
      'మీరు ఏదైనా మందులు తీసుకున్నారా లేదా డాక్టర్‌ను సంప్రదించారా?'
    ],

    headache: [
      'మీకు తలనొప్పి ఎంతకాలంగా ఉంది?',
      'తలలో ఏ ప్రాంతంలో నొప్పి ఉంది?',
      'తలనొప్పి తక్కువగా, మోస్తరుగా లేదా తీవ్రంగా ఉందా?',
      'మీకు తల తిరగడం, వికారం లేదా చూపు సమస్యలు ఉన్నాయా?',
      'మీరు తలనొప్పికి ఏదైనా మందులు తీసుకున్నారా?'
    ],

    general: [
      'మీకు ఈ లక్షణాలు ఎంతకాలంగా ఉన్నాయి?',
      'మీ లక్షణాలను కొంచెం వివరంగా చెప్పగలరా?',
      'ఈ లక్షణాలు తక్కువగా, మోస్తరుగా లేదా తీవ్రంగా ఉన్నాయా?',
      'మీకు ఇతర లక్షణాలు ఏమైనా ఉన్నాయా?',
      'మీరు ఏదైనా మందులు తీసుకున్నారా లేదా డాక్టర్‌ను సంప్రదించారా?'
    ]
  }


  // =========================
  // HINDI
  // =========================

  const hindiQuestions = {
    fever: [
      'आपको बुखार कितने समय से है?',
      'क्या आपको अपना अनुमानित तापमान पता है?',
      'क्या आपको ठंड या शरीर में दर्द हो रहा है?',
      'क्या आपको खांसी, जुकाम या कमजोरी है?',
      'क्या आपने कोई दवा ली है या डॉक्टर से मिले हैं?'
    ],

    headache: [
      'आपको सिरदर्द कितने समय से है?',
      'सिर के किस हिस्से में दर्द है?',
      'सिरदर्द हल्का, मध्यम या गंभीर है?',
      'क्या आपको चक्कर, मतली या धुंधला दिखाई दे रहा है?',
      'क्या आपने सिरदर्द के लिए कोई दवा ली है?'
    ],

    general: [
      'आपको ये लक्षण कितने समय से हैं?',
      'क्या आप अपने लक्षणों को विस्तार से बता सकते हैं?',
      'लक्षण हल्के, मध्यम या गंभीर हैं?',
      'क्या आपको कोई अन्य लक्षण हैं?',
      'क्या आपने कोई दवा ली है या डॉक्टर से मिले हैं?'
    ]
  }


  // =========================
  // KANNADA
  // =========================

  const kannadaQuestions = {
    fever: [
      'ನಿಮಗೆ ಜ್ವರ ಎಷ್ಟು ಸಮಯದಿಂದ ಇದೆ?',
      'ನಿಮ್ಮ ಅಂದಾಜು ದೇಹದ ಉಷ್ಣಾಂಶ ಎಷ್ಟು ಎಂದು ತಿಳಿದಿದೆಯೇ?',
      'ನಿಮಗೆ ಚಳಿ ಅಥವಾ ಮೈ ನೋವು ಇದೆಯೇ?',
      'ನಿಮಗೆ ಕೆಮ್ಮು, ಶೀತ ಅಥವಾ ದೌರ್ಬಲ್ಯ ಇದೆಯೇ?',
      'ನೀವು ಯಾವುದಾದರೂ ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ ಅಥವಾ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಿದ್ದೀರಾ?'
    ],

    headache: [
      'ನಿಮಗೆ ತಲೆನೋವು ಎಷ್ಟು ಸಮಯದಿಂದ ಇದೆ?',
      'ತಲೆಯ ಯಾವ ಭಾಗದಲ್ಲಿ ನೋವು ಇದೆ?',
      'ತಲೆನೋವು ಸೌಮ್ಯ, ಮಧ್ಯಮ ಅಥವಾ ತೀವ್ರವಾಗಿದೆಯೇ?',
      'ನಿಮಗೆ ತಲೆಸುತ್ತು, ವಾಕರಿಕೆ ಅಥವಾ ದೃಷ್ಟಿ ಸಮಸ್ಯೆ ಇದೆಯೇ?',
      'ತಲೆನೋವಿಗಾಗಿ ಯಾವುದಾದರೂ ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ?'
    ],

    general: [
      'ನಿಮಗೆ ಈ ಲಕ್ಷಣಗಳು ಎಷ್ಟು ಸಮಯದಿಂದ ಇವೆ?',
      'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಸ್ವಲ್ಪ ವಿವರವಾಗಿ ಹೇಳಬಹುದೇ?',
      'ಲಕ್ಷಣಗಳು ಸೌಮ್ಯ, ಮಧ್ಯಮ ಅಥವಾ ತೀವ್ರವಾಗಿವೆಯೇ?',
      'ನಿಮಗೆ ಬೇರೆ ಯಾವುದೇ ಲಕ್ಷಣಗಳಿವೆಯೇ?',
      'ನೀವು ಯಾವುದಾದರೂ ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ ಅಥವಾ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಿದ್ದೀರಾ?'
    ]
  }


  // =========================
  // TAMIL
  // =========================

  const tamilQuestions = {
    fever: [
      'உங்களுக்கு காய்ச்சல் எவ்வளவு நாட்களாக உள்ளது?',
      'உங்கள் உடல் வெப்பநிலை எவ்வளவு என்று தெரியுமா?',
      'உங்களுக்கு குளிர் அல்லது உடல் வலி இருக்கிறதா?',
      'உங்களுக்கு இருமல், சளி அல்லது பலவீனம் இருக்கிறதா?',
      'நீங்கள் ஏதேனும் மருந்து எடுத்துள்ளீர்களா அல்லது மருத்துவரை சந்தித்துள்ளீர்களா?'
    ],

    headache: [
      'உங்களுக்கு தலைவலி எவ்வளவு நாட்களாக உள்ளது?',
      'தலையின் எந்த பகுதியில் வலி உள்ளது?',
      'தலைவலி லேசானதா, மிதமானதா அல்லது தீவிரமானதா?',
      'உங்களுக்கு தலைசுற்றல் அல்லது குமட்டல் இருக்கிறதா?',
      'தலைவலிக்காக ஏதேனும் மருந்து எடுத்துள்ளீர்களா?'
    ],

    general: [
      'இந்த அறிகுறிகள் உங்களுக்கு எவ்வளவு நாட்களாக உள்ளன?',
      'உங்கள் அறிகுறிகளை மேலும் விவரமாக கூற முடியுமா?',
      'அறிகுறிகள் லேசானதா, மிதமானதா அல்லது தீவிரமானதா?',
      'உங்களுக்கு வேறு ஏதேனும் அறிகுறிகள் உள்ளனவா?',
      'நீங்கள் ஏதேனும் மருந்து எடுத்துள்ளீர்களா அல்லது மருத்துவரை சந்தித்துள்ளீர்களா?'
    ]
  }


  // =========================
  // SELECT LANGUAGE
  // =========================

  let selectedQuestions = englishQuestions

  if (language === 'Telugu') {
    selectedQuestions = teluguQuestions
  }

  else if (language === 'Hindi') {
    selectedQuestions = hindiQuestions
  }

  else if (language === 'Kannada') {
    selectedQuestions = kannadaQuestions
  }

  else if (language === 'Tamil') {
    selectedQuestions = tamilQuestions
  }


  // =========================
  // DETECT SYMPTOM
  // =========================

  if (
    text.includes('fever') ||
    text.includes('జ్వరం') ||
    text.includes('बुखार') ||
    text.includes('ಜ್ವರ') ||
    text.includes('காய்ச்சல்')
  ) {
    return {
      condition: 'Fever',
      questions: selectedQuestions.fever
    }
  }


  if (
    text.includes('headache') ||
    text.includes('head pain') ||
    text.includes('migraine') ||
    text.includes('తలనొప్పి') ||
    text.includes('सिरदर्द') ||
    text.includes('ತಲೆನೋವು') ||
    text.includes('தலைவலி')
  ) {
    return {
      condition: 'Headache / Migraine',
      questions: selectedQuestions.headache
    }
  }


  // =========================
  // GENERAL CASE
  // =========================

  return {
    condition: 'General Medical Case',
    questions: selectedQuestions.general
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
  // VOICE RECOGNITION
  // =========================
const startVoiceRecognition = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    alert(
      'Voice recognition is not supported in this browser. Please use Google Chrome.'
    )
    return
  }

  // Language mapping
  const languageCodes = {
    English: 'en-IN',
    Kannada: 'kn-IN',
    Hindi: 'hi-IN',
    Telugu: 'te-IN',
    Tamil: 'ta-IN'
  }

  const recognitionInstance = new SpeechRecognition()

  recognitionInstance.continuous = false
  recognitionInstance.interimResults = false

  recognitionInstance.lang =
    languageCodes[patient.language] || 'en-IN'


  recognitionInstance.onstart = () => {
    console.log('Voice recognition started')
    setIsListening(true)
  }


  recognitionInstance.onresult = (event) => {

    const voiceText =
      event.results[0][0].transcript

    console.log('You said:', voiceText)

    setMessage(voiceText)
  }


  recognitionInstance.onerror = (event) => {

    console.error(
      'Voice recognition error:',
      event.error
    )

    alert('Microphone error: ' + event.error)

    setIsListening(false)
  }


  recognitionInstance.onend = () => {
    console.log('Voice recognition ended')
    setIsListening(false)
  }


  recognitionInstance.start()
}



  // ======================
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
  // SAVE COMPLETED CASE
  // =========================

  const saveCase = () => {

    const newCase = {
      id: Date.now(),

      patient: {
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        language: patient.language,
        phone: patient.phone
      },

      condition: detectedCondition,

      complaint: answers[0] || 'Not provided',

      questions: [...questions],

      answers: [...answers],

      status: 'Completed'
    }

    setCases((previousCases) => [
      newCase,
      ...previousCases
    ])
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
  // DOCTOR LOGIN PAGE
  // =========================

  if (page === 'doctorLogin') {

    return (

      <div className="doctor-login-page">

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


        <div className="doctor-login-container">

          <div className="doctor-login-card">

            <div className="doctor-login-header">

              <div className="doctor-icon">
                👨‍⚕️
              </div>

              <h1>Doctor Login</h1>

              <p>
                Login to access the MediCase AI Doctor Dashboard.
              </p>

            </div>


            <div className="input-group">

              <label>Doctor ID</label>

              <input
                type="text"
                placeholder="Enter Doctor ID"
              />

            </div>


            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
              />

            </div>


            <button
              className="doctor-login-submit"
              onClick={() => setPage('dashboard')}
            >
              Login →
            </button>

          </div>

        </div>

      </div>
    )
  }


  // =========================
  // DOCTOR DASHBOARD
  // =========================

  if (page === 'dashboard') {

    const totalCases = cases.length

    const completedCases =
      cases.filter(
        (item) => item.status === 'Completed'
      ).length

    return (

      <div className="dashboard-page">

        <nav className="navbar">

          <div className="logo">
            🏥 MediCase <span>AI</span>
          </div>

          <button
            className="back-btn"
            onClick={() => setPage('home')}
          >
            ← Logout
          </button>

        </nav>


        <div className="dashboard-container">

          <div className="dashboard-header">

            <div>

              <h1>Welcome, Doctor 👨‍⚕️</h1>

              <p>
                Manage and review patient cases using MediCase AI.
              </p>

            </div>


            <button
              className="dashboard-new-case-btn"
              onClick={startNewCase}
            >
              ➕ New Patient Case
            </button>

          </div>


          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">📋</div>

              <h2>{totalCases}</h2>

              <p>Total Cases</p>

            </div>


            <div className="stat-card">

              <div className="stat-icon">⏳</div>

              <h2>0</h2>

              <p>Pending Cases</p>

            </div>


            <div className="stat-card">

              <div className="stat-icon">✅</div>

              <h2>{completedCases}</h2>

              <p>Completed Cases</p>

            </div>

          </div>


          <div className="recent-cases">

            <h2>📋 Recent Patient Cases</h2>


            {cases.length === 0 ? (

              <div className="empty-cases">

                <div className="empty-icon">
                  🏥
                </div>

                <h3>No saved patient cases yet</h3>

                <p>
                  Complete a patient case to see it appear here.
                </p>

              </div>

            ) : (

              <div className="cases-list">

                {cases.map((item) => (

                  <div
                    className="patient-case-card"
                    key={item.id}
                  >

                    <h3>
                      👤 {item.patient.name}
                    </h3>

                    <p>
                      Age: {item.patient.age}
                      {' | '}
                      Gender: {item.patient.gender}
                    </p>

                    <p>
                      <strong>Condition:</strong>
                      {' '}
                      {item.condition}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      {' '}
                      ✅ {item.status}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    )
  }


  // =========================
  // REGISTRATION PAGE
  // =========================

  if (page === 'registration') {

    return (

      <div className="registration-page">

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

              <div className="form-icon">
                👤
              </div>

              <h1>New Patient Case</h1>

              <p>
                Enter the patient's basic information to begin
                the AI-powered case-taking process.
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

                    <option value="">
                      Select gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

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

                    <option value="English">
                      English
                    </option>

                    <option value="Kannada">
                      Kannada
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>

                    <option value="Telugu">
                      Telugu
                    </option>

                    <option value="Tamil">
                      Tamil
                    </option>

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
  // CASE TAKING PAGE
  // =========================

  if (page === 'case') {

    return (

      <div className="case-page">

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
              MediCase AI analyzes symptoms and asks
              relevant follow-up questions.
            </p>

          </div>


          <div className="case-chat-card">

            <div className="chat-header">

              <h3>
                🤖 MediCase AI Assistant
              </h3>

              <span>
                ● {caseComplete
                  ? 'Case Completed'
                  : 'Ready to assist'}
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
                  placeholder={
                    isListening
                      ? '🎙️ Listening... Speak now'
                      : "Describe the patient's symptoms..."
                  }
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSend()
                    }
                  }}
                />


                <button
                  type="button"
                  className={
                    isListening
                      ? 'mic-btn listening'
                      : 'mic-btn'
                  }
                  onClick={startVoiceRecognition}
                  title="Click to speak"
                >
                  🎙️
                </button>


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
                onClick={() => {
                  saveCase()
                  setPage('report')
                }}
              >
                📋 Generate Clinical Report
              </button>

            )}


            <div className="voice-option">
              🎙️ Click the microphone and speak your answer
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

    return (

      <div className="report-page">

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

                <p>
                  AI-Assisted Patient Case Summary
                </p>

              </div>


              <div className="report-status">
                ✓ Case Completed
              </div>

            </div>


            <div className="report-section">

              <h2>👤 Patient Information</h2>

              <p>
                <strong>Name:</strong>
                {' '}
                {patient.name}
              </p>

              <p>
                <strong>Age:</strong>
                {' '}
                {patient.age}
              </p>

              <p>
                <strong>Gender:</strong>
                {' '}
                {patient.gender}
              </p>

              <p>
                <strong>Language:</strong>
                {' '}
                {patient.language}
              </p>

              <p>
                <strong>Phone:</strong>
                {' '}
                {patient.phone}
              </p>

            </div>


            <div className="report-section">

              <h2>🩺 Detected Condition</h2>

              <p>
                {detectedCondition}
              </p>

            </div>


            <div className="report-section">

              <h2>📝 Main Complaint</h2>

              <p>
                {answers[0] || 'Not provided'}
              </p>

            </div>


            {questions.map((question, index) => (

              <div
                className="report-section"
                key={index}
              >

                <h2>
                  🩺 {question}
                </h2>

                <p>
                  {answers[index + 1] || 'Not provided'}
                </p>

              </div>

            ))}


            <div className="ai-summary">

              <h2>🤖 AI Case Summary</h2>

              <p>
                MediCase AI identified the primary symptom category as
                <strong>
                  {' '}
                  {detectedCondition}
                </strong>
                {' '}
                and collected relevant follow-up information.
              </p>

              <p>
                This structured report is designed to assist healthcare
                professionals during patient consultation and documentation.
              </p>

              <p>
                <strong>Important:</strong>
                {' '}
                This system does not provide a medical diagnosis
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

  return (

    <div className="app">

      <nav className="navbar">

        <div className="logo">
          🏥 MediCase <span>AI</span>
        </div>


        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#features">
            Features
          </a>

        </div>


        <button
          className="login-btn"
          onClick={() => setPage('doctorLogin')}
        >
          Doctor Login
        </button>

      </nav>


      <main
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <div className="badge">
            🤖 AI-Powered Healthcare Assistant
          </div>


          <h1>
            Intelligent Patient
            <br />
            <span>
              Case-Taking System
            </span>
          </h1>


          <p>
            An AI-powered multilingual platform that helps
            healthcare professionals collect patient information,
            ask intelligent follow-up questions, and generate
            structured clinical case reports.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={startNewCase}
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
              I understand. How long have you been experiencing
              these symptoms?
            </div>

          </div>

        </div>

      </main>


      <section
        className="features"
        id="features"
      >

        <h2>
          Smarter Healthcare Documentation
        </h2>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>AI Guided Questions</h3>

            <p>
              Symptom-based follow-up questions for better case taking.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎙️
            </div>

            <h3>Voice Case Taking</h3>

            <p>
              Patients can describe symptoms naturally using voice.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🌐
            </div>

            <h3>Multilingual Support</h3>

            <p>
              Support for Indian languages to reduce communication barriers.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>Smart Reports</h3>

            <p>
              Automatically generate structured patient case documentation.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

export default App