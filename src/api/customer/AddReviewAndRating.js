import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const AddReviewAndRating = async (itemId, customerId, data) => {
    try {
        const response = await api.post(`/review/add-review/${itemId}`, data)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Adding Review And Rating', error);
        return false
    }
}



export default AddReviewAndRating


