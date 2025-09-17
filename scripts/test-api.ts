// API Test Script - Tests all API endpoints
// Run with: npx tsx scripts/test-api.ts

const API_KEY = 'test-api-key-punctual-ai-2024'
const BASE_URL = 'http://localhost:3000/api/v1'

async function testAPI() {
  console.log('=== Testing Punctual.AI API ===\n')

  // Test API documentation endpoint
  console.log('1. Testing API docs endpoint...')
  try {
    const docsResponse = await fetch(`${BASE_URL}/docs`)
    const docs = await docsResponse.json()
    console.log('✅ API docs available:', docs.info.title, docs.info.version)
  } catch (error) {
    console.log('❌ API docs failed:', error)
  }

  // Test user creation via API
  console.log('\n2. Testing user creation via API...')
  const testUserId = `test-user-${Date.now()}`
  try {
    const userResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        email: `${testUserId}@test.com`,
        password: 'Test123!',
        name: 'Test User',
        username: testUserId,
        timezone: 'America/New_York',
        booking_duration: 30,
        availability: [
          {
            day_of_week: 1,
            start_time: '09:00:00',
            end_time: '17:00:00',
            is_active: true
          },
          {
            day_of_week: 2,
            start_time: '09:00:00',
            end_time: '17:00:00',
            is_active: true
          }
        ]
      })
    })

    if (userResponse.ok) {
      const userData = await userResponse.json()
      console.log('✅ User created:', userData.data.id)

      // Test booking creation
      console.log('\n3. Testing booking creation via API...')
      const startTime = new Date()
      startTime.setDate(startTime.getDate() + 1)
      startTime.setHours(14, 0, 0, 0)

      const endTime = new Date(startTime)
      endTime.setMinutes(endTime.getMinutes() + 30)

      const bookingResponse = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({
          user_id: userData.data.id,
          guest_name: 'John Doe',
          guest_email: 'john@example.com',
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          notes: 'Test booking via API'
        })
      })

      if (bookingResponse.ok) {
        const bookingData = await bookingResponse.json()
        console.log('✅ Booking created:', bookingData.data.id)
      } else {
        const error = await bookingResponse.json()
        console.log('❌ Booking failed:', error.error)
      }

      // Test available slots
      console.log('\n4. Testing available slots endpoint...')
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 2)

      const slotsResponse = await fetch(`${BASE_URL}/availability/slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY
        },
        body: JSON.stringify({
          user_id: userData.data.id,
          date: tomorrow.toISOString().split('T')[0]
        })
      })

      if (slotsResponse.ok) {
        const slotsData = await slotsResponse.json()
        console.log('✅ Available slots:', slotsData.data.slots.length, 'slots found')
      } else {
        const error = await slotsResponse.json()
        console.log('❌ Slots query failed:', error.error)
      }

      // Test fetching bookings
      console.log('\n5. Testing bookings list endpoint...')
      const bookingsResponse = await fetch(`${BASE_URL}/bookings?userId=${userData.data.id}`, {
        headers: {
          'X-API-Key': API_KEY
        }
      })

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json()
        console.log('✅ Bookings fetched:', bookingsData.data.length, 'bookings')
      } else {
        const error = await bookingsResponse.json()
        console.log('❌ Bookings fetch failed:', error.error)
      }

    } else {
      const error = await userResponse.json()
      console.log('❌ User creation failed:', error.error)
      console.log('Make sure you have created the API client in Supabase first!')
    }
  } catch (error) {
    console.log('❌ API test failed:', error)
    console.log('Make sure the server is running: npm run dev')
  }

  console.log('\n=== API Test Complete ===')
}

testAPI()