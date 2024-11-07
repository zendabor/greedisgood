import CustomError from '@/components/error/customError'
import { NextPageContext } from 'next'



export default function Custom500({ statusCode = 500 }) {
    return (
        <CustomError statusCode={statusCode} />
    )
}


Custom500.getInitialProps = ({ }: NextPageContext) => {
    return { statusCode: 500 }
}
