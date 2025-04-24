import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const DeleteItemFromCart = async (itemId, customerId) => {
    try {
        const response = await api.delete(`/cart/delete-item-from-cart/${itemId}/${customerId}`)
        console.log('RESPONSE IN API', response);
        
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured While Deleting Item From Cart', error);
        return false
        
    }
}



export default DeleteItemFromCart