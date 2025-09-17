# punctual.ai Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Domain name (optional, can use Vercel subdomain)
- Vercel account (recommended) or any Node.js hosting

## Step 1: Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Save your project URL and anon key

2. **Run Database Schema**
   ```sql
   -- Run this in Supabase SQL editor

   -- Users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     username TEXT UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     timezone TEXT DEFAULT 'America/New_York',
     booking_duration INT DEFAULT 30,
     buffer_time INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Availabilities table
   CREATE TABLE availabilities (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     day_of_week INT NOT NULL,
     start_time TIME NOT NULL,
     end_time TIME NOT NULL,
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Bookings table
   CREATE TABLE bookings (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     guest_name TEXT NOT NULL,
     guest_email TEXT NOT NULL,
     start_time TIMESTAMP NOT NULL,
     end_time TIMESTAMP NOT NULL,
     notes TEXT,
     status TEXT DEFAULT 'confirmed',
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Add indexes for performance
   CREATE INDEX idx_bookings_user_id ON bookings(user_id);
   CREATE INDEX idx_bookings_start_time ON bookings(start_time);
   CREATE INDEX idx_availabilities_user_id ON availabilities(user_id);
   ```

## Step 2: Configure Your Custom Domain

### Option A: Using Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

2. **Add Custom Domain**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Follow DNS instructions:
     - Add A record: `@` → `76.76.21.21`
     - Add CNAME: `www` → `cname.vercel-dns.com`

3. **Environment Variables in Vercel**
   - Go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_key
     NEXT_PUBLIC_APP_URL=https://yourdomain.com
     ```

### Option B: Self-Hosted (VPS/Cloud)

1. **Update Application URL**
   ```bash
   # In .env.local
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

3. **Configure Nginx (if using)**
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com www.yourdomain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

4. **SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Step 3: Environment Configuration

1. **Copy environment template**
   ```bash
   cp .env.example .env.local
   ```

2. **Update all variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

## Step 4: Email Configuration (Optional)

For email notifications:

1. **Sign up for Resend.com**
2. **Get API key**
3. **Add to environment**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

## Step 5: Final Deployment Checklist

### Before Going Live:

- [ ] Database tables created in Supabase
- [ ] Environment variables configured
- [ ] Custom domain DNS configured
- [ ] SSL certificate active
- [ ] Test user registration flow
- [ ] Test booking flow with demo account
- [ ] Verify email notifications (if configured)
- [ ] Check mobile responsiveness
- [ ] Test all authentication flows
- [ ] Verify timezone handling

### Production Commands:

```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel
vercel --prod
```

## Step 6: Monitoring & Maintenance

### Regular Tasks:
- Monitor Supabase database usage
- Check error logs in Vercel/hosting dashboard
- Update dependencies monthly: `npm update`
- Backup database regularly

### Useful Commands:

```bash
# Check build locally
npm run build
npm start

# Run type checks
npx tsc --noEmit

# Update dependencies
npm update
npm audit fix
```

## Troubleshooting

### Common Issues:

1. **"Authentication Error"**
   - Check Supabase keys in .env
   - Verify Supabase project is active

2. **"Database Connection Failed"**
   - Check Supabase URL
   - Ensure tables are created

3. **"Booking times showing wrong timezone"**
   - Verify NEXT_PUBLIC_APP_URL is set
   - Check user timezone settings

4. **Custom domain not working**
   - Wait 24-48 hours for DNS propagation
   - Verify DNS records with: `nslookup yourdomain.com`

## Support

For issues or questions:
- Check Supabase logs for database errors
- Review Vercel function logs for API errors
- Ensure all environment variables are set correctly

## Security Notes

- Never commit .env.local file
- Rotate Supabase keys periodically
- Use strong passwords for admin accounts
- Enable Row Level Security (RLS) in Supabase for production
- Consider adding rate limiting for API routes

---

Your punctual.ai instance should now be fully deployed and accessible at your custom domain!