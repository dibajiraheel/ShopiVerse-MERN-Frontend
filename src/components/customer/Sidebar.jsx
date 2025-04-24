import React from 'react'
import CheckBox from '../CheckBox'
import { availableCategories } from '../../constants'
import { useSelector } from 'react-redux'

const Sidebar = ({
    selectedCategories,
    handleCategorySelection,
}) => {

    const themeMode = useSelector(state => state.themeStore.mode)

  return (
    <div>

        <div className="drawer z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn rounded-xl btn-ghost border-orange-700 hover:bg-orange-500 drawer-button">Filters</label>
        </div>
        <div className="drawer-side mt-16">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className={`menu ${themeMode == 'dark' ? 'bg-transparent backdrop-blur-3xl text-white' : 'bg-white text-black'} min-h-full w-80 p-4 flex flex-col gap-1`}>
                <h1 className={`${themeMode == 'dark' ? 'text-white' : 'text-black'} text-4xl text-center italic underline mb-5 font-extrabold `}>Categories</h1>

                {
                    availableCategories ? availableCategories.map((availableCategory) => (
                        <CheckBox checked={selectedCategories ? selectedCategories[availableCategory] : false} inputClasses={'input-primary'} labelClasses={`${themeMode == 'dark' ? 'text-white' : 'text-black'}`} key={availableCategory}  label={availableCategory} onChange={handleCategorySelection} id={availableCategory} />
                    )) : null
                }
            </ul>
        </div>
        </div>


    </div>
  )
}

export default Sidebar