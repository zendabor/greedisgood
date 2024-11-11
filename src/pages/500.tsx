import CustomError from '@/components/error/customError'

export default function Custom500() {
    return (
        <CustomError statusCode={500} />
    )
}