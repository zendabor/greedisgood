import { userFilter } from "@/consts/userFilterForm";
import { useUsers } from "@/hooks/useUsers";
import { debounce } from "@/utils/debounce";
import { Button, ButtonGroup, Container, Input } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const UserFilter = () => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const { push, query } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { filteredUsers, setFilterToDefault } = useUsers()

    const getValues = () => {
        for (const [key, value] of Object.entries(userFilter)) {
            setValue(value, sessionStorage.getItem(value))
        }
    }

    useEffect(() => {
        getValues()
    }, []);

    useEffect(() => {
        filteredUsers()
    }, [query])

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

        if (!!params.size) {
            await push(`${pathname}?${params.toString()}`);
        }
    };

    const setValues = (key: string, value: string) => {
        console.log(key, value)
        sessionStorage.setItem(key, value);
    }

    const clearAll = async () => {
        reset()
        setFilterToDefault()
        await push(`${pathname}`);
    }

    return (
        <Container sx={{ marginBottom: 3 }}>
            <ButtonGroup component='form' onSubmit={handleSubmit(onSubmit)}>
                {Object.values(userFilter).map(input => {
                    return (
                        <Input
                            {...register(input)}
                            placeholder={input}
                            sx={{ marginRight: 2 }}
                            onChange={e => debounce(setValues(input, e.target.value), 100)}
                        />
                    )
                })}
                <Button type='submit'>фильтрануть</Button>
                <Button onClick={clearAll}>очистить</Button>
            </ButtonGroup>
        </Container>
    );
};

export default UserFilter;
