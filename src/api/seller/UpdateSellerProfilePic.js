import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const UpdateSellerProfilePic = async (data) => {
    try {
        const response = await api.post('/auth/seller/upload-profile-pic', data)
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured Whilte Updating Seller Profile Pic', error);
        return false
    }
}




export default UpdateSellerProfilePic


