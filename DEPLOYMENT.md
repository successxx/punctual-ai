# Deployment Guide - Punctual.AI

This guide covers deploying Punctual.AI to various platforms with zero-downtime and production-ready configurations.

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Prerequisites
- GitHub account
- Vercel account (free tier available)
- Supabase project set up

### 2. Deploy Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: production-ready deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `successxx/punctual-ai`
   - Click "Deploy"

3. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   RESEND_API_KEY=re_your_api_key
   ```

4. **Redeploy**
   - Vercel will automatically redeploy with new environment variables

## 🌐 Other Deployment Platforms

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Add all variables from .env.example
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set run command: `npm start`
4. Add environment variables

## 🔧 Production Configuration

### Environment Variables Checklist
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Production Supabase URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Production anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Production service role key
- [ ] `NEXT_PUBLIC_APP_URL` - Your production domain
- [ ] `NEXTAUTH_URL` - Same as APP_URL
- [ ] `NEXTAUTH_SECRET` - Strong secret key
- [ ] `RESEND_API_KEY` - Email service key
- [ ] `STRIPE_PUBLISHABLE_KEY` - Production Stripe key
- [ ] `STRIPE_SECRET_KEY` - Production Stripe secret
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

### Database Setup
1. Create production Supabase project
2. Run the SQL schema: `supabase-schema.sql`
3. Set up Row Level Security policies
4. Configure backup schedules

### Domain Configuration
1. **Custom Domain**
   - Add domain in Vercel dashboard
   - Update DNS records
   - Update `NEXT_PUBLIC_APP_URL`

2. **SSL Certificate**
   - Automatically handled by Vercel
   - Force HTTPS redirects

## 🔒 Security Checklist

### Authentication
- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Secure API key generation
- [ ] Rate limiting enabled
- [ ] CORS properly configured

### Database
- [ ] Row Level Security enabled
- [ ] Service role key secured
- [ ] Database backups configured
- [ ] Connection pooling enabled

### Application
- [ ] Environment variables secured
- [ ] No sensitive data in client code
- [ ] Error messages sanitized
- [ ] Input validation enabled

## 📊 Monitoring & Analytics

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor performance metrics
- Track user behavior

### Error Tracking
- Set up error monitoring
- Configure alerts
- Track API errors

### Database Monitoring
- Monitor query performance
- Set up alerts for errors
- Track connection usage

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache and reinstall
npm run clean
npm run fresh-install
```

**Database Connection Issues**
```bash
# Test connection
npm run test:connection

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
```

**API Errors**
```bash
# Test API endpoints
npm run test:api

# Check logs in Vercel dashboard
```

### Performance Optimization

**Build Optimization**
- Enable Turbopack: `npm run build --turbopack`
- Optimize images
- Enable compression

**Runtime Optimization**
- Enable caching
- Use CDN
- Optimize database queries

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Vercel handles this automatically
- Database connection pooling
- CDN for static assets

### Vertical Scaling
- Monitor resource usage
- Upgrade Vercel plan if needed
- Optimize database queries

## 🆘 Support

If you encounter issues during deployment:
1. Check the logs in your platform dashboard
2. Verify environment variables
3. Test locally with production settings
4. Open an issue on GitHub

---

**Ready to deploy? Follow the Vercel quick start above!** 🚀