const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setupDatabase() {
  console.log('Checking database tables...')
  console.log('\nNOTE: To create tables, please use the Supabase dashboard SQL editor:')
  console.log('https://app.supabase.com/project/autmdlacdenfbggqsgmz/sql/new')
  console.log('\nSQL to create required tables:')
  console.log('================================')
  console.log(`
-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  username TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Availability table
CREATE TABLE IF NOT EXISTS availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_availability_user_id ON availability(user_id);

-- API clients table
CREATE TABLE IF NOT EXISTS api_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  api_key_hash TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  rate_limit INTEGER DEFAULT 1000,
  webhook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_used_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_api_clients_api_key_hash ON api_clients(api_key_hash);

-- API logs table
CREATE TABLE IF NOT EXISTS api_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES api_clients(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_api_logs_client_id ON api_logs(client_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at);
  `)
  console.log('================================')

  // Test if tables exist by querying them
  console.log('\n\nVerifying which tables currently exist...')
  console.log('================================')

  const { data: profiles, error: profilesCheckError } = await supabase
    .from('profiles')
    .select('count')
    .limit(1)

  if (!profilesCheckError) {
    console.log('✓ profiles table exists')
  } else {
    console.log('✗ profiles table not accessible:', profilesCheckError.message)
  }

  const { data: availability, error: availabilityCheckError } = await supabase
    .from('availability')
    .select('count')
    .limit(1)

  if (!availabilityCheckError) {
    console.log('✓ availability table exists')
  } else {
    console.log('✗ availability table not accessible:', availabilityCheckError.message)
  }

  const { data: apiClients, error: apiClientsCheckError } = await supabase
    .from('api_clients')
    .select('count')
    .limit(1)

  if (!apiClientsCheckError) {
    console.log('✓ api_clients table exists')
  } else {
    console.log('✗ api_clients table not accessible:', apiClientsCheckError.message)
  }

  const { data: apiLogs, error: apiLogsCheckError } = await supabase
    .from('api_logs')
    .select('count')
    .limit(1)

  if (!apiLogsCheckError) {
    console.log('✓ api_logs table exists')
  } else {
    console.log('✗ api_logs table not accessible:', apiLogsCheckError.message)
  }

  console.log('\nDatabase setup complete!')
  console.log('\nIMPORTANT: If tables are not accessible, please create them manually in your Supabase dashboard.')
  console.log('Go to: https://app.supabase.com/project/autmdlacdenfbggqsgmz/editor')
}

setupDatabase().catch(console.error)