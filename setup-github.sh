#!/bin/bash

# NutriScan GitHub Setup Script

echo "🚀 Setting up NutriScan for GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Check if there are changes
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "NutriScan - Pakistani Food Nutrition Tracker"
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already exists"
    echo "Current remote URL:"
    git remote get-url origin
else
    echo "🔗 Please add your GitHub remote:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/NutriScan.git"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your GitHub remote (if not done):"
echo "   git remote add origin https://github.com/masifmuhammad/NutriScan.git"
echo ""
echo "2. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Follow DEPLOYMENT.md for hosting instructions"

