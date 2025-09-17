// Demo Setup Script - Sets up demo data for testing
// Run with: npx tsx scripts/setup-demo.ts

import { createHash } from 'crypto'

const API_KEY = 'test-api-key-punctual-ai-2024'
const API_KEY_HASH = createHash('sha256').update(API_KEY).digest('hex')

console.log('=== Punctual.AI Demo Setup ===\n')

console.log('1. First, copy the SQL schema from supabase-schema.sql and run it in your Supabase SQL Editor')
console.log('   This will create all necessary tables and functions.\n')

console.log('2. Add the following .env.local variables:')
console.log('   (Replace with your actual Supabase values)\n')
console.log(`NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${Buffer.from(Date.now().toString()).toString('base64')}

# Optional: Add later for email
RESEND_API_KEY=re_your_api_key

# API Configuration
API_RATE_LIMIT=1000
API_KEY_SALT=random-salt-${Date.now()}
CLIENTS_AI_WEBHOOK_SECRET=webhook-secret-${Date.now()}\n`)

console.log('3. Create an API client for testing:')
console.log('   Run this SQL in Supabase SQL Editor:\n')
console.log(`-- Create test API client for Clients.AI
INSERT INTO api_clients (
  name,
  api_key_hash,
  webhook_url,
  rate_limit,
  is_active
) VALUES (
  'Clients.AI Test',
  '${API_KEY_HASH}',
  'http://localhost:3001/webhooks/punctual',
  1000,
  true
);`)

console.log(`\n4. Your test API key is: ${API_KEY}`)
console.log('   Use this in the X-API-Key header when testing the API\n')

console.log('5. Test the API:')
console.log('   npm run dev')
console.log('   Then run: npx tsx scripts/test-api.ts\n')

console.log('6. Test the web UI:')
console.log('   - Register at http://localhost:3000/register')
console.log('   - Set availability in dashboard')
console.log('   - Share your booking link')
console.log('   - Test booking as a guest\n')

console.log('=== Setup Complete ===')
console.log('\nIMPORTANT: Make sure your Supabase project "punctual-ai" is active')
console.log('and you've run the SQL schema before starting the app.')