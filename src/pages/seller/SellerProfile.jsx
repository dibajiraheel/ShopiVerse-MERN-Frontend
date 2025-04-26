import GetSellerProfile from '../../api/seller/GetSellerProfile'
import Navbar from '../../ui components/Navbar'
import sellerButtons from '../../utils/SellerNavarbarButtons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'react-use-cookie'
import { UpdateSellerProfileInStore } from '../../slices/seller/SellerProfile'
import { useNavigate } from 'react-router-dom'


const SellerProfile = () => {

    const sellerProfile = useSelector(state => state.sellerProfileStore)
    const [profileAvailable, setProfileAvailable] = useState(true)


    useEffect(() => {
        
            
        if (sellerProfile.userName  || sellerProfile.cnic  || sellerProfile.address || sellerProfile.phoneNo  || sellerProfile.province  || sellerProfile.city) {

            if (sellerProfile.userName != '' || sellerProfile.cnic != '' || sellerProfile.address != ''|| sellerProfile.phoneNo != '' || sellerProfile.province != '' || sellerProfile.city != '') {
                
                setProfileAvailable(true)    
                return
            }

        }

        setProfileAvailable(false)
        
    }, [sellerProfile])

    const dispatch = useDispatch()

    // profile pic url
    const profilePicUrl = useSelector(state => state.authenticationStore.profilePicUrl)



    



    useEffect(() => {
        
        const FetchProfile = async () => {
            const response = await GetSellerProfile()
            console.log('GET SELLER PROFILE RESPONSE RECEIVED', response);
            
            if (!response) return
            dispatch(UpdateSellerProfileInStore({profile: response}))
            return
        }

        if (!profileAvailable) {
            FetchProfile()
            setProfileAvailable(true)
        }
    }, [profileAvailable])

    const themeMode = useSelector(state => state.themeStore.mode)
    const [sellerbuttons, setSellerbuttons] = useState(null)
    const navigate = useNavigate()
    const navbarSellerButtons = sellerButtons()
    useEffect(() => {
        const UpdateProfileButton = {
            classes: `${
              themeMode == "dark"
                ? "bg-transparent border border-cyan-500"
                : "bg-cyan-500"
            } rounded-md hover:bg-cyan-600 hover:bg-cyan-800`,
            text: "Update Profile",
            onClick: () => {
              navigate('/seller/update/profile')
            }
        }
        setSellerbuttons([...navbarSellerButtons, UpdateProfileButton])
    }, [])
    

    if (profileAvailable) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-transparent">
            <div>
              <Navbar
                buttons={sellerbuttons}
                mode={'seller'}
                dashboardNavigateLink={'/dashboard'}
                profileNavigateLink={'/seller/profile'}
              />
            </div>

            <div className='flex flex-row justify-center items-center pt-20'>
              <div className="avatar">
                <div className="w-48 rounded-full">
                  <img src={`${ profilePicUrl ? profilePicUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} `} />
                </div>
              </div>
            </div>
    
            <div className="py-10 flex justify-center px-4 sm:px-8">
              <div
                className={`w-full max-w-6xl rounded-2xl shadow-xl p-8 sm:p-12 ${
                  themeMode === 'dark' ? 'bg-transparent text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <h2 className="text-3xl sm:text-4xl italic font-extrabold mb-10 text-center">
                  Seller Profile Information
                </h2>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-14">
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>Username</p>
                    <p className="font-bold text-2xl">{sellerProfile.userName}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>CNIC</p>
                    <p className="font-bold text-2xl">{sellerProfile.cnic}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>Phone Number</p>
                    <p className="font-bold text-2xl">{sellerProfile.phoneNo}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>Address</p>
                    <p className="font-bold text-2xl">{sellerProfile.address}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>Province</p>
                    <p className="font-bold text-2xl">{sellerProfile.province}</p>
                  </div>
                  <div>
                    <p className={`font-semibold ${themeMode == 'dark' ? 'text-purple-300' : 'text-black'} text-xl mb-1`}>City</p>
                    <p className="font-bold text-2xl">{sellerProfile.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

    else {

        return (

            <div className='min-w-screen min-h-screen'>
                
                <div>
                    <Navbar buttons={sellerbuttons} mode={'seller'} dashboardNavigateLink={'/dashboard'} profileNavigateLink={'/seller/profile'} />
                </div>

                

                <div className={`pt-20 flex flex-row justify-center items-center text-4xl font-extrabold italic ${themeMode == 'dark' ? 'text-white' : 'text-black'}`}>
                    <h1 className='w-2/3 pt-50'>Currently There Is Nothing To Show In Your Profile. Kindly Update Profile To Add New Products In Your Seller Account 😊</h1>
                </div>
                
            </div>

        )

    }
  
}

export default SellerProfile






