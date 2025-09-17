# Google Calendar Integration Setup

## Prerequisites
- Premium subscription active
- Google account

## Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "Punctual AI"
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External"
   - App name: "Punctual AI"
   - User support email: Your email
   - Add your domain: punctual.ai
   - Add authorized domains: punctual.ai, vercel.app

4. Create OAuth client:
   - Application type: "Web application"
   - Name: "Punctual AI Web"
   - Authorized redirect URIs:
     - `https://punctual.ai/api/google/callback`
     - `http://localhost:3000/api/google/callback` (for testing)

5. Copy the Client ID and Client Secret

### 3. Update Vercel Environment Variables

Run these commands with your actual values:

```bash
echo "YOUR_CLIENT_ID.apps.googleusercontent.com" | vercel env add GOOGLE_CLIENT_ID production --force
echo "GOCSPX-YOUR_CLIENT_SECRET" | vercel env add GOOGLE_CLIENT_SECRET production --force
```

### 4. Redeploy the Application

```bash
vercel --prod
```

### 5. Connect Your Google Calendar (As a Premium User)

1. Subscribe to Premium at https://punctual.ai/pricing
2. Go to Dashboard > Settings
3. Click "Connect Google Calendar"
4. Authorize the application
5. Your calendar is now synced!

## Features for Premium Users

- ✅ Automatic Google Calendar event creation
- ✅ Google Meet links included
- ✅ 2-way sync with your calendar
- ✅ Email reminders to attendees
- ✅ Prevent double bookings
- ✅ Custom booking URLs (punctual.ai/yourname)

## Troubleshooting

If calendar connection fails:
1. Ensure you have a Premium subscription
2. Check that the redirect URI matches exactly
3. Make sure the Google Calendar API is enabled
4. Verify environment variables are set correctly

## Security Note

The integration uses OAuth 2.0 with refresh tokens stored securely in Supabase. We only request the minimum scopes needed for calendar functionality.