import React from 'react'

interface Step {
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  activeStep: number
}

const StepIndicator = ({ steps, activeStep }: StepIndicatorProps) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isActive = index === activeStep
        return (
          <React.Fragment key={index}>
            <div className={`step-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}>
              <div className="step-circle">{isCompleted ? '✓' : index + 1}</div>
              <span className="step-label">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line${isCompleted ? ' completed' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default StepIndicator
