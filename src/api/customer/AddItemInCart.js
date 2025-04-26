import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const AddItemInCart = async (itemId, customerId, itemQuantity) => {
    try {
        const response = await api.post(`/cart/add-item-in-cart/${itemId}/${itemQuantity}`)
        console.log('RESPONSE IN API', response);
        
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured While Adding Item In Cart', error);
        return false
        
    }
}



export default AddItemInCart