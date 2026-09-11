import { useState } from 'react'
import './App.css'
import StepIndicator from './Components/StepIndicator'
import Tab from './Components/Tab'
import { validate } from './validation'

interface Field {
  name: string
  label: string
  type: string
  required: boolean
}

interface Step {
  title: string
  fields: Field[]
}

const steps: Step[] = [
  {
    title: "Personal Info",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "mobileNo", label: "Mobile Number", type: "tel", required: true },
      { name: "dob", label: "Date of Birth", type: "date", required: true },
    ],
  },
  {
    title: "Address",
    fields: [
      { name: "street", label: "Street Address", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
    ],
  },
  {
    title: "Review",
    fields: [],
  },
]

const initialData: Record<string, string> = {
  name: "", email: "", mobileNo: "", dob: "",
  street: "", city: "", state: "", zip: "",
}

function App() {
  const [formData, setFormData] = useState(initialData)
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleFieldChange = (fieldName: string, value: string) =>
    setFormData(prev => ({ ...prev, [fieldName]: value }))

  const handleBlur = (fieldName: string) =>
    setTouched(prev => ({ ...prev, [fieldName]: true }))

  const getError = (fieldName: string): string | null =>
    touched[fieldName] ? validate(fieldName, formData[fieldName]) : null

  const isStepValid = () =>
    steps[activeStep].fields.every(f => validate(f.name, formData[f.name]) === null)

  const touchCurrentStep = () => {
    const patch = steps[activeStep].fields.reduce<Record<string, boolean>>(
      (acc, f) => ({ ...acc, [f.name]: true }),
      {}
    )
    setTouched(prev => ({ ...prev, ...patch }))
  }

  const handleNext = () => {
    touchCurrentStep()
    if (isStepValid()) setActiveStep(p => p + 1)
  }

  const handlePrev = () => setActiveStep(p => p - 1)

  const handleSubmit = () => {
    touchCurrentStep()
    if (isStepValid()) {
      console.log('Submitted:', formData)
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData(initialData)
    setTouched({})
    setActiveStep(0)
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="form-wrapper">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Submitted Successfully!</h2>
          <p>Thank you, <strong>{formData.name}</strong>. We have received your information.</p>
          <button className="btn btn-primary" onClick={handleReset}>Start Over</button>
        </div>
      </div>
    )
  }

  const isLastStep = activeStep === steps.length - 1

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1 className="form-title">Registration Form</h1>

        <StepIndicator steps={steps} activeStep={activeStep} />

        <div className="form-body">
          {isLastStep ? (
            <div className="review-section">
              <h3>Review Your Information</h3>
              {steps.slice(0, -1).map(step => (
                <div key={step.title} className="review-group">
                  <h4>{step.title}</h4>
                  {step.fields.map(field => (
                    <div key={field.name} className="review-row">
                      <span className="review-label">{field.label}</span>
                      <span className="review-value">{formData[field.name] || '—'}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="fields-grid">
              {steps[activeStep].fields.map(field => (
                <Tab
                  key={field.name}
                  data={field}
                  value={formData[field.name]}
                  error={getError(field.name)}
                  handleFieldChange={handleFieldChange}
                  onBlur={handleBlur}
                />
              ))}
            </div>
          )}
        </div>

        <div className="form-footer">
          {activeStep > 0 && (
            <button className="btn btn-secondary" onClick={handlePrev}>← Previous</button>
          )}
          <div style={{ flex: 1 }} />
          {isLastStep ? (
            <button className="btn btn-primary" onClick={handleSubmit}>Submit →</button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>Next →</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
