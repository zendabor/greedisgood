import { User } from "@/types/user";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://reqres.in/api/'
})

export const getUsers = async (): Promise<User[] | null> => {
    const { data } = await api.get('users')
    if (data) return data.data
    return null
}

export const getUser = async (id: string): Promise<User | null> => {
    const { data } = await api.get(`users/${id}`)
    if (data) return data.data
    return null
}