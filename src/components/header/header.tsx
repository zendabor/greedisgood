import { Path } from "@/consts/path"
import { Box, Button, ButtonGroup } from "@mui/material"
import style from './style'
import { signOut, useSession } from "next-auth/react"

export const Header = () => {
    const { data: session } = useSession()
    return (
        <Box component='header' sx={style.header}>
            <ButtonGroup variant="text" component='nav' sx={{ gap: 1 }}>
                <Button variant="outlined" href={Path.main} >Home</Button>
                <Button variant="outlined" href={Path.users}>Users</Button>
                <Button variant="outlined" href={Path.profile}>Profile</Button>
                {session && <Button onClick={() => signOut()}>Sign out</Button>}
            </ButtonGroup>
        </Box >
    )
}
