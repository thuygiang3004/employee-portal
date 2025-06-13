import {defineStore} from "pinia";
import {ref} from "vue";
import {postRequest} from "@/services/httpServices.ts";

type User = {
    email: string,
    token: string,
    userName: string,
}
export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const error = ref(null)

    const login = async (data: {}) => {
        try {
            const response = await postRequest('users/login', data, false)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userName', response.data.name)

            console.log('token is', response.data.token)
            user.value = response.data
        } catch (error: any) {
            console.log(error)
            error.value = error.response?.data?.message || "Login failed. Please try again.";
        }
    }

    const logout = async () => {
        console.log('logging out')
        await postRequest('users/logout')

        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
    }

    return {user, error, login, logout}
})