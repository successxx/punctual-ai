import { NextRequest, NextResponse } from 'next/server';
import { getTokens } from '@/lib/google-calendar';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // This is the user ID
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=google_auth_denied`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=invalid_request`
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await getTokens(code);

    // Save refresh token to user profile
    await supabaseAdmin
      .from('profiles')
      .update({
        google_refresh_token: tokens.refresh_token,
        google_calendar_connected: true
      })
      .eq('id', state);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=google_connected`
    );
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=google_auth_failed`
    );
  }
}