#!/bin/bash

# Deployment script for Dr. Ganesh Eye Appointment System Portal
# This script helps deploy your updated frontend to the portal subdomain

echo "🚀 Starting deployment for portal.drganeshcs.com..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Update .env.production with your backend URL
echo "⚙️  Please update .env.production with your backend API URL"
echo "Current .env.production content:"
cat .env.production
echo ""
read -p "Do you want to edit .env.production now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    nano .env.production
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build the project for production
echo "🔨 Building project for production..."
if ! npm run build; then
    echo "❌ Build failed. Trying alternative approach..."
    echo "🔧 Clearing node_modules and reinstalling..."
    rm -rf node_modules package-lock.json
    npm install
    echo "🔨 Retrying build..."
    npm run build
fi

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed. Please check for errors and try again."
    echo "📋 Troubleshooting tips:"
    echo "   • Check Node.js version: $(node --version)"
    echo "   • Try: npm install --legacy-peer-deps"
    echo "   • Try: npm cache clean --force"
    exit 1
fi

echo "✅ Build completed successfully!"

# Instructions for deployment
echo ""
echo "📋 Next Steps:"
echo "1. Your built files are in the 'dist' directory"
echo "2. Since you're using Vercel, you have these options:"
echo ""
echo "   Option A - Deploy via Vercel CLI:"
echo "   $ npm install -g vercel"
echo "   $ vercel --prod"
echo ""
echo "   Option B - Deploy via Git (if connected to Vercel):"
echo "   $ git add ."
echo "   $ git commit -m 'Update portal subdomain routing'"
echo "   $ git push origin main"
echo ""
echo "   Option C - Manual upload to Vercel dashboard:"
echo "   - Go to vercel.com"
echo "   - Upload the 'dist' folder contents"
echo ""
echo "3. Make sure your Vercel project is configured for:"
echo "   - Domain: portal.drganeshcs.com"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "4. Test the deployment:"
echo "   - Visit https://portal.drganeshcs.com"
echo "   - It should automatically show the doctor portal login"
echo ""

# Test local build
echo "🧪 Testing local build..."
echo "Starting local preview server..."
echo "You can test your build locally by running: npm run preview"
echo "This will serve your built files at http://localhost:4173"

echo ""
echo "🎉 Deployment preparation complete!"
echo "Your updated frontend with portal subdomain routing is ready for deployment."
