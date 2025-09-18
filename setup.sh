#!/bin/bash

# Punctual.AI Setup Script
# This script sets up the development environment for Punctual.AI

set -e  # Exit on any error

echo "🚀 Setting up Punctual.AI development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    print_success "npm $(npm --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Check for environment file
check_env() {
    print_status "Checking environment configuration..."
    
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local not found. Creating from template..."
        cp .env.example .env.local
        print_warning "Please edit .env.local with your actual configuration values"
        print_warning "Required: Supabase URL and keys"
        print_warning "Optional: Resend API key, Stripe keys, Google OAuth"
    else
        print_success ".env.local found"
    fi
}

# Check Supabase setup
check_supabase() {
    print_status "Checking Supabase configuration..."
    
    if grep -q "your_supabase_project_url" .env.local; then
        print_warning "Supabase configuration not set in .env.local"
        print_warning "Please update .env.local with your Supabase credentials"
        print_warning "Get them from: https://supabase.com/dashboard"
    else
        print_success "Supabase configuration appears to be set"
    fi
}

# Run database setup
setup_database() {
    print_status "Setting up database..."
    
    if [ -f "setup-supabase.sh" ]; then
        chmod +x setup-supabase.sh
        print_status "Running Supabase setup script..."
        ./setup-supabase.sh
        print_success "Database setup completed"
    else
        print_warning "setup-supabase.sh not found. Please run the SQL schema manually."
    fi
}

# Create demo data
create_demo_data() {
    print_status "Creating demo data..."
    
    if [ -f "scripts/setup-demo.ts" ]; then
        print_status "Running demo data setup..."
        npx tsx scripts/setup-demo.ts
        print_success "Demo data created"
    else
        print_warning "Demo setup script not found"
    fi
}

# Test the setup
test_setup() {
    print_status "Testing setup..."
    
    # Test if the app can start
    print_status "Testing Next.js build..."
    npm run build
    
    print_success "Setup test completed successfully"
}

# Main setup function
main() {
    echo "=========================================="
    echo "🎯 Punctual.AI Development Setup"
    echo "=========================================="
    
    check_node
    check_npm
    install_dependencies
    check_env
    check_supabase
    setup_database
    create_demo_data
    test_setup
    
    echo ""
    echo "=========================================="
    print_success "🎉 Setup completed successfully!"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. Edit .env.local with your actual configuration"
    echo "2. Run: npm run dev"
    echo "3. Open: http://localhost:3000"
    echo ""
    echo "For API testing:"
    echo "1. Run: npx tsx scripts/test-api.ts"
    echo "2. Visit: http://localhost:3000/api-docs"
    echo ""
    echo "For help, check the README.md file"
}

# Run main function
main "$@"
