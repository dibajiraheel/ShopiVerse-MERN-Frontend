import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GetSellerItems = async (sellerId, skip, limit) => {
    try {
        console.log('SELLER ID RECEIVED TO FETCH SELLER ITEMS', sellerId);
        
        const response = await api.get(`/item/get-items/${sellerId}/${skip}/${limit}`)
        if (response.data.statusCode == 200) {
            return response.data.data
        }
        
    } catch (error) {
        console.log('ERROR OCCURED WHILE GETTING SELLER PRODUCTS', error);
        return false
    }
}


export default GetSellerItems






