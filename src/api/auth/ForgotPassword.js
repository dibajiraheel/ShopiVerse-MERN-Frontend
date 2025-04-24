import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const VerifyEmail = async (email, isSellerMode) => {
    
    if (!isSellerMode) {

        try {

            const response = await api.post('/auth/customer/forgot-password', {'email': email})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {
            console.log('ERROR IN EMAIL VERIFICATION', error);
            if (error.response.data.statusCode == 400) return false

        }
        
        
        

    }

    else if (isSellerMode) {
        
            try {

            const response = await api.post('/auth/seller/forgot-password', {'email': email})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {
            console.log('ERROR IN EMAIL VERIFICATION', error);
            if (error.response.data.statusCode == 400) return false
            
        }
            
    
    }

}



const VerifyOtp = async (otp, isSellerMode) => {

    if (!isSellerMode) {

        try {

            const response = await api.post('/auth/customer/verify-otp', {'otp': otp})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {

            if (error.response.data.statusCode == 400) return false
            
        }

    }

    else if (isSellerMode) {

        try {

            const response = await api.post('/auth/seller/verify-otp', {'otp': otp})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {

            if (error.response.data.statusCode == 400) return false
            
        }
    }

}


const UpdatePassword = async (newPassword, isSellerMode) => {

    if (!isSellerMode) {

        try {

            const response = await api.post('/auth/customer/update-password', {'newPassword': newPassword})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {

            if (error.response.data.statusCode == 400) return false
            
        }

    }

    else if (isSellerMode) {

        try {

            const response = await api.post('/auth/seller/update-password', {'newPassword': newPassword})
            console.log('RESPONSE RECEIVED ON EMAIL VERIFICATION', response);
            if (response.data.statusCode == 200)  return true
            
        } catch (error) {

            if (error.response.data.statusCode == 400) return false
            
        }
    }

}



export { VerifyEmail, VerifyOtp, UpdatePassword }