import { api } from '@/api/api';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await api.post('login', credentials);
                    if (response) {
                        return { id: response.data.token };
                    }
                    return null;
                } catch (err) {
                    console.error('Ошибка авторизации:', err);
                    throw new Error('Ошибка сервера');
                }
            }
        })
    ],
    pages: {
        signIn: 'login',
        error: 'error',
    }
};

export default NextAuth(authOptions);
