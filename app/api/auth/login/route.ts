import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (authError) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Get user profile from profiles table
    const { data: profile, error: _profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    // If profile doesn't exist, create one
    let userProfile = profile
    if (!profile) {
      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          name: authData.user.email?.split('@')[0],
          subscription_tier: 'free'
        })
        .select()
        .single()

      userProfile = newProfile
    }

    const response = NextResponse.json({
      user: userProfile,
      session: authData.session
    })

    // Set auth cookies for the session
    if (authData.session) {
      response.cookies.set('access-token', authData.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      response.cookies.set('refresh-token', authData.session.refresh_token || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })
    }

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}