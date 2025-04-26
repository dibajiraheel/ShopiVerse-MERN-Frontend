import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const SwitchOrderStatus = async (orderId, sellerId, isCompleted) => {

    console.log('SWITCH ORDER STATUS CALLED', orderId, sellerId, isCompleted);
    
    try {
        const response = await api.post(`/seller-order/update-seller-order-status/${orderId}/${isCompleted}`)
        console.log('response', response);
        
        if (response.data.message == 'success') {
            return true
        }
        else if (response.data.message == 'Invalid Seller Order Id') {
            return 'Invalid Seller'
        }
        else if (response.data.message == 'Seller Order Do Not Belong To This Seller Id') {
            return 'Seller Do Not Have Authority'
        }

    } catch (error) {
        console.log('ERROR OCCURED WHILE SWITCHING ORDER STATUS', error);
        return false
    }
}


export default SwitchOrderStatus






