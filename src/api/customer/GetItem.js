import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const GetItem = async (itemId) => {
    try {
        const response = await api.get(`/item/get-item/${itemId}`)
        console.log('RESPONSE IN API', response);
        
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Getting Item', error);
        return false
        
    }
}



export default GetItem




