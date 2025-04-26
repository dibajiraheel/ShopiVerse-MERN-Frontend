import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GetAuthorization from '../api/auth/GetAuthorization'
import { UpdateAuthenticationInStore } from '../slices/AuthenticationSlice'

const EnsureAuthentication = ({authenticationRequired, children}) => {
    
    const userAuthenticatedInStore = useSelector(state => state.authenticationStore.authenticated)
    const dispatch = useDispatch()
    const [authenticatedVerifiedFromBackend, setAuthenticatedVerifiedFromBackend] = useState(true)
    const [alreadyAuthenticatedVerifiedFromBackend, setAlreadyAuthenticatedVerifiedFromBackend] = useState(false)
    // const [authenticatedFoundInStore, setAuthenticatedFoundInStore] = useState(true)

    const [authenticated, setAuthenticated] = useState(false)
    console.log('AUTH REQUIRED', authenticationRequired);
    
    const navigate = useNavigate()
    useEffect(() => {
        console.log('ENSURE AUTHENTICATION USER EFFECT FIRST CALLED');
        
        if (!authenticationRequired) setAuthenticated(true)
        else {
            if (userAuthenticatedInStore){
                console.log('User Authenticated In Store', userAuthenticatedInStore);
                setAuthenticated(true)
            }
            else {
                if (!alreadyAuthenticatedVerifiedFromBackend){
                    setAuthenticatedVerifiedFromBackend(false)
                }
                else {
                    navigate('/login')
                }
            }
        }
    }, [authenticationRequired, userAuthenticatedInStore])


    const FetchAuthorization = async () => {
        const response = await GetAuthorization()
        setAuthenticatedVerifiedFromBackend(true)
        setAlreadyAuthenticatedVerifiedFromBackend(true)
        console.log('RESPONSE OF AUTHENTICATION FROM BACKEND', response);
        
        if (!response) {
            dispatch(UpdateAuthenticationInStore({authenticated: false, profilePicUrl: response.profilePicUrl}))
            return
        }
        dispatch(UpdateAuthenticationInStore({authenticated: true, profilePicUrl: response.profilePicUrl}))
        return
    }

    useEffect(() => {
        console.log('ENSURE AUTHENTICATION USER EFFECT SECOND CALLED');

        if ((!userAuthenticatedInStore) && (!authenticatedVerifiedFromBackend)) {
            FetchAuthorization()
        }
    }, [userAuthenticatedInStore, authenticatedVerifiedFromBackend])

    if (authenticated) {
        return (
            
          
                
                children
            

        )
            
    }

}

export default EnsureAuthentication