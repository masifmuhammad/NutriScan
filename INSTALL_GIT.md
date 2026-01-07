# 🔧 Install Git on Windows

## Quick Install (5 minutes)

### Option 1: Download Git for Windows (Recommended)

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download will start automatically (64-bit version)

2. **Install Git:**
   - Run the downloaded `.exe` file
   - Click "Next" through all steps (default settings are fine)
   - **Important:** Make sure "Add Git to PATH" is checked
   - Click "Install"

3. **Restart PowerShell:**
   - Close your current PowerShell window
   - Open a new PowerShell window
   - Test with: `git --version`

### Option 2: Install via Winget (If you have it)

```powershell
winget install --id Git.Git -e --source winget
```

### Option 3: Install via Chocolatey (If you have it)

```powershell
choco install git
```

---

## Verify Installation

After installing, open a **new** PowerShell window and run:

```powershell
git --version
```

You should see something like: `git version 2.42.0`

---

## After Git is Installed

Then follow [GITHUB_SETUP.md](./GITHUB_SETUP.md) to push your code!

---

## Alternative: Use GitHub Desktop (GUI)

If you prefer a visual interface:

1. Download: https://desktop.github.com/
2. Install and sign in with GitHub
3. Click "File" → "Add Local Repository"
4. Select your `NutriScan` folder
5. Click "Publish repository" to push to GitHub

This is easier if you're not comfortable with command line!

