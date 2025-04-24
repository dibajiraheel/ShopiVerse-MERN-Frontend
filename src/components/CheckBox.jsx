import React from 'react'

const CheckBox = ({

    id,
    labelClasses,
    inputClasses,
    label,
    onChange,
    checked
}) => {

    return (
    
        <div>
        
            <fieldset className="fieldset">
        
                <div className='flex flex-row gap-x-3'>

                    {label ? <legend className={`fieldset-legend text-sm ${labelClasses}`}>{label}</legend> : null}
                    <input id={id} checked={checked} onChange={onChange} type="checkbox" defaultChecked className={`checkbox checkbox-success ${inputClasses}`} />        

        
                </div>
        
            </fieldset>
        
        </div>
    
    )

}

export default CheckBox
