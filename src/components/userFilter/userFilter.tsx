import { userFilter } from "@/consts/userFilterForm";
import { useUsers } from "@/hooks/useUsers";
import { Button, ButtonGroup, Container, Input } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const UserFilter = () => {
    const { register, handleSubmit } = useForm();
    const { push, query } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { filteredUsers } = useUsers()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const values = Object.entries(data);
        const params = new URLSearchParams(searchParams);

        values.forEach(item => {
            if (!!item[1]) {
                params.set(item[0], item[1]);
            } else {
                params.delete(item[0]);
            }
        });

        await push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        filteredUsers()
    }, [query])

    return (
        <Container sx={{ marginBottom: 3 }}>
            <ButtonGroup component='form' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register(userFilter.email)}
                    placeholder={userFilter.email}
                    sx={{ marginRight: 2 }}
                />
                <Input
                    {...register(userFilter.name)}
                    placeholder={userFilter.name}
                    sx={{ marginRight: 2 }}
                />
                <Button type='submit'>фильтрануть</Button>
            </ButtonGroup>
        </Container>
    );
};

export default UserFilter;
