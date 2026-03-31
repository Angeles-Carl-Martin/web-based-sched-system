<?php
session_start();

// 1. DATABASE CONNECTION
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "attendance_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 2. LOGIN LOGIC
$error_message = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $pass  = mysqli_real_escape_string($conn, $_POST['password']);

    // Check if user exists in attendance_db
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$pass' LIMIT 1";
    $result = $conn->query($sql);

   if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role']; // Dito natin malalaman kung admin o super_admin
    $_SESSION['username'] = $user['username'];

    // IISANG DASHBOARD NALANG:
    header("Location: dashboard.php");
   exit();
    } else {
        $error_message = "Invalid Email or Password!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPIST Scheduling System - Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            overflow: hidden;
        }

        .container {
            display: flex;
            min-height: 100vh;
        }

        .left-panel {
            flex: 0 0 60%;
            background: linear-gradient(135deg, #065a35 0%, #0E8F4F 50%, #0a7040 100%);
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 32px;
            overflow: hidden;
        }

        .left-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
        }

        .left-panel::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50%;
            background: linear-gradient(to top, rgba(14, 143, 79, 0.85), rgba(14, 143, 79, 0.7)), 
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%2308733F" width="100" height="100"/><circle cx="20" cy="20" r="2" fill="%230a5c30"/><circle cx="50" cy="40" r="1.5" fill="%230a5c30"/><circle cx="80" cy="25" r="2" fill="%230a5c30"/><circle cx="35" cy="70" r="1.5" fill="%230a5c30"/><circle cx="65" cy="80" r="2" fill="%230a5c30"/><circle cx="15" cy="55" r="1" fill="%230a5c30"/><circle cx="90" cy="60" r="1.5" fill="%230a5c30"/></svg>');
            background-size: cover;
            background-position: bottom;
            pointer-events: none;
        }

        .logo-area {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 60px;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #0E8F4F;
        }

        .logo-text {
            display: flex;
            flex-direction: column;
        }

        .logo-main {
            font-size: 20px;
            font-weight: 700;
            color: white;
            letter-spacing: 1px;
        }

        .logo-sub {
            font-size: 12px;
            color: rgba(255,255,255,0.85);
            font-weight: 500;
        }

        .main-heading {
            position: relative;
            z-index: 1;
            margin-bottom: 16px;
        }

        .main-heading h1 {
            font-size: 42px;
            font-weight: 700;
            color: white;
            line-height: 1.2;
            letter-spacing: -0.5px;
        }

        .subtitle {
            position: relative;
            z-index: 1;
            font-size: 16px;
            color: rgba(255,255,255,0.85);
            max-width: 420px;
            line-height: 1.6;
            margin-bottom: auto;
        }

        .feature-cards {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 40px;
        }

        .feature-card {
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            background: rgba(255,255,255,0.18);
            transform: translateY(-2px);
        }

        .feature-card i {
            font-size: 22px;
            color: white;
            width: 28px;
            text-align: center;
        }

        .feature-card span {
            font-size: 14px;
            font-weight: 500;
            color: white;
        }

        .right-panel {
            flex: 0 0 40%;
            background: #E6F2EC;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
            position: relative;
        }

        .login-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            padding: 40px;
            width: 100%;
            max-width: 420px;
        }

        .login-title {
            font-size: 26px;
            font-weight: 700;
            color: #0E8F4F;
            margin-bottom: 8px;
            text-align: center;
        }

        .login-subtitle {
            font-size: 14px;
            color: #6B7280;
            text-align: center;
            margin-bottom: 32px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 8px;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper i.input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
            font-size: 16px;
        }

        .input-wrapper i.eye-icon {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
            font-size: 16px;
            cursor: pointer;
            transition: color 0.2s;
        }

        .input-wrapper i.eye-icon:hover {
            color: #6B7280;
        }

        .form-input {
            width: 100%;
            padding: 12px 14px 12px 42px;
            border: 1px solid #E5E7EB;
            border-radius: 10px;
            font-size: 14px;
            font-family: inherit;
            transition: all 0.2s;
            background: #FAFAFA;
        }

        .form-input:focus {
            outline: none;
            border-color: #0E8F4F;
            box-shadow: 0 0 0 3px rgba(14, 143, 79, 0.1);
            background: white;
        }

        .form-input::placeholder {
            color: #9CA3AF;
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            font-size: 14px;
        }

        .remember-me {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6B7280;
        }

        .remember-me input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: #0E8F4F;
            cursor: pointer;
        }

        .remember-me label {
            cursor: pointer;
        }

        .forgot-password {
            color: #0E8F4F;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
        }

        .forgot-password:hover {
            color: #08733F;
            text-decoration: underline;
        }

        .btn-signin {
            width: 100%;
            padding: 14px;
            background: #0E8F4F;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-signin:hover {
            background: #08733F;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(14, 143, 79, 0.3);
        }

        .btn-signin:active {
            transform: translateY(0);
        }

        .divider {
            display: flex;
            align-items: center;
            margin: 28px 0;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #E5E7EB;
        }

        .divider span {
            padding: 0 16px;
            font-size: 13px;
            color: #6B7280;
        }

        .help-text {
            text-align: center;
            font-size: 13px;
            color: #6B7280;
            line-height: 1.5;
        }

        .footer {
            position: absolute;
            bottom: 24px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: #9CA3AF;
        }

        .error-msg {
            color: #dc2626;
            background: #fee2e2;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
        }

        @media (max-width: 1024px) {
            .left-panel { flex: 0 0 50%; }
            .right-panel { flex: 0 0 50%; }
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; }
            .left-panel, .right-panel { flex: none; width: 100%; }
            .left-panel { min-height: auto; padding: 24px; }
            .logo-area { margin-bottom: 24px; }
            .main-heading h1 { font-size: 28px; }
            .subtitle { font-size: 14px; margin-bottom: 24px; }
            .feature-cards { display: none; }
            .right-panel { padding: 24px; min-height: 100vh; }
            .login-card { padding: 28px; }
            .footer { position: relative; margin-top: 24px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left-panel">
            <div class="logo-area">
                <div class="logo-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="logo-text">
                    <span class="logo-main">SPIST</span>
                    <span class="logo-sub">Scheduling System</span>
                </div>
            </div>
            
            <div class="main-heading">
                <h1>Southern Philippines<br>Institute of Science<br>and Technology</h1>
            </div>
            
            <p class="subtitle">Streamline your academic scheduling with our comprehensive management system.</p>
            
            <div class="feature-cards">
                <div class="feature-card">
                    <i class="fas fa-users"></i>
                    <span>Student Management</span>
                </div>
                <div class="feature-card">
                    <i class="fas fa-clock"></i>
                    <span>Class Scheduling</span>
                </div>
                <div class="feature-card">
                    <i class="fas fa-book"></i>
                    <span>Course Planning</span>
                </div>
                <div class="feature-card">
                    <i class="fas fa-calendar-check"></i>
                    <span>Academic Calendar</span>
                </div>
            </div>
        </div>
        
        <div class="right-panel">
            <div class="login-card">
                <h2 class="login-title">Welcome</h2>
                <p class="login-subtitle">Sign in to access the SPIST Scheduling System</p>
                
                <?php if($error_message): ?>
                    <div class="error-msg"><?php echo $error_message; ?></div>
                <?php endif; ?>

                <form action="" method="POST">
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <div class="input-wrapper">
                            <i class="fas fa-envelope input-icon"></i>
                            <input type="email" name="email" class="form-input" placeholder="your.email@spist.edu.ph" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <div class="input-wrapper">
                            <i class="fas fa-lock input-icon"></i>
                            <input type="password" name="password" class="form-input" id="passwordInput" placeholder="Enter your password" required>
                            <i class="fas fa-eye eye-icon" id="togglePassword"></i>
                        </div>
                    </div>
                    
                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="remember">
                            <label for="remember">Remember me</label>
                        </div>
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </div>
                    
                    <button type="submit" class="btn-signin">Sign In</button>
                </form>
                
                <div class="divider">
                    <span>Need access?</span>
                </div>
                
                <p class="help-text">Contact your administrator for account assistance</p>
            </div>
            
            <div class="footer">
                &copy; 2026 Southern Philippines Institute of Science and Technology. All rights reserved.
            </div>
        </div>
    </div>
    
    <script>
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('passwordInput');
        
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    </script>
</body>
</html>