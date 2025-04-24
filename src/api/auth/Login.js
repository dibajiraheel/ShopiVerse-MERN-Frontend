import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});

const Login = async (credentials, mode) => {
    try {
        
        if (mode == 'customer') {
            const response = await api.post('/auth/customer/login', credentials)
            return response.data
        }
        else if (mode == 'seller') {
            const response = await api.post('/auth/seller/login', credentials)
            return response.data
        }

    } catch (error) {
        console.log('ERROR OCCURED WHILE LOGIN', error.response.data.message);
        return error.response.data.message
    }
    
    
}



export default Login