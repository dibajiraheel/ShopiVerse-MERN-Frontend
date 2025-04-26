import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const UpdateCustomerProfilePic = async (data) => {
    try {
        console.log('PICTURE DATA', data);
        
        const response = await api.post('/auth/customer/upload-profile-pic', data)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured Whilte Updating Customer Profile Pic', error);
        return false
    }
}




export default UpdateCustomerProfilePic


