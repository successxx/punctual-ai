# Punctual.AI - Professional Scheduling Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

A complete, production-ready scheduling platform that rivals Calendly, with both a beautiful web interface and a comprehensive REST API for seamless integration with other platforms.

## ✨ Features

### 🎯 Core Functionality
- **User Authentication** - Secure registration and login with Supabase Auth
- **Availability Management** - Visual calendar interface for setting availability
- **Unique Booking Links** - Custom URLs like `punctual.ai/username`
- **Email Notifications** - Automated confirmations for both parties
- **Anti-Double-Booking** - Atomic database transactions prevent conflicts
- **Responsive Design** - Works perfectly on all devices
- **Beautiful UI** - Jony Ive-inspired minimalist design

### 🔌 API Integration
- **Complete REST API** - Full CRUD operations for all resources
- **API Key Authentication** - Secure access control
- **Rate Limiting** - Built-in protection against abuse
- **Webhook Support** - Real-time notifications for external systems
- **OpenAPI Documentation** - Interactive API docs at `/api-docs`

### 🛠️ Technical Features
- **TypeScript** - Full type safety throughout the application
- **Next.js 15** - Latest React framework with App Router
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Stripe Integration** - Payment processing (optional)
- **Google Calendar** - OAuth integration (optional)
- **Email Service** - Resend API integration

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Supabase Account** - [Free tier available](https://supabase.com/)
- **Git** - For cloning the repository

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/successxx/punctual-ai.git
cd punctual-ai

# Run the automated setup script
npm run setup
```

The setup script will:
- ✅ Check Node.js and npm versions
- ✅ Install all dependencies
- ✅ Create environment configuration
- ✅ Set up the database schema
- ✅ Create demo data
- ✅ Test the build process

### 2. Configure Environment

Edit `.env.local` with your credentials:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Email (Optional)
RESEND_API_KEY=re_your_api_key

# Stripe (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

### 3. Start Development

```bash
# Start the development server
npm run dev

# Open http://localhost:3000
```

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking

# Setup & Testing
npm run setup            # Full automated setup
npm run setup:demo       # Create demo data
npm run test:api         # Test API endpoints
npm run test:connection  # Test database connection

# Database
npm run db:setup         # Setup database schema
npm run db:reset         # Reset database (careful!)

# Maintenance
npm run clean            # Clean build artifacts
npm run fresh-install    # Clean install dependencies
```

## 🗄️ Database Setup

### Option 1: Automated Setup
```bash
npm run db:setup
```

### Option 2: Manual Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the entire contents of `supabase-schema.sql`
4. Get your API keys from Settings → API

## 🧪 Testing

### Web Application Testing
1. Register at `/register`
2. Set your availability in the dashboard
3. Copy your booking link
4. Test booking as a guest
5. Verify email notifications

### API Testing
```bash
# Test all API endpoints
npm run test:api

# Test database connection
npm run test:connection

# View API documentation
open http://localhost:3000/api-docs
```

## 📖 API Documentation

### Authentication
Include your API key in the request headers:
```bash
curl -H "X-API-Key: your-api-key" \
     http://localhost:3000/api/v1/bookings
```

### Key Endpoints
- `POST /api/v1/users` - Create user
- `GET /api/v1/bookings` - List bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/availability/slots` - Get available slots
- `POST /api/v1/availability` - Set availability

### Webhook Integration
Configure webhooks for real-time notifications:
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
     -H "Content-Type: application/json" \
     -d '{"url": "https://your-app.com/webhook", "events": ["booking.created"]}'
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Production**
   - Update `NEXT_PUBLIC_APP_URL` to your domain
   - Set production Supabase URLs
   - Configure Resend with verified domain

### Deploy to Other Platforms

The application is compatible with:
- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ • React 19      │    │ • TypeScript    │    │ • PostgreSQL    │
│ • Tailwind CSS  │    │ • Zod Validation│    │ • Real-time     │
│ • App Router    │    │ • Rate Limiting │    │ • Row Level     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   External      │    │   Authentication│    │   File Storage  │
│   Services      │    │   & Security    │    │   & CDN         │
│                 │    │                 │    │                 │
│ • Resend Email  │    │ • Supabase Auth │    │ • Supabase      │
│ • Stripe        │    │ • JWT Tokens    │    │   Storage       │
│ • Google OAuth  │    │ • API Keys      │    │ • Vercel CDN    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your application URL |
| `NEXTAUTH_SECRET` | ✅ | NextAuth secret key |
| `RESEND_API_KEY` | ❌ | Email service API key |
| `STRIPE_PUBLISHABLE_KEY` | ❌ | Stripe publishable key |
| `STRIPE_SECRET_KEY` | ❌ | Stripe secret key |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |

### Database Schema

The application uses the following main tables:
- `users` - User profiles and settings
- `availability` - User availability schedules
- `bookings` - Appointment bookings
- `api_clients` - API authentication
- `webhooks` - Webhook configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/api-docs` endpoint
- **Issues**: [GitHub Issues](https://github.com/successxx/punctual-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/successxx/punctual-ai/discussions)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team scheduling features
- [ ] Calendar integrations (Outlook, Apple)
- [ ] Video conferencing integration
- [ ] Multi-language support
- [ ] White-label solutions

---

**Built with ❤️ by the SuccessXX team**

*Ready to revolutionize scheduling? Get started in under 5 minutes!*