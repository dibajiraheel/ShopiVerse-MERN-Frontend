import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});




const DecreaseItemStock = async (itemId, decreaseBy) => {

    try {   
        const response = await api.post(`/item/decrease-item-stock/${itemId}/${decreaseBy}`)
        if (response.data.message == 'success') return true
        else return false
    } catch (error) {
        console.log('ERROR OCCURED WHILE DECREASING ITEM STOCK', error);
        return false
    }

}



export default DecreaseItemStock


