import { User } from '@/types/user';
import { useUsers } from '@/hooks/useUsers';
import { Card, Link, Avatar, Grid2, Typography, Button, Modal } from '@mui/material';
import { Path } from '@/consts/path';
import style from './style'
import { useSession } from 'next-auth/react';
import ModalForm from '../modalForm/modalForm';
import { useState } from 'react';

function UserList() {
    const { users, error, isLoading, deleteUser } = useUsers()
    const { data: Session } = useSession()
    const [open, setOpen] = useState(false)

    if (error) return <div>Ошибка загрузки</div>;
    if (isLoading) return <div>Загрузка...</div>;

    if (users?.length === 0) return <div>а нет никого</div>

    return (
        <>
            <Grid2 container spacing={8} sx={{ justifyContent: ['center', 'start'], position: 'relative' }}>
                {users?.map((user: User) => (
                    <Card key={user.id} variant="outlined" sx={style.card}>
                        <Link underline="always" href={`${Path.users}/${user.id}`} sx={style.avatarLink}>
                            <Typography component='span'>
                                {user.first_name}
                            </Typography>
                            <Typography component='span'>{user.email}</Typography>
                            <Avatar key={user.avatar} src={user.avatar} sx={style.avatar} alt='avatar' />
                        </Link>
                        {Session && <Button color='warning' onClick={() => deleteUser(user.id)}>удалить</Button>}
                    </Card>
                ))}

            </Grid2>
            {Session && <Button color='warning' sx={style.addUserBtn} onClick={() => setOpen(true)}>добавить</Button>}
            {open && <Modal open={open} onClose={() => setOpen(false)}>
                <ModalForm />
            </Modal>}
        </>
    );
}

export default UserList