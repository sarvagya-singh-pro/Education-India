import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/verify'];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next(); // Allow access to public routes
  }

  // Check for JWT token in cookies
  const token = req.cookies.get('authToken')?.value; // Replace 'authToken' with your actual cookie name

  if (!token) {
    // Redirect to login if no token is found
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname); // Save the original path
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the token using jose
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(SECRET));

    // Token is valid, allow the request to continue
    req.user = decodedToken.payload; // Optionally attach the decoded user info to the request
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);

    // Redirect to login if the token is invalid or expired
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname); // Save the original path
    return NextResponse.redirect(loginUrl);
  }
}

// Define which routes should be protected (e.g., dashboard, profile)
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Protect all routes under /dashboard and /profile
};
