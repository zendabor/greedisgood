import { api } from '@/api/api';
import NextAuth, { Awaitable, NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials: Awaitable<User | null>) {
                console.log(credentials)
                try {
                    const response = await api.post('login', credentials);
                    if (response) {
                        console.log(response)
                        return response;
                    }
                    return null;
                } catch (err) {
                    console.error('Ошибка авторизации:', err);
                    throw new Error('Ошибка сервера');
                }
            }
        })
    ]
};

export default NextAuth(authOptions);