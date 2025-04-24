import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const GetItems = async (skip, limit) => {
    try {
        const response = await api.get(`/item/get-items-for-customer/${skip}/${limit}`)
        if (response.data.statusCode != 200) return false
        return response.data.data
    } catch (error) {
        console.log('Some Error Occured While Getting Items', error);
        return false
        
    }
}



export default GetItems


