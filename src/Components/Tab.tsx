interface Field {
  name: string
  label: string
  type: string
  required?: boolean
}

interface TabProps {
  data: Field
  value: string
  handleFieldChange: (name: string, value: string) => void
}

const Tab = ({ data, value, handleFieldChange }: TabProps) => {
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
        className="field-input"
      />
    </div>
  )
}

export default Tab
