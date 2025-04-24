import React from 'react'
import { availableCategories } from '../../constants'

const MultiCategorySelector = ({
    themeMode,
    onChange,
    selectClasses,
    optionClasses
}) => {



  return (
    
    <div>

        <select onChange={onChange} className={`${themeMode == 'dark' ? 'bg-transparent' : ''}  select select-info ${selectClasses} `}>
            
            <option className={`${themeMode == 'dark' ? 'bg-lime-200 text-black' : 'text-black'} ${optionClasses} `} disabled={true}>Categories</option>
            
            {
                
                availableCategories.map((availableCategory) => (

                    <option key={availableCategory} className={`${themeMode == 'dark' ? 'bg-lime-200 text-black' : 'text-black'} ${optionClasses} `}>{availableCategory}</option>

                ))

            }

        </select>

    </div>
  )
}

export default MultiCategorySelector