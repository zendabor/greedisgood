import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/users', '/']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest, res: NextResponse) {
    const session = req.cookies.get('next-auth.session-token')
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    if (isProtectedRoute && !session?.value) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (isPublicRoute && session?.value) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}