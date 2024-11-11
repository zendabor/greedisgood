import { Box, Typography } from "@mui/material";
import Image from "next/image";
import style from './styles'

export default function CustomError({ statusCode = 404 }) {
    return (
        <Box sx={style.errorContainer}>
            <Typography component='h1'>Ошибка {statusCode}</Typography>
            <Typography>Что-то пошло не так.</Typography>
            <Box>
                <Image src={'./static/img/panic.gif'} width={300} height={300} alt="error image" />
            </Box>
        </Box>
    )
}