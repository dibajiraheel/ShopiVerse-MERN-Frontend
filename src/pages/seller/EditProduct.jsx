import sellerButtons from '../../utils/SellerNavarbarButtons'
import Navbar from '../../ui components/Navbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiCategorySelector from '../../components/seller/MultiCategorySelector'
import { useForm, Controller } from 'react-hook-form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea' // Importing the TextArea component
import { cardsToDisplayOnOnePage, navigateOnSuccessfullyAddingNewItem } from '../../constants'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateItem from '../../api/seller/UpdateItem'
import { getCookie } from 'react-use-cookie'
import { AddItemOnPageNoInAllItems, UpdateItemBioInAllItems } from '../../slices/seller/SellerItemsSlice'

const EditProduct = () => {
  const themeMode = useSelector(state => state.themeStore.mode)
  const buttons = sellerButtons()

  const {itemId} = useParams()
  const { activePageNo } = useParams()
  
  // find item from store
  const items = useSelector(state => state.sellerItemsStore.items)
  const pagesAdded = useSelector(state => state.sellerItemsStore.itemsAddedForPageNo)

  const [item, setItem] = useState(null)
  const [itemFetched, setItemFetched] = useState(true)
  useEffect(() => {
    if (items.length > 0 && pagesAdded.includes((Number(activePageNo)))) {
      console.log('ITEMS FROM STORE', items);
      
      const itemsFrom = (activePageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
      const itemsTo = (activePageNo * cardsToDisplayOnOnePage)
      const itemFound = items.slice(itemsFrom, itemsTo).find((item) => item._id == itemId)
      console.log('ITEM FOUND', itemFound);
      
      if (itemFound) setItem(itemFound)
    else itemFetched(false)
    }
  }, [items])

  // fetch item from api if not found in store
  const FetchItem = async (itemId) => {
    const response = await GetSellerItem(itemId)
    if (!response) return
    dispatch(AddItemOnPageNoInAllItems({item: response, pageNo: activePageNo}))
  }

  useEffect(() => {
    if (!itemFetched) {
      FetchItem(itemId)
    }
  }, [itemFetched])

  useEffect(() => {
    
    if (item) {
        console.log('ITEM', item);
        console.log('ITEMS', items);
        const currentItemCategories = item.categories
        console.log('categories', currentItemCategories);
        currentItemCategories.map((currentItemCategory) => {
            if (selectedCategories.includes(currentItemCategory)) return
            setSelectedCaegories((alreadyAddedCategories) => [...alreadyAddedCategories, currentItemCategory])
        })
        setValue('name', item.name)
        setValue('price', item.price)
        setValue('stock', item.stock)
        setValue('description', item.description)

    }

  }, [item])
  

  const [selectedCategories, setSelectedCaegories] = useState([])
  const handleMultiSelect = (e) => {
    const currentlySelectedCategory = e.target.value
    if (selectedCategories.includes(currentlySelectedCategory)) return
    setSelectedCaegories([...selectedCategories, currentlySelectedCategory])
  }

  const handleRemoveSelectedCategory = (e) => {
    const categoryToRemove = e.target.nextElementSibling.innerHTML
    const filteredSelectedCategories = selectedCategories.filter(
      (seletedCategory) => seletedCategory !== categoryToRemove
    )
    setSelectedCaegories(filteredSelectedCategories)
  }



  const { handleSubmit, control, setValue } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategoriesError, setSelectedCategoriesError] = useState(false)
  const [formError, setFormError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sellerId = getCookie('_id')

  const handleItemUpdate = async (data) => {
    console.log('Submitted Data:', data)
    console.log('Selected Categories:', selectedCategories)

    setSelectedCategoriesError(false)
    setFormError(false)
    setIsSubmitting(true)


    if (selectedCategories.length == 0) {
      setSelectedCategoriesError(true)
      setIsSubmitting(false)
      return
    }

    if (data.name == '' || data.price == '' || data.stock == '' || data.description == '') {
      setFormError(true)
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('stock', data.stock)
    formData.append('description', data.description)
    formData.append('categories', selectedCategories)
    
    const response = await UpdateItem(formData, itemId, sellerId)

    if (response) {
      const updatedItems = {itemId: itemId, itemName: data.name, itemPrice: data.price, itemCategories: selectedCategories, itemStock: data.stock}
      dispatch(UpdateItemBioInAllItems({item: updatedItems, pageNo: activePageNo}))
      navigate(navigateOnSuccessfullyAddingNewItem)
    }

    setIsSubmitting(false)
    return

  }

  return (
    <div
      className={`min-w-screen min-h-screen ${themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-gray-100 text-black'}`}
    >
      <Navbar buttons={buttons} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileUrl={getCookie('profilePicUrl')} profileNavigateLink={'/seller/profile'} />

      {/* MultiCategory Selector - OUTSIDE the form */}
      <div className="pt-24 px-4 md:px-12 flex flex-col items-center">
        
        <div>
          <h1 className={`text-red-500 italic text-xl my-10 font-extrabold ${selectedCategoriesError ? '' : 'hidden'}`}>Select Categories For Product</h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {selectedCategories.length > 0 &&
            selectedCategories.map((selectedCategory) => (
              <div
                key={selectedCategory}
                className={`flex items-center gap-2 px-3 py-1 rounded-full shadow-sm text-sm font-medium 
                  ${themeMode === 'dark' ? 'bg-transparent bg-opacity-10 text-white border border-white/20' : 'bg-green-100 text-green-800'}`}
              >
                <span onClick={handleRemoveSelectedCategory} className="cursor-pointer hover:text-red-500">
                  ❌
                </span>
                <span>{selectedCategory}</span>
              </div>
            ))}
        </div>

        <MultiCategorySelector selectClasses={`${themeMode == 'dark' ? 'bg-transparent text-white' : 'bg-white text-black'}`} optionClasses={`bg-white`} themeMode={themeMode} onChange={handleMultiSelect} />


      </div>

      {/* Form Section */}
      
      {/* Form Error */}

      <div>
        <h1 className={`text-red-500 italic text-center mt-10 text-xl font-extrabold ${formError ? '' : 'hidden'}`}>All Fields Required For Adding New Items</h1>
      </div>

      {/* Form */}
      
      <form
        onSubmit={handleSubmit(handleItemUpdate)}
        className="w-full max-w-2xl mx-auto mt-12 px-4 md:px-0 space-y-6"
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Input
              label="Product Name"
              placeholder="Enter product name"
              type="text"
              value={field.value}
              onChange={field.onChange}
              inputClasses={`${
                themeMode === 'dark'
                  ? 'bg-transparent input-success border-2 text-white'
                  : 'bg-white border-gray-300 text-black'
              } rounded-md px-3 py-2 w-full`}
              labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
            />
          )}
        />

        {/* Price */}
        <Controller
          name="price"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Input
              label="Price"
              placeholder="Enter price"
              type="number"
              value={field.value}
              onChange={field.onChange}
              inputClasses={`${
                themeMode === 'dark'
                  ? 'bg-transparent input-success border-2 text-white'
                  : 'bg-white border-gray-300 text-black'
              } rounded-md px-3 py-2 w-full`}
              labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
            />
          )}
        />

        {/* Stock */}
        <Controller
          name="stock"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <Input
              label="Stock"
              placeholder="Enter stock quantity"
              type="number"
              value={field.value}
              onChange={field.onChange}
              inputClasses={`${
                themeMode === 'dark'
                  ? 'bg-transparent input-success border-2 text-white'
                  : 'bg-white border-gray-300 text-black'
              } rounded-md px-3 py-2 w-full`}
              labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
            />
          )}
        />

        {/* Description (Changed to Textarea) */}
        <Controller
          name="description"
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <TextArea
              label="Description"
              placeholder="Enter product description"
              value={field.value}
              onChange={field.onChange}
              textareaClasses={`${
                themeMode === 'dark'
                  ? 'bg-transparent input-success border-2 text-white'
                  : 'bg-white border-gray-300 text-black'
              } rounded-md px-3 py-2 w-full`}
              labelClasses={`text-lg ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}
            />
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            text={isSubmitting ? 'Updating' : 'Update'}
            classes={`${
                      themeMode == "dark"
                        ? "bg-transparent border border-green-500"
                        : "bg-green-500"
                    } rounded-md hover:bg-green-600 hover:bg-green-800`}
            type={'submit'}
            disabled={isSubmitting}
          />
        </div>
      </form>

    </div>
  )
}

export default EditProduct
