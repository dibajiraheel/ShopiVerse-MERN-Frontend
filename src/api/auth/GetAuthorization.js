import axios from 'axios'
import config from '../../../config'

const api = axios.create({
    baseURL: config.apiBaseUrl, // Your backend URL
    withCredentials: true, // Automatically send cookies
});



const GetAuthorization = async () => {
    const response = await api.get('/auth/authorization')
    if (response.data.statusCode != 200) return false
    return response.data.data 
}


export default GetAuthorization






