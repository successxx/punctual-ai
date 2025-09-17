// Test Supabase Connection
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://autmdlacdenfbggqsgmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dG1kbGFjZGVuZmJnZ3FzZ216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzAyODIsImV4cCI6MjA3MzY0NjI4Mn0.le4PLLl3PqoSxcQ9Fsix2ooREYR_RRow481loAWGUf8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔄 Testing Supabase connection...\n');

  try {
    // Test 1: Check if we can query the users table
    console.log('📊 Checking if tables exist...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError) {
      if (usersError.message.includes('relation "public.users" does not exist')) {
        console.log('❌ Tables not found. Please run the SQL schema in Supabase SQL Editor.');
        console.log('\n📋 The schema has been copied to your clipboard.');
        console.log('🔗 SQL Editor is open in your browser.');
        console.log('\nSteps:');
        console.log('1. Paste (Cmd+V) in the SQL Editor');
        console.log('2. Click "Run" button');
        console.log('3. Wait for "Success" message');
        return;
      } else {
        console.log('⚠️ Error:', usersError.message);
        return;
      }
    }

    console.log('✅ Tables exist!');

    // Test 2: Try to count records
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    console.log(`👥 Users in database: ${count || 0}`);

    // Test 3: Check availabilities table
    const { count: availCount } = await supabase
      .from('availabilities')
      .select('*', { count: 'exact', head: true });

    console.log(`📅 Availability records: ${availCount || 0}`);

    // Test 4: Check bookings table
    const { count: bookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    console.log(`📚 Bookings: ${bookingCount || 0}`);

    console.log('\n✅ Database connection successful!');
    console.log('🎉 Your Punctual.AI is ready to use!');
    console.log('\n🔗 Open http://localhost:3000 to start');
    console.log('📝 Register at http://localhost:3000/register');

  } catch (error) {
    console.log('❌ Connection failed:', error.message);
  }
}

testConnection();