import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button'
import { getCookie } from 'react-use-cookie';
import Navbar from '../../components/customer/Navbar';
import GetCustomerProfile from '../../api/customer/GetCustomerProfile';
import { AddProfileInCustomerSlice } from '../../slices/customer/CustomerProfileSlice';

const CustomerProfile = () => {

    // get theme mode from store
    const themeMode = useSelector(state => state.themeStore.mode)

    // get profile of customer
    const [isProfileAvailable, setIsProfileAvailable] = useState(true)
    const [profile, setProfile] = useState({
        name: "John Doe",
        city: "Karachi",
        province: "Sindh",
        address: "123 Street, Block A",
        phoneNo: "0300-1234567",
    });

    const storeProfile = useSelector(state => state.customerProfileStore.profile)
    const [profileFetched, setProfileFetched] = useState(true)
    useEffect(() => {
        const keys = Object.keys(storeProfile)
        if (keys.length == 0) {
            setProfileFetched(false)
        }
        else {
            setProfile(storeProfile)
        }
    }, [storeProfile])

    
    // profile pic url
    const profilePicUrl = useSelector(state => state.authenticationStore.profilePicUrl)


    // Fetch Profile From Api
    const customerId = getCookie('_id')
    const dispatch = useDispatch()
    const FetchProfile = async () => {
        const response = await GetCustomerProfile(customerId)
        if (!response) return
        dispatch(AddProfileInCustomerSlice({profile: response}))
    }

    useEffect(() => {
        if (!profileFetched) {
            FetchProfile()
            setProfileFetched(true)
        }
    }, [profileFetched])


    const bgClass = themeMode === "light" ? "bg-white shadow-lg border" : "bg-transparent";

    const navigate = useNavigate()

    return (

        <div className='min-w-screen min-h-screen'>

            <div className='sticky top-0 backdrop-blur-3xl z-10'>
                <Navbar />
            </div>

            <div className={`mt-10 flex flex-col gap-5 items-center justify-center p-4 ${themeMode === 'light' ? 'bg-gray-100' : 'bg-transparent'}`}>
            
            <div className='flex flex-row justify-center items-center pt-20'>
                <div className="avatar">
                    <div className="w-48 rounded-full">
                        <img src={`${profilePicUrl ? profilePicUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} `} />
                    </div>
                </div>
            </div>

            <div
                className={`w-full max-w-xl rounded-2xl shadow-md p-6 space-y-4 
                ${themeMode === 'light' ? 'bg-white' : 'bg-transparent border border-gray-700'}`}
            >
                {isProfileAvailable ? (
                <>
                    <h2 className="text-2xl font-semibold text-center">Customer Profile</h2>
        
                    <div className="space-y-2">
                    <div>
                        <p className="text-sm">User Name</p>
                        <p className="text-base font-medium">{profile.userName}</p>
                    </div>
                    <div>
                        <p className="text-sm">City</p>
                        <p className="text-base font-medium">{profile.city}</p>
                    </div>
                    <div>
                        <p className="text-sm">Province</p>
                        <p className="text-base font-medium">{profile.province}</p>
                    </div>
                    <div>
                        <p className="text-sm">Address</p>
                        <p className="text-base font-medium">{profile.address}</p>
                    </div>
                    <div>
                        <p className="text-sm">Phone No</p>
                        <p className="text-base font-medium">{profile.phoneNo}</p>
                    </div>
                    </div>
                </>
                ) : (
                <div className="text-center">
                    <p className="text-lg">Please update your profile.</p>
                </div>
                )}
        
                <div className="pt-4 text-center">
                <Button
                    onClick={() => navigate('/customer/update-profile')}
                    classes={`${themeMode == "dark" ? "bg-transparent border border-yellow-500" : "bg-yellow-500"} rounded-md hover:bg-yellow-600 hover:bg-yellow-800`}
                    text={'Update Profile'}
                />
                </div>
            </div>
            
            </div>

        </div>

    );

}

export default CustomerProfile