import { Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: session } = useSession();
    return (
        <Container>
            {/* //ну типа как будто оно там должно быть */}
            <Typography component='p'>Привет, {session?.user?.name || 'пользак'}!</Typography>
        </Container>
    );
}
