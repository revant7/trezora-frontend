#!/bin/bash

# Frontend Deployment Script for Netlify
echo "🚀 Starting frontend deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests (if they exist)
if [ -f "src/App.test.js" ]; then
    echo "🧪 Running tests..."
    npm test -- --coverage --watchAll=false
fi

# Build the application
echo "🏗️ Building production app..."
npm run build

# Optional: Bundle analysis
if command -v webpack-bundle-analyzer &> /dev/null; then
    echo "📊 Analyzing bundle size..."
    npx webpack-bundle-analyzer build/static/js/*.js --no-open > bundle-analysis.txt
fi

echo "✅ Frontend build completed successfully!"
echo "📁 Build files are in the 'build' directory"
echo "🌐 Ready for Netlify deployment!"