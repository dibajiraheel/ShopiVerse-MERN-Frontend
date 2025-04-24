import React from 'react'
import CheckBox from './CheckBox'
import { useSelector } from 'react-redux'


const CategoriesFilter = ({
    availableCategories,
    selectedCategories,
    setSelectedCategories
}) => {
    
    const themeMode = useSelector(state => state.themeStore.mode)

   
   

    const handleOnChange = (e) => {
        console.log('ON CHANGE CALLED BY', e.target.id);
        
        const calledByCategory = e.target.id
        const currentState = e.target.checked

        if (currentState) setSelectedCategories([...selectedCategories, calledByCategory])
        else {
        
            const filteredCategories = selectedCategories.filter((selectedCategory) => selectedCategory != calledByCategory)
            setSelectedCategories(filteredCategories)

        }

        console.log('SELECTED CATEGORIES', selectedCategories);
        

    }

    
  
    return (
    
        <div className='flex flex-row sticky justify-center flex-wrap gap-x-12'>

            {
    
                availableCategories.map((availableCategory) => (
       
                    <div>
                                         
                        <CheckBox key={availableCategory} id={availableCategory} label={availableCategory} onChange={handleOnChange} labelClasses={`${themeMode == 'dark' ? 'text-white' : 'text-black'}`} checked={selectedCategories.includes(availableCategory) ? true : false}/>
                    
                    </div>

                ))
                            
            }
            

        </div>

            
    )

}

export default CategoriesFilter