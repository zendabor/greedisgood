import { Avatar, Container, Typography } from "@mui/material"
import useSWR from "swr";

const UserProfile = ({ userKey }: { userKey: string[] }) => {
    const { data: user, isLoading, error } = useSWR(userKey)
    if (error) return <div>Ошибка загрузки</div>;
    if (isLoading) return <div>Загрузка...</div>;
    return (
        <Container>
            <Typography component='h1'>{user.first_name} {user.last_name}</Typography>
            <Typography component='span'>Email: {user.email}</Typography>
            <Avatar src={user.avatar} />
        </Container>
        // <></>
    )
}

export default UserProfile