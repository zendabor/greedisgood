import useSWR from 'swr'
import { getUsers } from '@/api/api'
import type { User } from '@/types/user'
import { useId } from 'react';
import { Path } from '@/consts/path';
import { useRouter } from 'next/router';

export const useUsers = () => {
    const { data: users, error, isLoading, mutate } = useSWR(Path.users, getUsers)
    const id = useId()
    const { query } = useRouter()

    const addUser = async (user: User) => {
        if (!users) return null
        //на счет аватарки не знаю,можно типа фигануть через new formdata, но в самом апи я не нашел чтобы можно было слать картинки
        const newUser: User = { ...user, id }
        await mutate([...users, newUser], { revalidate: false })
    }

    const deleteUser = (id: number | string) => {
        if (!users) return null
        const newUsers = users?.filter((user) => user.id !== id)
        mutate(newUsers, { revalidate: false })
    }

    const filteredUsers = async () => {
        const { email, name } = query;

        if (!email && !name) {
            await mutate(users, { revalidate: true })
            return
        }

        const filteredUsers = users?.filter(user => {
            const bool = (user.email.includes(String(email))) || user.first_name.toLowerCase().includes(String(name).toLowerCase())
            return bool
        });

        await mutate(filteredUsers, { revalidate: false });
    };

    return { users, error, isLoading, addUser, deleteUser, filteredUsers, mutate }
}
