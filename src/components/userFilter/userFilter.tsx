import { userFilter } from "@/consts/userFilterForm";
import { useUsers } from "@/hooks/useUsers";
import { ButtonGroup, Container, Input } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const UserFilter = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { filteredUsers } = useUsers()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const values = Object.entries(data)
        const params = new URLSearchParams(searchParams);
        values.forEach(item => {
            if (!!item[1]) {
                params.set(item[0], item[1])
            }
            else {
                params.delete(item[0])
            }
        })
        router.replace(`${pathname}?${params.toString()}`)
        filteredUsers()
    };

    return (
        <Container sx={{ marginBottom: 3 }}>
            <ButtonGroup>
                <Input
                    {...register(userFilter.email)}
                    placeholder={userFilter.email}
                    onBlur={() => handleSubmit(onSubmit)()}
                    sx={{ marginRight: 2 }}
                />
                <Input
                    {...register(userFilter.name)}
                    placeholder={userFilter.name}
                    onBlur={() => handleSubmit(onSubmit)()}
                />
            </ButtonGroup>
        </Container>
    );
};

export default UserFilter;
