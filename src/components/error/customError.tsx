import Image from "next/image";

export default function CustomError({ statusCode = 404 }) {
    return (
        <div>
            <h1>Ошибка {statusCode}</h1>
            <p>Что-то пошло не так.</p>
            <div>
                <Image src={'./static/img/panic.gif'} alt="error image" />
            </div>
        </div>
    )
}