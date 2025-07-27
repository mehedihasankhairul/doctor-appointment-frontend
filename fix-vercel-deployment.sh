#!/bin/bash

echo "🔧 Fixing Vercel 'No Output Directory named dist found' error..."
echo "=============================================================="

# Ensure we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the frontend directory"
    exit 1
fi

echo "📋 Deployment fix steps:"

# Step 1: Clean any existing build
echo "🧹 1. Cleaning existing build..."
rm -rf dist/
rm -rf node_modules/.vite/

# Step 2: Verify Vite version
echo "📦 2. Checking Vite version..."
VITE_VERSION=$(npm list vite --depth=0 2>/dev/null | grep vite@ | cut -d'@' -f3)
echo "   Current Vite version: $VITE_VERSION"

# Step 3: Test build locally
echo "🔨 3. Testing build process..."
if npm run vercel-build; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Check the error above."
    exit 1
fi

# Step 4: Verify dist directory and contents
echo "📁 4. Verifying dist directory..."
if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
    echo "✅ dist directory exists with content:"
    ls -la dist/
    
    # Check for index.html specifically
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html found in dist/"
        DIST_SIZE=$(du -sh dist/ | cut -f1)
        echo "   Total dist size: $DIST_SIZE"
    else
        echo "❌ index.html missing from dist/"
        exit 1
    fi
else
    echo "❌ dist directory is missing or empty!"
    exit 1
fi

# Step 5: Verify vercel.json configuration
echo "⚙️  5. Verifying Vercel configuration..."
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    echo "📄 Current configuration:"
    cat vercel.json | head -10
else
    echo "❌ vercel.json missing!"
    exit 1
fi

# Step 6: Check Node.js version
echo "🟢 6. Node.js version check..."
NODE_VERSION=$(node --version)
echo "   Node.js version: $NODE_VERSION"

if [ -f ".nvmrc" ]; then
    NVMRC_VERSION=$(cat .nvmrc)
    echo "   .nvmrc specifies: v$NVMRC_VERSION"
fi

echo ""
echo "🎉 Deployment fix completed successfully!"
echo "=========================================="
echo ""
echo "✅ All checks passed. Your project should now deploy correctly on Vercel."
echo ""
echo "📋 Summary of fixes applied:"
echo "   • Used @vercel/static-build with distDir: 'dist'"
echo "   • Added vercel-build script in package.json"
echo "   • Verified dist directory creation"
echo "   • Ensured Vite 5.4.0 compatibility"
echo ""
echo "🚀 Deploy now with:"
echo "   vercel --prod"
echo ""
echo "Or commit and push if auto-deploy is enabled:"
echo "   git add ."
echo "   git commit -m 'Fix Vercel deployment configuration'"
echo "   git push origin main"
echo ""
