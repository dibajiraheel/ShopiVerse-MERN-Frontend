import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const GetCustomerOrders = async (customerId, skip, limit) => {
    try {
        const response = await api.get(`/customer-order/get-customer-order/${customerId}/${skip}/${limit}`)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Getting Customer Orders', error);
        return false
    }
}



export default GetCustomerOrders


