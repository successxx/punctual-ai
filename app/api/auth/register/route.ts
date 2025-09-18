import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo purposes
const mockUsers: any[] = []

function generateUsername(email: string): string {
  const baseName = email.split('@')[0].toLowerCase()
  const randomSuffix = Math.floor(Math.random() * 10000)
  return `${baseName}${randomSuffix}`
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = mockUsers.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Generate unique username and user ID
    const username = generateUsername(email)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create mock user profile
    const profile = {
      id: userId,
      email,
      name,
      username,
      subscription_tier: 'free',
      timezone: 'UTC',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Store in mock database
    mockUsers.push(profile)

    // Mock default availability (Mon-Fri 9-5)
    const defaultAvailability = []
    for (let day = 1; day <= 5; day++) { // Monday to Friday
      defaultAvailability.push({
        user_id: profile.id,
        day_of_week: day,
        start_time: '09:00:00',
        end_time: '17:00:00',
        is_available: true
      })
    }

    // Simulate successful registration
    return NextResponse.json({
      user: profile,
      message: 'Registration successful! Welcome to punctual.ai'
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}