# Build Troubleshooting Guide

## 🔧 **Build Error Fixes Applied**

### 1. **Node.js Version Compatibility**
- **Issue**: Vercel deployment failing with Rollup/native module errors
- **Solution**: Added `.nvmrc` file specifying Node.js 18.18.0
- **Why**: Node.js 22+ may have compatibility issues with some build tools

### 2. **React Version Stability** 
- **Issue**: React 19 is too new and may cause build issues
- **Solution**: Downgraded to React 18.2.0 (stable version)
- **Files changed**: `package.json` dependencies and devDependencies

### 3. **Vite Version Compatibility**
- **Issue**: Vite 7.0+ may have platform-specific issues  
- **Solution**: Downgraded to Vite 5.4.0 (well-tested version)
- **Why**: Vite 5.x is more stable for production deployments

### 4. **Vercel Configuration**
- **Added**: `vercel.json` with proper build configuration
- **Added**: `vercel-build` script in package.json
- **Purpose**: Ensures Vercel uses correct build settings

### 5. **Build Configuration**
- **Updated**: `vite.config.js` with production-optimized settings
- **Added**: Rollup options for better chunking
- **Added**: Global polyfill for compatibility

## 🚀 **Deployment Steps**

### **Option 1: Automated Script**
```bash
cd frontend
./deploy-portal.sh
```

### **Option 2: Manual Steps**
```bash
cd frontend

# Clean and reinstall (if needed)
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Deploy via Vercel CLI
npm install -g vercel
vercel --prod
```

### **Option 3: Git Deployment**
```bash
git add .
git commit -m "Fix build configuration for deployment"
git push origin main
```

## 🐛 **Common Build Issues & Solutions**

### **Issue**: "No Output Directory named 'dist' found after the Build completed"
**Solution**: 
```bash
# Update vercel.json to use the new format:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}

# Ensure Vite version compatibility:
npm install vite@5.4.0 --save-dev
npm run build
```

### **Issue**: `MODULE_NOT_FOUND` error with Rollup
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### **Issue**: Native module compilation errors
**Solution**: 
- Ensure Node.js version is 18.x (check `.nvmrc`)
- Clear npm cache: `npm cache clean --force`
- Use `npm install --legacy-peer-deps`

### **Issue**: Build succeeds locally but fails on Vercel
**Solution**:
- Check Vercel's Node.js version in dashboard
- Ensure `vercel.json` is properly configured
- Use `vercel-build` script instead of `build`

### **Issue**: React hydration errors
**Solution**:
- Ensure React 18 compatibility in `main.jsx`
- Check for any React 19 specific features in components
- Use React 18's `createRoot` API

## 📋 **Build Verification Checklist**

- [ ] Node.js version is 18.x (`node --version`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] `dist` folder is created with assets
- [ ] No console errors in built app (`npm run preview`)
- [ ] `.nvmrc` file exists for Vercel
- [ ] `vercel.json` is configured
- [ ] Environment variables are set for production

## 🛠️ **Production Environment Variables**

Make sure to set these in your deployment platform:

```env
# Vercel Environment Variables
VITE_API_URL=https://your-backend-api.com/api
VITE_MAIN_DOMAIN=https://drganeshcs.com  
VITE_PORTAL_DOMAIN=https://portal.drganeshcs.com
NODE_ENV=production
```

## 📞 **Additional Support**

If build issues persist:

1. **Check Vercel build logs** for specific error messages
2. **Try different Node.js versions** (16.x, 18.x, 20.x)
3. **Use legacy peer deps**: `npm install --legacy-peer-deps`
4. **Clear all caches**: 
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🎯 **Current Status**

✅ **Local build working**: `npm run build` succeeds  
✅ **Dependencies downgraded**: React 18.2.0, Vite 5.4.0  
✅ **Configuration added**: Vercel and Vite configs optimized  
✅ **Scripts updated**: Added `vercel-build` command  
✅ **Node version pinned**: `.nvmrc` specifies 18.18.0  

The build should now work on deployment platforms! 🎉
