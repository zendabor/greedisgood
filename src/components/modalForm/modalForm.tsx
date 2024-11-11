import { Box, Button, Container, Input, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useUsers } from "@/hooks/useUsers";
import style from './styles'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Dispatch, SetStateAction } from "react";

const ModalForm = ({ onClose }: { onClose: Dispatch<SetStateAction<boolean>> }) => {
    const schema = yup.object().shape({
        email: yup.string()
            .email('Некорректный email')
            .required('Email обязателен'),
        last_name: yup.string()
            .min(3, 'ты короткий')
            .required('обязателен'),
        first_name: yup.string()
            .min(3, 'ты короткий')
            .required('обязателен'),
        avatar: yup.mixed<FileList>()
            .required("Файл обязателен")
            .test(
                "fileSize",
                "Размер файла не должен превышать 3 МБ",
                value => value[0].size <= 3 * 1024 * 1024
            )
            .test(
                "fileType",
                "Допустимы только изображения",
                value => ["image/jpeg"].includes(value[0].type)
            )
            .test(
                "singleFile",
                "Можно загрузить только один файл",
                value => value.length === 1
            ),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            avatar: undefined
        }
    });

    const { addUser } = useUsers()

    const onSubmit = async (data: any) => {
        addUser(data)
        onClose(false)
    }

    return (
        <Container sx={style.formContainer}>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={style.formBlock}>
                {/* по хорошему конечно вынести дефолт инпуты в массив и замапить их так как все однотипные, но попозже */}
                <Box>
                    <Input
                        {...register('first_name')}
                        type="text"
                        placeholder='name' />
                    {errors.first_name && <Typography>{errors.first_name.message}</Typography>}
                </Box>
                <Box>
                    <Input
                        {...register('last_name')}
                        type="text"
                        placeholder='lastname' />
                    {errors.last_name && <Typography>{errors.last_name.message}</Typography>}
                </Box>
                <Box>
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder='email' />
                    {errors.email && <Typography>{errors.email.message}</Typography>}
                </Box>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    size="small"
                    color="secondary"
                >
                    <Typography>загрузите аватар</Typography>
                    <Box component='input'
                        {...register('avatar')}
                        sx={style.hiddenInput}
                        type="file"
                    />
                </Button>
                {errors.avatar && <Typography>{errors.avatar.message}</Typography>}
                <Button variant="contained" type="submit">создать</Button>
            </Box>
        </Container>
    )
}

export default ModalForm