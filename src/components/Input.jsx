import React from 'react'

const Input = ({
    labelClasses,
    inputClasses,
    placeholder,
    label,
    type,
    onChange,
    value,
    defaultValue,
    disabled,
    minNumAllowed,
    maxNumAllowed
}) => {
  return (
    <div>
        <fieldset className="fieldset">
            {label ? <legend className={`fieldset-legend ${labelClasses}`}>{label}</legend> : null}
            <input 
                value={value}
                defaultValue={defaultValue} 
                onChange={onChange} 
                type={type} 
                className={`input ${inputClasses}`} // Make sure inputClasses overrides any defaults
                placeholder={placeholder}
                disabled={disabled} 
                max={maxNumAllowed}
                min={minNumAllowed}
            />
        </fieldset>
    </div>
  )
}

export default Input
