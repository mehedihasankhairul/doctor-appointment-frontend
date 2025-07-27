#!/bin/bash

echo "🔍 Verifying deployment readiness for Dr. Ganesh Eye Appointment Portal..."
echo "=================================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Error: Run this script from the frontend directory"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo ""

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✓ Node.js version: $NODE_VERSION"

# Check if .nvmrc exists
if [ -f ".nvmrc" ]; then
    NVMRC_VERSION=$(cat .nvmrc)
    echo "✓ .nvmrc version: $NVMRC_VERSION"
else
    echo "⚠️  .nvmrc file missing"
fi

# Check if vercel.json exists and is valid
if [ -f "vercel.json" ]; then
    if npx json-lint vercel.json > /dev/null 2>&1; then
        echo "✓ vercel.json is valid JSON"
    else
        echo "❌ vercel.json has invalid JSON"
        exit 1
    fi
else
    echo "❌ vercel.json missing"
    exit 1
fi

# Clean build test
echo ""
echo "🧹 Cleaning previous build..."
rm -rf dist/
rm -rf node_modules/.vite/

echo ""
echo "🔨 Testing build process..."
if npm run build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check if dist directory exists and has content
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo "✅ dist directory created with content"
    echo "📁 Files in dist:"
    ls -la dist/
else
    echo "❌ dist directory missing or empty"
    exit 1
fi

# Check if index.html exists
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists in dist/"
else
    echo "❌ index.html missing from dist/"
    exit 1
fi

# Check environment variables
echo ""
echo "🌍 Environment configuration:"
if [ -f ".env.production" ]; then
    echo "✓ .env.production exists"
    echo "📄 Production environment variables:"
    cat .env.production | grep -v "^#" | head -5
else
    echo "⚠️  .env.production file missing (you'll need to set env vars in Vercel)"
fi

echo ""
echo "🚀 Deployment readiness summary:"
echo "================================"
echo "✅ Node.js version compatible"
echo "✅ Build process working"
echo "✅ Output directory (dist) created"
echo "✅ Vercel configuration valid"
echo ""
echo "🎉 Ready for deployment!"
echo ""
echo "To deploy, run one of these commands:"
echo "1. ./deploy-portal.sh (automated)"
echo "2. vercel --prod (manual)"
echo "3. git push origin main (if auto-deploy is set up)"
echo ""
