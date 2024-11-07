import { Button, Input, Typography } from "@mui/material"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { authType } from "@/consts/authForm";
import { useUsers } from "@/hooks/useUsers";

//да все стырено из формы логина и можно по сути переиспользовать чисто закидывая сюда функцию сабмита

const ModalForm = () => {
    // const schema = yup.object().shape({
    //     email: yup.string()
    //         .email('Некорректный email')
    //         .required('Email обязателен'),
    //     password: yup.string()
    //         .min(8, 'Пароль должен быть не менее 8 символов')
    //         .required('Пароль обязателен'),
    // });

    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: yupResolver(schema),
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
                    {...register('name')}
                    type="text"
                    placeholder={'name'} />
                {/* {errors.email && <Typography component='span' color='warning'>{errors.email.message}</Typography>} */}
            </div>
            <div>
                <Input
                    {...register('lastname')}
                    type="text"
                    placeholder={'lastname'} />
                {/* {errors.email && <Typography component='span' color='warning'>{errors.email.message}</Typography>} */}
            </div>
            <div>
                <Input
                    {...register('email')}
                    type="email"
                    placeholder={'email'} />
                {/* {errors.email && <Typography component='span' color='warning'>{errors.email.message}</Typography>} */}
            </div>
            <Button variant="contained" type="submit">создать</Button>
        </form>
    )
}

export default ModalForm