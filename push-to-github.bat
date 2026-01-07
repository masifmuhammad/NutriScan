@echo off
echo 🚀 Pushing NutriScan to GitHub...
echo.

REM Add Git to PATH for this session
set PATH=%PATH%;C:\Program Files\Git\cmd

REM Navigate to project
cd /d "%~dp0"

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Remote already exists
    git remote get-url origin
) else (
    echo 📍 Adding GitHub remote...
    git remote add origin https://github.com/masifmuhammad/NutriScan.git
)

echo.
echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo 🌐 Your repo: https://github.com/masifmuhammad/NutriScan
) else (
    echo.
    echo ❌ Push failed. You may need to:
    echo    1. Create the repo on GitHub first: https://github.com/new
    echo    2. Sign in to GitHub when prompted
    echo    3. Run this script again
)

echo.
pause

