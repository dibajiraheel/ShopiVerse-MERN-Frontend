import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const IncreaseItemStock = async (itemId, increaseBy) => {

    try {   
        const response = await api.post(`/item/increase-item-stock/${itemId}/${increaseBy}`)
        if (response.data.message == 'success') return true
        else return false
    } catch (error) {
        console.log('ERROR OCCURED WHILE INCREASING ITEM STOCK', error);
        return false
    }

}



export default IncreaseItemStock


