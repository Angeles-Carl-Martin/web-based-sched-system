# Web-Based Scheduling System

This repository contains the source code for the Web-Based Scheduling System. Below is a guide on how to sync your local environment with this repository.

## 🚀 Getting Started

### 1. Initial Setup (Clone/Pull)
If you are setting this up for the first time in your XAMPP `htdocs` folder:
1. Open Git Bash in your `website` folder.
2. Run the following commands:
   ```bash
   git init
   git remote add origin [https://github.com/Angeles-Carl-Martin/web-based-sched-system.git](https://github.com/Angeles-Carl-Martin/web-based-sched-system.git)
   git pull origin main
2. Database Configuration
Import the attendance_db.sql file into your phpMyAdmin.

Ensure your db.php credentials match your local MySQL settings:

PHP
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "attendance_db";
🛠️ Git Workflow Guide
How to Pull (Get latest updates)
Before starting your work, always make sure your local files are up to date:

Bash
git pull origin main
How to Push (Upload your changes)
Once you have made changes to your PHP or SQL files, follow these steps to upload them:

Stage your files:

Bash
git add .
Commit your changes:

Bash
git commit -m "Describe what you changed (e.g., Updated login logic)"
Push to GitHub:

Bash
git push origin main
Note: If you encounter a "Merge Conflict," use git pull origin main --allow-unrelated-histories or resolve conflicts in your code editor before pushing.

📂 Project Structure
web-base-sched-system/ - Core system files

login.php - User authentication

dashboard.php - Main administrative interface

attendance_db.sql - Database schema


---

### **How to update this on your GitHub:**
1. Open your `README.md` file in VS Code or Notepad.
2. Paste the code above and save.
3. Run the final push:
   ```bash
   git add README.md
   git commit -m "Add push and pull guide to README"
   git push origin main
