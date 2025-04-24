import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GetSellerItem = async (itemId) => {
    try {
        console.log('ITEM ID GOT', itemId);
        
        const response = await api.get(`/item/get-item/${itemId}`)
        if (response.data.message == 'success') return response.data.data
        return false
    } catch (error) {
        console.log('Some Error Occured While Getting Item', error)
        return false
    }
}

export default GetSellerItem