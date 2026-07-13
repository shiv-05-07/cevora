import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Next.js Proxy to handle route protection and automatic token refreshing.
 * Validates Supabase Auth tokens for protected paths and redirects accordingly.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env variables are missing, skip auth check to prevent boot crashes
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Retrieve user. getUser() triggers token refresh securely on the server.
  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  
  // Protected paths that require active login:
  const isProtectedPath = 
    path.startsWith('/dashboard') || 
    path.startsWith('/missions') || 
    path.startsWith('/roadmaps') || 
    path.startsWith('/analytics') || 
    path.startsWith('/settings');

  // Authentication paths that should only be accessible to logged-out users:
  const isAuthPath = path.startsWith('/login') || path.startsWith('/register');

  if (isProtectedPath && !user) {
    // Redirect anonymous users to /login
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectTo', path);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthPath && user) {
    // Redirect already authenticated users to dashboard
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder assets)
     * - any image or vector extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
