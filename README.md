Markdown
# Git Synchronization Guide 🛠️

Use these commands to keep your local XAMPP files and the GitHub repository in sync.

---

### ⬇️ How to Pull (Get Latest Updates)
Run this command before you start coding to make sure you have the most recent version from the cloud:
```bash
git pull origin main
⬆️ How to Push (Upload Your Changes)
Follow these three steps whenever you finish a feature or fix a bug to save it to GitHub:

1. Stage your changes:

Bash
git add .
2. Commit with a message:

Bash
git commit -m "Describe your update here (e.g., Added login validation)"
3. Send to GitHub:

Bash
git push origin main
⚠️ Common Troubleshooting
Authentication: If asked for a password, use your GitHub Personal Access Token (PAT).

Force Update: If you need to overwrite the GitHub repo with your local files (use with caution):

Bash
git push origin main --force

---
