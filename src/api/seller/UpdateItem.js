import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const UpdateItem = async (data, itemId, sellerId) => {
    try {
       const response = await api.post(`/item/update-item-bio/${itemId}/${sellerId}`, data)
       if (response.data.statusCode != 200) return false
       return true
    } catch (error) {
        console.log('Some Error Occured While Updating Item', error);
        return false
    }
}



export default UpdateItem







