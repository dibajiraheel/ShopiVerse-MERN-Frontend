import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/customer/Navbar'
import React, { useState, useEffect } from 'react'
import { getCookie } from 'react-use-cookie'
import { useForm, Controller } from 'react-hook-form'
import Input from '../../components/Input'
import Button from '../../components/Button'
import UpdateCustomerProfileApi from '../../api/customer/UpdateCustomerProfile'
import { useNavigate } from 'react-router-dom'
import UpdateCustomerProfilePic from '../../api/customer/UpdateCustomerProfilePic'
import { AddProfileInCustomerSlice } from '../../slices/customer/CustomerProfileSlice'

const UpdateCustomerProfile = () => {
  const themeMode = useSelector(state => state.themeStore.mode)
  const customerProfile = useSelector(state => state.customerProfileStore.profile)

  useEffect(() => {
    if (customerProfile.userName) setValue('userName', customerProfile.userName)
    if (customerProfile.cnic) setValue('cnic', customerProfile.cnic)
    if (customerProfile.phoneNo) setValue('phoneNo', customerProfile.phoneNo)
    if (customerProfile.address) setValue('address', customerProfile.address)
    if (customerProfile.province) setValue('province', customerProfile.province)
    if (customerProfile.city) setValue('city', customerProfile.city)
  }, [customerProfile])

  const { control, handleSubmit, setValue } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateProfile = async (data) => {
    console.log("DATA FROM FORM", data);
    
    setIsSubmitting(true)
    setError(false)

    if (!(data.userName && data.cnic && data.phoneNo && data.address && data.province && data.city)) {
        return
    }

    console.log('PROFILE USERNAME', customerProfile.userName);
    
    if (!((data.userName == customerProfile.userName) && (data.cnic == customerProfile.cnic) && (data.phoneNo == customerProfile.phoneNo) && (data.address == customerProfile.address) && (data.province == customerProfile.province) && (data.city == customerProfile.city))) {
      
      const formData = new FormData()
      formData.append('userName', data.userName)
      formData.append('cnic', data.cnic)
      formData.append('phoneNo', data.phoneNo)
      formData.append('address', data.address)
      formData.append('province', data.province)
      formData.append('city', data.city)
  
      const response = await UpdateCustomerProfileApi(formData)
      if (!response) {
        setIsSubmitting(false)
      }
  
      dispatch(AddProfileInCustomerSlice({ profile: { ...formData } }))
      setIsSubmitting(false)
      navigate('/customer/profile')
      return

    }

    setIsSubmitting(false)
  }

  const handleUpdateProfilePic = async (data) => {
    console.log('DATA RECEIVED IN HANDLER OF UPDATE PROFILE PICTURE', data);
    if (data.profilePic) {
        setIsSubmitting(true)
        const formData = new FormData()
        formData.append('profilePic', data.profilePic)
        const response = await UpdateCustomerProfilePic(formData)
        if (!response) return
        navigate('/customer/profile')
        setIsSubmitting(false)
        return
    }
    setIsSubmitting(false)
    return

  }

  return (
    <div className={`min-w-screen min-h-screen ${themeMode === 'dark' ? 'bg-transparent' : 'bg-white'}`}>
      <Navbar/>

      <div className="flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
        <div
          className={`w-full max-w-4xl rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300 ${
            themeMode === 'dark'
              ? 'bg-transparent text-white border border-gray-700'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <h1 className="pt-10 sm:pt-16 text-2xl sm:text-3xl md:text-4xl text-center italic font-extrabold mb-6 sm:mb-10">
            Customer Profile
          </h1>

          {error && (
            <div className="mb-6">
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-extrabold italic text-center ${themeMode === 'dark' ? 'text-white' : 'text-black'}`}>
                ALL FIELDS REQUIRED TO UPDATE PROFILE 🤔
              </h1>
            </div>
          )}

          {/* Profile Picture on top center */}
          <div className="flex justify-center items-center px-4 py-10">
            <form
                onSubmit={handleSubmit(handleUpdateProfilePic)}
                className={`flex flex-col items-center w-full max-w-sm shadow-md rounded-lg p-6 
                ${themeMode === 'dark' ? 'bg-transparent border border-green-500' : 'bg-amber-100'}`}
            >
                <Controller
                name="profilePic"
                control={control}
                render={({ field }) => (
                    <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        className="hidden"
                    />
                    <img
                        src={
                        getCookie('profilePicUrl') ||
                        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                        }
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full border-4 border-pink-500 hover:opacity-80 transition duration-300"
                    />
                    </label>
                )}
                />

                <Button
                classes={`mt-6 w-full text-white font-semibold py-2 px-4 transition rounded-md 
                    ${themeMode === 'dark' ? 'bg-transparent border border-pink-500' : 'bg-pink-500 hover:bg-pink-600'}`}
                text={'Update Profile Picture'}
                />
            </form>
          </div>


          {/* Two-column form below the profile picture */}
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6"
          >
            {['userName', 'cnic', 'phoneNo', 'address', 'province', 'city'].map((fieldName, index) => (
              <Controller
                key={index}
                name={fieldName}
                control={control}
                render={({ field }) => (
                  <Input
                    label={fieldName === 'userName' ? 'User Name' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                    onChange={field.onChange}
                    placeholder={
                      fieldName === 'userName' ? 'username' :
                      fieldName === 'cnic' ? '11111-1111111-1' :
                      fieldName === 'phoneNo' ? '0300-1234567' :
                      fieldName === 'address' ? 'House No: 123, Sector 1, Gulshan, Karachi' :
                      fieldName === 'province' ? 'Punjab' :
                      fieldName === 'city' ? 'Karachi' : ''
                    }
                    value={field.value}
                    type="text"
                    inputClasses={`${
                      themeMode === 'dark'
                        ? 'bg-transparent input-success border-2 text-white'
                        : 'bg-white border-gray-300 text-black'
                    } rounded-md px-3 py-2 w-full`}
                    labelClasses={`text-base sm:text-lg ${themeMode === 'dark' ? 'text-white' : 'text-black'}`}
                  />
                )}
              />
            ))}

            <div className="md:col-span-2 mt-4 flex justify-center">
              <Button
                text={isSubmitting ? 'Updating' : 'Update'}
                classes={`${
                  themeMode === 'dark'
                    ? 'bg-transparent border border-green-500 text-green-500'
                    : 'bg-green-500 text-white'
                } rounded-md px-6 py-2 hover:bg-green-600 transition-all duration-200`}
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateCustomerProfile
