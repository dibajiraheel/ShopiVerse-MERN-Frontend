import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const UpdateReview = async (itemId, customerId, reviewId, data) => {
    try {
        const response = await api.post(`/review/update-review/${itemId}/${reviewId}`, data)
        console.log('RESPONSE IN API', response);
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured While Updating Review', error);
        return false
        
    }
}



export default UpdateReview















