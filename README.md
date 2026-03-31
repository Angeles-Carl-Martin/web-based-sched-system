# 🚀 Simple Git Guide

Follow these basic steps to sync your local XAMPP files with GitHub.

---

### 1️⃣ Initial Setup (Do this once)
If you are connecting your folder to GitHub for the first time:
```bash
git init
git remote add origin [https://github.com/Angeles-Carl-Martin/web-based-sched-system.git](https://github.com/Angeles-Carl-Martin/web-based-sched-system.git)
2️⃣ How to PULL (Get latest files)
Always do this before you start coding to get the newest updates:

Bash
git pull origin main
3️⃣ How to PUSH (Upload your work)
Do these 3 steps whenever you want to save your code to GitHub:

Step A: Prepare your files

Bash
git add .
Step B: Label your update

Bash
git commit -m "Describe your changes here"
Step C: Send to GitHub

Bash
git push origin main
💡 Quick Tips
Check Status: Type git status to see which files you changed.

Check Link: Type git remote -v to see your GitHub repository URL.
