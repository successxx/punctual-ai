import { NextRequest, NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google-calendar';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  // Get user from session
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID required' },
      { status: 400 }
    );
  }

  // Check if user is premium
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier')
    .eq('id', userId)
    .single();

  if (profile?.subscription_tier !== 'premium') {
    return NextResponse.json(
      { error: 'Premium subscription required' },
      { status: 403 }
    );
  }

  // Generate auth URL with user ID in state
  const authUrl = getAuthUrl(userId);

  return NextResponse.redirect(authUrl);
}