import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const UpdateCustomerProfileApi = async (data) => {
    try {
        const response = await api.post('/auth/customer/update-profile', data)
        
        console.log('SENDING DATA TO UPDATE PROFILE', data);
        console.log('RESPONSE RECEIVED', response);
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured While Updating Customer Profile', error);
        return false
    }
}


export default UpdateCustomerProfileApi







