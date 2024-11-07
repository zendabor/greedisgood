import { Box, Button, Container, Input } from "@mui/material"
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/useUsers";
import style from './styles'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'


const ModalForm = () => {
    const schema = yup.object().shape({
        email: yup.string()
            .email('Некорректный email')
            .required('Email обязателен'),
        lastname: yup.string()
            .min(3, 'ты короткий')
            .required('обязателен'),
        name: yup.string()
            .min(3, 'ты короткий')
            .required('обязателен'),
    });
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            lastname: '',
            email: ''
        }
    });

    const { addUser } = useUsers()

    const onSubmit = (data: any) => {
        addUser({ ...data, avatar: '' })
    }

    return (
        <Container sx={style.formContainer}>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={style.formBlock}>
                <Box>
                    <Input
                        {...register('name')}
                        type="text"
                        placeholder={'name'} />
                </Box>
                <Box>
                    <Input
                        {...register('lastname')}
                        type="text"
                        placeholder={'lastname'} />
                </Box>
                <Box>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder={'email'} />
                </Box>
                <Button variant="contained" type="submit">создать</Button>
            </Box>
        </Container>
    )
}

export default ModalForm