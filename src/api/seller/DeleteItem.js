import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const DeleteItem = async (itemId, sellerId) => {
    try {
        const response = await api.delete(`/item/delete-item/${itemId}`)
        console.log('RESPONSE AFTER CALLING API', response);
        
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log(`Some Error Occured Whilte Deleting Seller's Item`, error);
        return false
    }
}



export default DeleteItem   






