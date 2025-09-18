import { NextRequest } from 'next/server'
import { createHash } from 'crypto'
import { supabaseAdmin } from './supabase'

export interface APIClient {
  id: string
  name: string
  api_key_hash: string
  is_active: boolean
  rate_limit: number
  created_at: string
  last_used_at?: string
}

export interface APIAuthResult {
  valid: boolean
  error?: string
  client?: APIClient
}

export async function validateAPIKey(request: NextRequest): Promise<APIAuthResult> {
  const apiKey = request.headers.get('X-API-Key')

  if (!apiKey) {
    return { valid: false, error: 'Missing API key' }
  }

  // Hash the API key for comparison
  const hashedKey = createHash('sha256').update(apiKey).digest('hex')

  // Check against database
  const { data: client, error } = await supabaseAdmin
    .from('api_clients')
    .select('*')
    .eq('api_key_hash', hashedKey)
    .eq('is_active', true)
    .single()

  if (error || !client) {
    return { valid: false, error: 'Invalid API key' }
  }

  // Update last used timestamp
  await supabaseAdmin
    .from('api_clients')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', client.id)

  // Check rate limits
  const rateLimitCheck = await checkRateLimit(client.id)
  if (!rateLimitCheck.allowed) {
    return { valid: false, error: 'Rate limit exceeded' }
  }

  // Log the API request
  await supabaseAdmin
    .from('api_logs')
    .insert({
      client_id: client.id,
      endpoint: request.nextUrl.pathname,
      method: request.method,
      status_code: 200
    })

  return { valid: true, client }
}

async function checkRateLimit(clientId: string): Promise<{ allowed: boolean }> {
  // Get client's rate limit
  const { data: client } = await supabaseAdmin
    .from('api_clients')
    .select('rate_limit')
    .eq('id', clientId)
    .single()

  if (!client) {
    return { allowed: false }
  }

  // Count requests in the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count } = await supabaseAdmin
    .from('api_logs')
    .select('*', { count: 'exact', head: true })
    .eq('client_id', clientId)
    .gte('created_at', oneHourAgo)

  return { allowed: (count || 0) < (client.rate_limit || 1000) }
}

export async function sendWebhook(webhookUrl: string, data: Record<string, unknown>) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.CLIENTS_AI_WEBHOOK_SECRET || ''
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      console.error(`Webhook failed: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error('Webhook error:', error)
  }
}