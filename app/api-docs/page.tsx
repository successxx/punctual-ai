'use client'

import { useState } from 'react'
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Footer } from '@/components/premium/Footer'
import { Card, CardBody } from '@/components/premium/Card'
import { Button } from '@/components/premium/Button'
import { Code, Terminal, Zap, Key, ChevronRight, Copy, Check } from 'lucide-react'

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'javascript' | 'python'>('curl')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    curl: {
      auth: `curl -X POST https://api.punctual.ai/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "grant_type": "client_credentials"
  }'`,
      getAvailability: `curl -X GET https://api.punctual.ai/v1/availability \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"`,
      createBooking: `curl -X POST https://api.punctual.ai/v1/bookings \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "host_id": "user_123",
    "start_time": "2025-01-15T10:00:00Z",
    "duration": 30,
    "attendee": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "meeting_type": "consultation"
  }'`
    },
    javascript: {
      auth: `const response = await fetch('https://api.punctual.ai/v1/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    grant_type: 'client_credentials'
  })
});

const { access_token } = await response.json();`,
      getAvailability: `const response = await fetch('https://api.punctual.ai/v1/availability', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
});

const availability = await response.json();`,
      createBooking: `const response = await fetch('https://api.punctual.ai/v1/bookings', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    host_id: 'user_123',
    start_time: '2025-01-15T10:00:00Z',
    duration: 30,
    attendee: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    meeting_type: 'consultation'
  })
});

const booking = await response.json();`
    },
    python: {
      auth: `import requests

response = requests.post(
    'https://api.punctual.ai/v1/auth/token',
    json={
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'grant_type': 'client_credentials'
    }
)

access_token = response.json()['access_token']`,
      getAvailability: `import requests

response = requests.get(
    'https://api.punctual.ai/v1/availability',
    headers={
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
)

availability = response.json()`,
      createBooking: `import requests

response = requests.post(
    'https://api.punctual.ai/v1/bookings',
    headers={
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    },
    json={
        'host_id': 'user_123',
        'start_time': '2025-01-15T10:00:00Z',
        'duration': 30,
        'attendee': {
            'name': 'John Doe',
            'email': 'john@example.com'
        },
        'meeting_type': 'consultation'
    }
)

booking = response.json()`
    }
  }

  return (
    <Layout>
      <Navigation />

      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" background="secondary">
          <Container size="wide">
            <div className="text-center mb-[var(--space-8)]">
              <Eyebrow variant="accent">Developer Resources</Eyebrow>
              <Headline level={1} size="3xl" align="center" className="mb-[var(--space-4)]">
                API Documentation
              </Headline>
              <Lead align="center" className="mb-[var(--space-6)]">
                Build powerful scheduling integrations with the punctual.ai API
              </Lead>
              <div className="flex justify-center gap-[var(--space-4)]">
                <Button variant="primary" size="large" href="https://api.punctual.ai/playground" external>
                  API Playground
                </Button>
                <Button variant="secondary" size="large" href="https://github.com/punctualai/api-examples" external>
                  <Code className="w-5 h-5" />
                  View Examples
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Quick Start */}
        <Section spacing="default">
          <Container size="wide">
            <div className="grid lg:grid-cols-3 gap-[var(--space-6)]">
              <Card variant="bordered">
                <CardBody>
                  <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
                    <Key className="w-8 h-8 text-[var(--brand-primary)]" />
                    <h3 className="text-[var(--fs-lg)] font-[var(--fw-semibold)]">1. Get API Keys</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                    Generate your API credentials from the dashboard settings
                  </p>
                  <Button variant="minimal" href="/dashboard/settings/api">
                    Get API Keys <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
                    <Terminal className="w-8 h-8 text-[var(--brand-primary)]" />
                    <h3 className="text-[var(--fs-lg)] font-[var(--fw-semibold)]">2. Make First Call</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                    Authenticate and make your first API request in minutes
                  </p>
                  <Button variant="minimal" href="#authentication">
                    View Examples <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <div className="flex items-center gap-[var(--space-3)] mb-[var(--space-4)]">
                    <Zap className="w-8 h-8 text-[var(--brand-primary)]" />
                    <h3 className="text-[var(--fs-lg)] font-[var(--fw-semibold)]">3. Build & Deploy</h3>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                    Integrate scheduling into your application seamlessly
                  </p>
                  <Button variant="minimal" href="#sdks">
                    Browse SDKs <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Main Documentation */}
        <Section spacing="spacious">
          <Container size="wide">
            <div className="grid lg:grid-cols-4 gap-[var(--space-8)]">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <Card variant="bordered" className="sticky top-24">
                  <CardBody>
                    <h3 className="text-[var(--fs-base)] font-[var(--fw-semibold)] mb-[var(--space-4)]">Contents</h3>
                    <nav className="space-y-[var(--space-2)]">
                      <a href="#introduction" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Introduction</a>
                      <a href="#authentication" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Authentication</a>
                      <a href="#endpoints" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Endpoints</a>
                      <a href="#bookings" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1 pl-[var(--space-4)]">Bookings</a>
                      <a href="#availability" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1 pl-[var(--space-4)]">Availability</a>
                      <a href="#users" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1 pl-[var(--space-4)]">Users</a>
                      <a href="#webhooks" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Webhooks</a>
                      <a href="#rate-limits" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Rate Limits</a>
                      <a href="#errors" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Error Handling</a>
                      <a href="#sdks" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">SDKs & Libraries</a>
                      <a href="#changelog" className="block text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-1">Changelog</a>
                    </nav>
                  </CardBody>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Prose>
                  <h2 id="introduction">Introduction</h2>
                  <p>
                    The punctual.ai API is a RESTful API that allows you to programmatically manage bookings, availability, and user data.
                    All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.
                  </p>

                  <Card variant="bordered" className="my-[var(--space-6)]">
                    <CardBody>
                      <p className="text-[var(--fs-sm)] font-mono">
                        <strong>Base URL:</strong> https://api.punctual.ai/v1
                      </p>
                      <p className="text-[var(--fs-sm)] font-mono">
                        <strong>Current Version:</strong> v1.0.0
                      </p>
                    </CardBody>
                  </Card>

                  <h2 id="authentication">Authentication</h2>
                  <p>
                    The punctual.ai API uses OAuth 2.0 for authentication. You'll need to obtain an access token before making API requests.
                  </p>

                  <h3>Getting an Access Token</h3>

                  {/* Language Selector */}
                  <div className="flex gap-[var(--space-2)] mb-[var(--space-4)]">
                    <button
                      onClick={() => setSelectedLanguage('curl')}
                      className={`px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] text-[var(--fs-sm)] ${
                        selectedLanguage === 'curl'
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('javascript')}
                      className={`px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] text-[var(--fs-sm)] ${
                        selectedLanguage === 'javascript'
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      JavaScript
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('python')}
                      className={`px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-md)] text-[var(--fs-sm)] ${
                        selectedLanguage === 'python'
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Python
                    </button>
                  </div>

                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody className="relative">
                      <button
                        onClick={() => copyToClipboard(codeExamples[selectedLanguage].auth, 'auth')}
                        className="absolute top-[var(--space-4)] right-[var(--space-4)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      >
                        {copiedCode === 'auth' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].auth}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h3>Response</h3>
                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read write"
}`}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h2 id="endpoints">API Endpoints</h2>

                  <h3 id="bookings">Bookings</h3>
                  <p>Manage bookings and appointments through the API.</p>

                  <h4>GET /bookings</h4>
                  <p>Retrieve a list of bookings with optional filters.</p>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border-default)]">
                        <th className="text-left py-[var(--space-3)] px-[var(--space-4)]">Parameter</th>
                        <th className="text-left py-[var(--space-3)] px-[var(--space-4)]">Type</th>
                        <th className="text-left py-[var(--space-3)] px-[var(--space-4)]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">start_date</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">ISO 8601</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Filter bookings after this date</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">end_date</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">ISO 8601</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Filter bookings before this date</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">status</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">string</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Filter by status (confirmed, pending, cancelled)</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">limit</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">integer</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Maximum number of results (default: 20, max: 100)</td>
                      </tr>
                    </tbody>
                  </table>

                  <h4>POST /bookings</h4>
                  <p>Create a new booking.</p>

                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody className="relative">
                      <button
                        onClick={() => copyToClipboard(codeExamples[selectedLanguage].createBooking, 'create')}
                        className="absolute top-[var(--space-4)] right-[var(--space-4)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      >
                        {copiedCode === 'create' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].createBooking}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h3 id="availability">Availability</h3>
                  <p>Query and manage user availability.</p>

                  <h4>GET /availability</h4>
                  <p>Get available time slots for a user.</p>

                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody className="relative">
                      <button
                        onClick={() => copyToClipboard(codeExamples[selectedLanguage].getAvailability, 'availability')}
                        className="absolute top-[var(--space-4)] right-[var(--space-4)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                      >
                        {copiedCode === 'availability' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{codeExamples[selectedLanguage].getAvailability}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h3 id="users">Users</h3>
                  <p>Manage user profiles and settings.</p>

                  <h4>GET /users/me</h4>
                  <p>Get the authenticated user's profile.</p>

                  <h4>PATCH /users/me</h4>
                  <p>Update the authenticated user's profile.</p>

                  <h2 id="webhooks">Webhooks</h2>
                  <p>
                    Webhooks allow you to receive real-time notifications when events occur in punctual.ai.
                    Configure webhook endpoints in your dashboard settings.
                  </p>

                  <h3>Available Events</h3>
                  <ul>
                    <li><code>booking.created</code> - A new booking was created</li>
                    <li><code>booking.updated</code> - A booking was modified</li>
                    <li><code>booking.cancelled</code> - A booking was cancelled</li>
                    <li><code>booking.completed</code> - A booking was completed</li>
                    <li><code>booking.reminder</code> - A reminder was sent</li>
                    <li><code>user.updated</code> - User profile was updated</li>
                    <li><code>availability.changed</code> - Availability settings changed</li>
                  </ul>

                  <h3>Webhook Payload</h3>
                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{`{
  "event": "booking.created",
  "created_at": "2025-01-15T10:00:00Z",
  "data": {
    "booking_id": "book_abc123",
    "host_id": "user_123",
    "attendee": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "start_time": "2025-01-20T14:00:00Z",
    "duration": 30,
    "status": "confirmed"
  }
}`}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h3>Webhook Security</h3>
                  <p>
                    All webhook payloads are signed with a secret key. Verify the signature to ensure the webhook is from punctual.ai:
                  </p>
                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h2 id="rate-limits">Rate Limits</h2>
                  <p>
                    API requests are rate limited to ensure fair usage and system stability:
                  </p>
                  <ul>
                    <li><strong>Free Plan:</strong> 100 requests per hour</li>
                    <li><strong>Premium Plan:</strong> 1,000 requests per hour</li>
                    <li><strong>Enterprise:</strong> Custom limits available</li>
                  </ul>

                  <p>Rate limit information is included in response headers:</p>
                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200`}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h2 id="errors">Error Handling</h2>
                  <p>
                    The API uses standard HTTP status codes to indicate success or failure:
                  </p>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border-default)]">
                        <th className="text-left py-[var(--space-3)] px-[var(--space-4)]">Status Code</th>
                        <th className="text-left py-[var(--space-3)] px-[var(--space-4)]">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">200 OK</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Request succeeded</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">201 Created</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Resource created successfully</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">400 Bad Request</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Invalid request parameters</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">401 Unauthorized</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Invalid or missing authentication</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">403 Forbidden</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Insufficient permissions</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">404 Not Found</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Resource not found</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">429 Too Many Requests</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Rate limit exceeded</td>
                      </tr>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <td className="py-[var(--space-3)] px-[var(--space-4)] font-mono text-[var(--fs-sm)]">500 Internal Server Error</td>
                        <td className="py-[var(--space-3)] px-[var(--space-4)] text-[var(--fs-sm)]">Server error</td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>Error Response Format</h3>
                  <Card variant="bordered" className="bg-[var(--bg-tertiary)]">
                    <CardBody>
                      <pre className="text-[var(--fs-sm)] overflow-x-auto">
                        <code>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request parameters are invalid",
    "details": {
      "field": "start_time",
      "reason": "Must be in the future"
    }
  }
}`}</code>
                      </pre>
                    </CardBody>
                  </Card>

                  <h2 id="sdks">SDKs & Libraries</h2>
                  <p>
                    Official SDKs are available for popular programming languages:
                  </p>

                  <div className="grid md:grid-cols-2 gap-[var(--space-4)] my-[var(--space-6)]">
                    <Card variant="bordered">
                      <CardBody>
                        <h4 className="font-[var(--fw-semibold)] mb-[var(--space-2)]">Node.js</h4>
                        <pre className="text-[var(--fs-sm)] bg-[var(--bg-tertiary)] p-[var(--space-3)] rounded">
                          <code>npm install @punctualai/node</code>
                        </pre>
                        <Button variant="minimal" href="https://github.com/punctualai/node-sdk" external className="mt-[var(--space-3)]">
                          View on GitHub
                        </Button>
                      </CardBody>
                    </Card>

                    <Card variant="bordered">
                      <CardBody>
                        <h4 className="font-[var(--fw-semibold)] mb-[var(--space-2)]">Python</h4>
                        <pre className="text-[var(--fs-sm)] bg-[var(--bg-tertiary)] p-[var(--space-3)] rounded">
                          <code>pip install punctualai</code>
                        </pre>
                        <Button variant="minimal" href="https://github.com/punctualai/python-sdk" external className="mt-[var(--space-3)]">
                          View on GitHub
                        </Button>
                      </CardBody>
                    </Card>

                    <Card variant="bordered">
                      <CardBody>
                        <h4 className="font-[var(--fw-semibold)] mb-[var(--space-2)]">Ruby</h4>
                        <pre className="text-[var(--fs-sm)] bg-[var(--bg-tertiary)] p-[var(--space-3)] rounded">
                          <code>gem install punctualai</code>
                        </pre>
                        <Button variant="minimal" href="https://github.com/punctualai/ruby-sdk" external className="mt-[var(--space-3)]">
                          View on GitHub
                        </Button>
                      </CardBody>
                    </Card>

                    <Card variant="bordered">
                      <CardBody>
                        <h4 className="font-[var(--fw-semibold)] mb-[var(--space-2)]">PHP</h4>
                        <pre className="text-[var(--fs-sm)] bg-[var(--bg-tertiary)] p-[var(--space-3)] rounded">
                          <code>composer require punctualai/sdk</code>
                        </pre>
                        <Button variant="minimal" href="https://github.com/punctualai/php-sdk" external className="mt-[var(--space-3)]">
                          View on GitHub
                        </Button>
                      </CardBody>
                    </Card>
                  </div>

                  <h2 id="changelog">API Changelog</h2>

                  <h3>v1.0.0 - December 15, 2024</h3>
                  <ul>
                    <li>Initial API release</li>
                    <li>OAuth 2.0 authentication</li>
                    <li>Bookings, availability, and user endpoints</li>
                    <li>Webhook support for real-time events</li>
                    <li>Rate limiting and error handling</li>
                  </ul>

                  <h3>Coming Soon</h3>
                  <ul>
                    <li>GraphQL API endpoint</li>
                    <li>Batch operations for bulk booking management</li>
                    <li>Advanced analytics endpoints</li>
                    <li>Team collaboration features</li>
                    <li>Custom fields API</li>
                  </ul>
                </Prose>
              </div>
            </div>
          </Container>
        </Section>

        {/* Support Section */}
        <Section spacing="default" background="secondary">
          <Container size="wide">
            <Card variant="gradient">
              <CardBody className="text-center py-[var(--space-10)]">
                <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                  Need Help?
                </Headline>
                <Lead align="center" className="mb-[var(--space-6)]">
                  Our developer support team is here to help you build amazing integrations
                </Lead>
                <div className="flex justify-center gap-[var(--space-4)]">
                  <Button variant="primary" href="mailto:developers@punctual.ai">
                    Contact Support
                  </Button>
                  <Button variant="secondary" href="https://community.punctual.ai" external>
                    Developer Forum
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Section>
      </Main>

      <Footer />
    </Layout>
  )
}