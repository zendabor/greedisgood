
import CustomError from '@/components/error/customError'
import type { ErrorProps } from 'next/error'

function Custom404({ statusCode }: ErrorProps) {
    return (
        <CustomError statusCode={statusCode} />
    )
}

Custom404.getInitialProps = async () => {
    return { statusCode: 404 }
}

export default Custom404
