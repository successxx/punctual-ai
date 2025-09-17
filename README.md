# Punctual.AI - Simple Scheduling Platform

A fully functional booking system like Calendly, with both a beautiful web interface and a complete REST API for integration with other platforms like Clients.AI.

## Features

### Web Application
- 🔐 User registration and authentication
- 📅 Visual availability management
- 🔗 Unique booking links (punctual.ai/username)
- 📧 Email notifications for both parties
- 🚫 Anti-double-booking with atomic transactions
- 📱 Fully responsive design
- 🎨 Beautiful, minimalist UI (Jony Ive inspired)

### API for Integration
- 🔌 Complete REST API
- 🔑 API key authentication
- 📊 Rate limiting
- 🪝 Webhook support
- 📖 OpenAPI documentation

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Supabase account (free tier)
- Optional: Resend account for emails

### 2. Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the entire contents of `supabase-schema.sql`
3. Get your API keys from Settings → API

### 3. Environment Setup

Create `.env.local` with your Supabase credentials:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Email (optional)
RESEND_API_KEY=re_your_api_key

# API Configuration
API_RATE_LIMIT=1000
API_KEY_SALT=random-salt
CLIENTS_AI_WEBHOOK_SECRET=webhook-secret
```

### 4. Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### 5. Create API Client (for Clients.AI integration)

Run this SQL in your Supabase SQL Editor:

```sql
INSERT INTO api_clients (
  name,
  api_key_hash,
  webhook_url,
  rate_limit,
  is_active
) VALUES (
  'Clients.AI',
  SHA256('your-api-key-here'),
  'https://clients.ai/webhooks/punctual',
  1000,
  true
);
```

## Testing

### Web UI Flow
1. Register at `/register`
2. Set availability in dashboard
3. Copy your booking link
4. Share with clients
5. Test booking as guest

### API Testing

```bash
# Run setup script for demo data
npx tsx scripts/setup-demo.ts

# Test API endpoints
npx tsx scripts/test-api.ts
```

## API Documentation

View full API docs at: `http://localhost:3000/api/v1/docs`

### Key Endpoints

- `POST /api/v1/users` - Create user
- `GET /api/v1/bookings` - List bookings
- `POST /api/v1/bookings` - Create booking
- `POST /api/v1/availability/slots` - Get available slots

### Authentication

Include API key in headers:
```
X-API-Key: your-api-key
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Production Checklist

- [ ] Set production Supabase URLs
- [ ] Configure Resend with verified domain
- [ ] Set up Google Calendar OAuth (optional)
- [ ] Update CORS settings
- [ ] Enable rate limiting
- [ ] Set up monitoring

## Architecture

- **Frontend**: Next.js 14 with App Router
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Email**: Resend API

## Core User Journeys

### Business Owner Setup
1. Sign up → Get unique link
2. Set availability
3. Share link with clients

### Client Booking
1. Visit booking page
2. Select date & time
3. Enter details
4. Receive confirmation

### Anti-Double-Booking
- Atomic database transactions
- Real-time slot locking
- Automatic conflict detection

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT
