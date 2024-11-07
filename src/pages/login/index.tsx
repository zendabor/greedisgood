import { useForm } from 'react-hook-form';
import { Button, Input, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Path } from '@/consts/path';
import { authType } from '@/consts/authForm';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string()
      .email('Некорректный email')
      .required('Email обязателен'),
    password: yup.string()
      .min(8, 'Пароль должен быть не менее 8 символов')
      .required('Пароль обязателен'),
  });

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  });

  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const resp = await signIn('credentials', {
        redirect: false,
        ...data
      });
      if (resp?.ok) {
        router.push(Path.profile);
      }
      if (resp?.error) {
        //знаю, что сюда надо message запхать
        setError('root', { message: resp?.error });
      }
    } catch (error) {
      setError('root', { message: 'Произошла ошибка при авторизации' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register(authType.email)}
          type="email"
          placeholder={authType.email} />
        {errors.email && <Typography component='span' color='warning'>{errors.email.message}</Typography>}
      </div>
      <div>
        <Input
          {...register(authType.password)}
          type="password"
          placeholder={authType.password} />
        {errors.password && <Typography component='span' color='warning'>{errors.password.message}</Typography>}
      </div>
      {errors.root && <Typography component='span' color='warning'>{errors.root?.message || 'ошибочка'}</Typography>}
      <Button variant="contained" type="submit">sign in</Button>
    </form>
  );
}