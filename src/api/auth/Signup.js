import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const Signup = async (data, mode) => {
    if (mode == 'seller') {

        try {
            const response = await api.post('/auth/seller/signup', data)
            console.log('RESPONSE IN API', response);
            return response.data.message
        } catch (error) {
            console.log('Some Error Occured Whilte Signing Up', error);
            return error.response.data.message
        }

    }
    else if (mode == 'customer') {
       
        try {
            const response = await api.post('/auth/customer/signup', data)
            console.log('RESPONSE IN API', response);
            return response.data.message
        } catch (error) {
            console.log('Some Error Occured Whilte Signing Up', error);
            return error.response.data.message
        }

    }
}



export default Signup










