import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GetSellerDashboard = async (sellerId, days) => {
    try {
        const response = await api.get(`/dashboard/seller/${days}`)
        console.log('RESPONSE AFTER CALLING API', response);
        
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured Whilte Getting Seller Dashboard', error);
        return false
    }
}



export default GetSellerDashboard   






