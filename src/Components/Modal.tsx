import { useEffect } from 'react'

interface ModalProps {
  type: 'success' | 'error'
  name?: string
  onClose: () => void
  onReset: () => void
}

const Modal = ({ type, name, onClose, onReset }: ModalProps) => {
  const isSuccess = type === 'success'

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className={`modal-icon ${isSuccess ? 'modal-icon--success' : 'modal-icon--error'}`}>
          {isSuccess ? '✓' : '✕'}
        </div>

        <h2 className="modal-title">
          {isSuccess ? 'Submitted Successfully!' : 'Submission Failed'}
        </h2>

        <p className="modal-message">
          {isSuccess
            ? `Thank you, ${name}. We've received your information and will be in touch soon.`
            : 'Something went wrong on our end. Please try again or contact support if the problem persists.'}
        </p>

        <div className="modal-actions">
          {isSuccess ? (
            <button className="btn btn-primary" onClick={onReset}>Start Over</button>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={onClose}>Try Again</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
