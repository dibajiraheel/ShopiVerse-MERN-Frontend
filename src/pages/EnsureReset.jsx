import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GetAuthorization from '../api/auth/GetAuthorization'
import { ResetAuthenticationStore, UpdateAuthenticationInStore } from '../slices/AuthenticationSlice'
import { ResetCustomerOrdersSlice } from '../slices/customer/CustomerOrdersSlice'
import { ResetItemsInCustomerSlice } from '../slices/customer/CustomerItemsSlice'
import { ResetItemReviewsInCustomerSlice } from '../slices/customer/CustomerItemReviewsSlice'
import { ResetProfileInCustomerSlice } from '../slices/customer/CustomerProfileSlice'
import { setCookie } from 'react-use-cookie'

const EnsureAuthentication = ({children}) => {
    
    const [resetComplete, setResetComplete] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ResetCustomerOrdersSlice())
        dispatch(ResetItemsInCustomerSlice())
        dispatch(ResetItemReviewsInCustomerSlice())
        dispatch(ResetProfileInCustomerSlice())
        console.log('RESETTING STORE -----------');
        
        dispatch(ResetAuthenticationStore())
        
        setCookie('_id', null)
        setCookie('profilePicUrl', null)
        setCookie('accessToken', null)

        setResetComplete(true)

    }, [])


   
    if (resetComplete) {
        return (
            
          
                
                children
            

        )
            
    }

}

export default EnsureAuthentication