import axios, {AxiosResponse} from "axios";

const token = localStorage.getItem('token')
const baseURL = 'http://localhost/api/'
const getRequest = async (url: string): Promise<AxiosResponse<any, any>> => {
    return await axios.get(`${baseURL}${url}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
}

const postRequest = async (url: string, data: {}, withAuth: undefined|null = true): Promise<AxiosResponse<any, any>> => {
    console.log('withAuth', withAuth)
    return await axios.post(
        `${baseURL}${url}`,
        data,
        ...(withAuth ? [{ headers: { Authorization: `Bearer ${token}` } }] : [])
    );
}

export {getRequest, postRequest}