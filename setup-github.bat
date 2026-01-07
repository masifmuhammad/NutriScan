@echo off
echo 🚀 Setting up NutriScan for GitHub...

REM Check if git is initialized
if not exist ".git" (
    echo 📦 Initializing git repository...
    git init
)

REM Add all files
echo 📝 Adding files to git...
git add .

REM Commit
echo 💾 Committing changes...
git commit -m "NutriScan - Pakistani Food Nutrition Tracker"

echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. Add your GitHub remote:
echo    git remote add origin https://github.com/masifmuhammad/NutriScan.git
echo.
echo 2. Push to GitHub:
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Follow DEPLOYMENT.md for hosting instructions
echo.
pause

