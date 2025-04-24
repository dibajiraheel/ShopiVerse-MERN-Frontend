import axios from 'axios'
import config from '../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GetItemReviews = async (itemId) => {
    try {
        const response = await api.get(`/review/get-review/${itemId}`)
        console.log('RESPONSE RECEIVED FORM BACKEND FOR REVIEWS', response);
        
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured Whilte Getting Item Reviews', error);
        return false
    }
}



export default GetItemReviews