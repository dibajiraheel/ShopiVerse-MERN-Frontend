import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const GetSellerProfile = async () => {
    try {
        const response = await api.get('/auth/seller/profile')
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured Whilte Getting Seller Profile', error);
        return false
    }
}


export default GetSellerProfile





