import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'react-use-cookie'

const EnsureAuthentication = ({authenticationRequired, children}) => {
    
    const accessToken = getCookie('accessToken')
    const _id = getCookie('_id')

    const [authenticated, setAuthenticated] = useState(false)
    console.log('AUTH REQUIRED', authenticationRequired);
    
    const navigate = useNavigate()
    useEffect(() => {
        if (!authenticationRequired) setAuthenticated(true)
        else {
            if ((accessToken) && (accessToken != 'null') && (accessToken != '') && ((_id) && (_id != 'null') && (_id != ''))){
                console.log('ACCESS TOKEN VALID', accessToken);
                console.log('ID VALID', _id);
                
                setAuthenticated(true)
            }
            else {
                navigate('/login')
            }
        }
    }, [authenticationRequired])



    if (authenticated) {
        return (
            
          
                
                children
            

        )
            
    }

}

export default EnsureAuthentication