import useSWR from 'swr'
import { getUsers } from '@/api/api'
import type { atUser, User } from '@/types/user'
import { useId } from 'react';
import { Path } from '@/consts/path';
import { useRouter } from 'next/router';

export const useUsers = () => {
    const { data: users, error, isLoading, mutate } = useSWR(Path.users, getUsers)
    const id = useId()
    const { query } = useRouter()

    const addUser = async (data: atUser) => {
        if (!data) return null
        const ava = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(data.avatar[0])
            reader.onload = () => resolve(reader.result?.toString() || '')
            reader.onerror = reject
        })
        const newUser: User = { ...data, id, avatar: ava }
        await mutate([...users || [], newUser], { revalidate: false })
    }

    const deleteUser = async (id: number | string) => {
        if (!users) return null
        const newUsers = users?.filter((user) => user.id !== id)
        await mutate(newUsers, { revalidate: false })
    }

    const filteredUsers = async () => {
        const { email, name } = query;

        if (!email && !name) {
            await mutate(users, { revalidate: true })
            return
        }

        const filteredUsers = users?.filter(user => {
            return (user.email.toLowerCase().includes(String(email))) || user.first_name.toLowerCase().includes(String(name).toLowerCase())
        });

        await mutate(filteredUsers, { revalidate: false });
    };

    const setFilterToDefault = async () => {
        await mutate(users, { revalidate: false })
    }

    return { users, error, isLoading, addUser, deleteUser, filteredUsers, mutate, setFilterToDefault }
}
