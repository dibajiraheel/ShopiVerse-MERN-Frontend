import React from 'react'

const TextArea = ({
    labelClasses,
    textareaClasses,
    placeholder,
    label,
    onChange,
    value
}) => {
  return (
    <div>

        <fieldset className="fieldset">
        <legend className={`fieldset-legend ${labelClasses}`}>{label}</legend>
        <textarea value={value} onChange={onChange} className={`textarea h-24 ${textareaClasses}`} placeholder={placeholder}></textarea>
        </fieldset>

    </div>
  )
}

export default TextArea