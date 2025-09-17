# 🚀 SUPER QUICK SETUP - 5 Minutes to Live App!

## The Easiest Way - Just 3 Steps:

### Step 1: Create Supabase Project (2 minutes)
👉 **[Click here to create project](https://database.new)**

1. Sign in with GitHub or Google
2. Create new project:
   - Name: `punctual-ai`
   - Database Password: **Save this!** (or generate a strong one)
   - Region: Choose closest to you
3. Click "Create new project" and wait ~2 minutes

### Step 2: Get Your Keys (30 seconds)
Once project is ready:
1. Go to **Settings → API** in left sidebar
2. You'll see these 3 values - **copy each one**:
   - Project URL (https://xxxxx.supabase.co)
   - anon public key (starts with `eyJ...`)
   - service_role secret key (under "Service role" - also starts with `eyJ...`)

### Step 3: Paste Your Keys Here (2 minutes)
Run these 3 commands in terminal, replacing with YOUR values:

```bash
# 1. Set Project URL
echo "https://YOUR_PROJECT.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --force

# 2. Set Anon Key
echo "eyJ...YOUR_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --force

# 3. Set Service Key
echo "eyJ...YOUR_SERVICE_KEY" | vercel env add SUPABASE_SERVICE_ROLE_KEY production --force
```

Then run:
```bash
# Redeploy with real database
vercel --prod

# Run database setup
npm run setup-db
```

---

## 🎉 That's it! Your app will be live at https://punctual.ai

### To Remove Authentication Protection:
1. Go to [Vercel Dashboard](https://vercel.com/clientsais-projects/punctual-ai/settings)
2. Click "Settings" → "Deployment Protection"
3. Change to "Disabled" or "Only Preview Deployments"

---

## Alternative: Let Me Do Everything

If you want me to handle it all automatically:

1. Get a Supabase token:
   - Go to: https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Name it "CLI Access"

2. Set the token:
```bash
export SUPABASE_ACCESS_TOKEN='your_token_here'
```

3. Tell me "use my token to set everything up"

I'll then create the project, set up the database, and configure everything automatically!