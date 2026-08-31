import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    request.nextUrl.pathname.startsWith('/tenant')
  ) {
    // No user, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access auth routes, redirect to their tenant path or a default dashboard
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))
  ) {
    // In a real app we'd fetch their tenant and role to route them properly.
    // For now, redirect to a generic dashboard or setup page.
    const url = request.nextUrl.clone()
    url.pathname = '/tenant/dashboard' 
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
