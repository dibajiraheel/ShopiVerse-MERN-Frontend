import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GoogleLogin = async (mode) => {
    try {
        
        if (mode == 'customer') {
            console.log('calling customer');
            
            const response = await api.get('/auth/customer/google')
            console.log('response', response);
            
            return 
        }
        else if (mode == 'seller') {
            console.log('calling seller');

            const response = await api.get('/auth/seller/google')
            return
        }

    } catch (error) {
        console.log('ERROR OCCURED WHILE LOGIN', error.response.data.message);
        return error.response.data.message
    }
}


export default GoogleLogin