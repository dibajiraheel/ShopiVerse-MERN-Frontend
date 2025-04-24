import React from 'react'

const Select = ({
    defaultValue,
    options,
    divClasses,
    selectClasses,
    optionClasses,
    onChange
}) => {
  return (
    <div>

        <select onChange={onChange} defaultValue={defaultValue} className={`select select-warning ${selectClasses}`}>
        
        <div className={divClasses}>
            <option className={optionClasses} disabled={true}>{defaultValue}</option>
                {
                    options?.map((option) => (
                        <option className={optionClasses}>{option}</option>
                    ))
                }
        </div>

        </select>

    </div>
  )
}

export default Select