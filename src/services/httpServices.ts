import axios, {AxiosResponse} from "axios";

const baseURL = 'http://localhost/api/'
const getRequest = async (url: string): Promise<AxiosResponse<any, any>> => {
    const token = localStorage.getItem('token')
    return await axios.get(`${baseURL}${url}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
}

const postRequest = async (url: string, data: Record<string, any> = {}, withAuth: undefined|null|boolean = true): Promise<AxiosResponse<any, any>> => {
    const token = localStorage.getItem('token')
    return await axios.post(
        `${baseURL}${url}`,
        data,
        ...(withAuth ? [{ headers: { Authorization: `Bearer ${token}` } }] : [])
    );
}

export {getRequest, postRequest}