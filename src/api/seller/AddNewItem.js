import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});


const AddNewItem = async (data) => {
    try {
        const response = await api.post('item/add-item', data)
        if (response.data.success == true || response.data.success == 'true') return response.data.data
        return false
    } catch (error) {
        console.log('Some Error Occured Whilte Adding New Item', error);
        return false
    }
}


export default AddNewItem