import axios from 'axios'
import config from '../../../config'
const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const GetSellerOrders = async (sellerId, skip, limit, dispatch) => {

    try {
        const response = await api.get(`/seller-order/get-seller-order-limited/${sellerId}/${skip}/${limit}`)
        if (response.data.statusCode == 200) {
            console.log('API ORDER RECEIVED', response.data);
            return response.data.data
        }
    } catch (error) {
    console.log('ERROR OCCURED WHILE GETTING SELLER ORDERS', error);
    return false
    }

}



export default GetSellerOrders