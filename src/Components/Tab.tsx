interface Field {
  name: string
  label: string
  type: string
  required?: boolean
}

interface TabProps {
  data: Field
  value: string
  error?: string | null
  handleFieldChange: (name: string, value: string) => void
  onBlur?: (name: string) => void
}

const Tab = ({ data, value, error, handleFieldChange, onBlur }: TabProps) => {
  const { name, label, type, required } = data
  return (
    <div className="form-field">
      <label className="field-label" htmlFor={name}>
        {label}{required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={(e) => handleFieldChange(name, e.target.value)}
        onBlur={() => onBlur?.(name)}
        className={`field-input${error ? ' field-input--error' : ''}`}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default Tab
