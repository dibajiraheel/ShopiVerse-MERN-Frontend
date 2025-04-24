import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const UpdateItemImages = async (data, itemId, sellerId) => {
    try {
        console.log('DATA RECEIVED IN API', data);
        
        const response = await api.post(`/item/update-item-images/${itemId}/${sellerId}`, data)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Updating Item Images', error);
        return false
    }
}


export default UpdateItemImages











