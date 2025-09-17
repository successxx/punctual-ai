#!/bin/bash

# Supabase Setup Script for Punctual.AI
echo "======================================"
echo "Punctual.AI - Supabase Setup Helper"
echo "======================================"
echo ""

# Function to update .env.local
update_env() {
    echo "Updating .env.local with your Supabase credentials..."

    # Backup existing .env.local
    cp .env.local .env.local.backup
    echo "✓ Backed up existing .env.local to .env.local.backup"

    echo ""
    echo "Please provide your Supabase project details:"
    echo "(You can find these in your Supabase Dashboard → Settings → API)"
    echo ""

    read -p "Project URL (https://xxxxx.supabase.co): " SUPABASE_URL
    read -p "Anon/Public Key: " ANON_KEY
    read -p "Service Role Key: " SERVICE_KEY

    # Update the .env.local file
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=J/tcWA1ozqWj3I2OuCVNkraI/DaxFbdc1kKaiHZoMVY=

# Google Calendar (optional for MVP, add later)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email service (Resend.com - free tier)
RESEND_API_KEY=re_your_api_key

# API Configuration for Clients.AI
API_RATE_LIMIT=1000
API_KEY_SALT=punctual-ai-salt-2024
CLIENTS_AI_WEBHOOK_SECRET=punctual-webhook-secret-2024
EOF

    echo "✓ Updated .env.local with new credentials"
}

# Main menu
echo "What would you like to do?"
echo ""
echo "1. Update .env.local with Supabase credentials"
echo "2. View SQL schema to run in Supabase"
echo "3. Test database connection"
echo "4. Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        update_env
        echo ""
        echo "✓ Configuration updated!"
        echo ""
        echo "Next steps:"
        echo "1. Go to your Supabase Dashboard → SQL Editor"
        echo "2. Run the contents of supabase-schema.sql"
        echo "3. Restart the Next.js server"
        ;;
    2)
        echo ""
        echo "Opening supabase-schema.sql..."
        cat supabase-schema.sql | head -50
        echo ""
        echo "... (truncated for display)"
        echo ""
        echo "Full file: ~/Desktop/punctual-ai/supabase-schema.sql"
        echo "Copy and paste the entire contents into Supabase SQL Editor"
        ;;
    3)
        echo "Testing connection..."
        npm run test:db 2>/dev/null || echo "Create a test:db script in package.json to test the connection"
        ;;
    4)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac