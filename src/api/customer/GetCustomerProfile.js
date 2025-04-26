import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const GetCustomerProfile = async (customerId) => {
    try {
        const response = await api.get(`/auth/customer/profile`)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Getting Customer Profile', error);
        return false
        
    }
}



export default GetCustomerProfile