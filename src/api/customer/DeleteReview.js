import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const DeleteReview = async (itemId, customerId, reviewId) => {
    try {
        const response = await api.delete(`/review/delete-review/${itemId}/${reviewId}`)
        if (response.data.statusCode != 200) return false
        return true
    } catch (error) {
        console.log('Some Error Occured While Deleting Review', error);
        return false
        
    }
}



export default DeleteReview