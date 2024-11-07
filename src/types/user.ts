import { ParsedUrlQuery } from "querystring"

export interface User {
    id: number | string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface userParams extends ParsedUrlQuery {
    id: string
}