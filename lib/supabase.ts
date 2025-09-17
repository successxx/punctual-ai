import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_key'

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client with service role (admin access)
// This should only be used in API routes, not in client components
export const supabaseAdmin = typeof window === 'undefined' && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Server-side Supabase client for SSR
// This function is only for server components and API routes
export async function createServerSupabaseClient() {
  if (typeof window !== 'undefined') {
    throw new Error('createServerSupabaseClient can only be used on the server')
  }

  const ssr = await import('@supabase/ssr')
  const nextHeaders = await import('next/headers')
  const cookieStore = await nextHeaders.cookies()

  return ssr.createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: ssr.CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: ssr.CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}