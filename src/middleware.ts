import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Only set the cookie if we're on the home page
    if (request.nextUrl.pathname === '/') {
        const page = request.nextUrl.searchParams.get('page') || '1'
        response.cookies.set('lastVisitedPage', page, {
            maxAge: 60 * 60, // 1 hour
            path: '/',
        })
    }

    return response
}

export const config = {
    matcher: '/',
}