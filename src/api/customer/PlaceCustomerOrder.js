import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const PlaceCustomerOrder = async (customerId) => {
    try {
        const response = await api.post(`/customer-order/add-customer-order`)
        console.log('RESPONSE IN API', response);
        
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured Placing Customer Order', error);
        return false
        
    }
}



export default PlaceCustomerOrder




