import { UpdateItemImageInAllItems } from '../../slices/seller/SellerItemsSlice'
import UpdateItemImages from '../../api/seller/UpdateItemImages'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCookie } from 'react-use-cookie'
import { useForm, Controller } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { navigateOnSuccessfullyAddingNewItem } from '../../constants'
import Navbar from '../../ui components/Navbar'
import sellerButtons from '../../utils/SellerNavarbarButtons'
import { UpdateItemImagesUrlInSingleItemSlice } from '../../slices/seller/SellerSingleItemSlice'


const EditProductImages = () => {

    const {itemId} = useParams()
    const {activePageNo} = useParams()
    const sellerId = useSelector(state => state.authenticationStore.userId)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagesError, setImagesError] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleImagesUpdate = async (data) => {
        setIsSubmitting(true)
        setImagesError(false)

        if (data.imageOne == undefined || data.imageTwo == undefined) {
            setImagesError(true)
            return
        }

        const formData = new FormData()
        formData.append('imageOne', data.imageOne)  
        formData.append('imageTwo', data.imageTwo)
        console.log('FORM DATA SENDING', formData, data);
        
        const response = await UpdateItemImages(formData, itemId, sellerId)
        if (! response) {
            setIsSubmitting(false)
            return
        }
        console.log('response received after updating images', response);
        
        dispatch(UpdateItemImageInAllItems({itemId: itemId, itemImageOneUrl: response['imageOneUrl'], itemImageTwoUrl: response['imageTwoUrl'], pageNo: activePageNo}))
        navigate(navigateOnSuccessfullyAddingNewItem)
    }

    const themeMode = useSelector(state => state.themeStore.mode)
    const {control, handleSubmit } = useForm()

  return (
    
    <div className='min-w-screen min-h-screen'>

        <div>
            <Navbar buttons={sellerButtons()} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileNavigateLink={'/seller/profile'} />
        </div>

        <div className='pt-20'>

            {
                imagesError ?
                <div className={`text-4xl ${themeMode == 'dark' ? 'text-white' : 'text-black flex flex-row justify-center items-center'}`}>
                    <h1 >Two Images Needs To Be Uploaded... 😊</h1>
                </div>
                :
                null
            }

            <form onSubmit={handleSubmit(handleImagesUpdate)} className="w-full max-w-2xl mx-auto mt-12 px-4 md:px-0 space-y-6">
            
                {/* Image One */}
                <Controller
                    name="imageOne"
                    control={control}
                    render={({ field }) => (
                    <Input
                        label="Image One"
                        placeholder=""
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        inputClasses={`${
                        themeMode === 'dark' ? 'bg-transparent input-success border-3 text-white file:text-white' : 'bg-white border-gray-300 text-black file:text-black'
                        } rounded-md px-3 py-2 w-full`}
                        labelClasses=""
                    />
                    )}
                />
        
                {/* Image Two */}
                <Controller
                    name="imageTwo"
                    control={control}
                    render={({ field }) => (
                    <Input
                        label="Image Two"
                        placeholder=""
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        inputClasses={`${
                        themeMode === 'dark' ? 'bg-transparent input-success border-3 text-white file:text-white' : 'bg-white border-gray-300 text-black file:text-black'
                        } rounded-md px-3 py-2 w-full`}
                        labelClasses=""
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
        
    </div>
  
)
    
}

export default EditProductImages