import axios, {AxiosResponse} from "axios";

const token = localStorage.getItem('token')
const baseURL = 'http://127.0.0.1:8000/api/'
const getRequest = async (url: string):  Promise<AxiosResponse<any, any>> => {
    return await axios.get(`${baseURL}${url}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
}

const postRequest = async (url: string, data: {}):  Promise<AxiosResponse<any, any>> => {
    return await axios.post(`${baseURL}${url}`, data, {
        headers: {Authorization: `Bearer ${token}`},
    })
}

export { getRequest, postRequest }