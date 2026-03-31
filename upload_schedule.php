<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
$role_title = ($_SESSION['role'] == 'super_admin') ? 'Super Admin Dashboard' : 'Admin Dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Schedule - SPIST</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --primary-green: #0E8F4F; --bg-color: #F9FAFB; --card-bg: #FFFFFF; --text-main: #111827; --text-muted: #6B7280; --border-color: #E5E7EB; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--bg-color); color: var(--text-main); }
        .top-header { background-color: var(--primary-green); color: white; padding: 12px 32px; display: flex; justify-content: space-between; align-items: center; }
        .header-left { display: flex; align-items: center; gap: 16px; }
        .header-icon { background: white; color: var(--primary-green); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .header-titles h1 { font-size: 16px; font-weight: 600; }
        .header-titles p { font-size: 12px; color: rgba(255,255,255,0.8); }
        .header-right { text-align: right; }
        .header-right h2 { font-size: 14px; font-weight: 600; }
        .header-right p { font-size: 12px; color: rgba(255,255,255,0.8); }
        .main-container { padding: 32px; max-width: 1000px; margin: 0 auto; }
        .back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid var(--border-color); border-radius: 8px; background: white; color: var(--text-main); text-decoration: none; font-weight: 500; font-size: 14px; margin-bottom: 24px; transition: 0.2s; }
        .back-btn:hover { background: #f3f4f6; }
        .page-title { margin-bottom: 24px; }
        .page-title h2 { font-size: 24px; margin-bottom: 4px; }
        .page-title p { color: var(--text-muted); font-size: 14px; }
        .upload-card { background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; margin-bottom: 24px; }
        .upload-area { border: 2px dashed #10B981; border-radius: 12px; padding: 48px 24px; text-align: center; background: #F8FAFC; margin-top: 16px; }
        .upload-area i { font-size: 48px; color: #9CA3AF; margin-bottom: 16px; }
        .upload-area h3 { font-size: 18px; margin-bottom: 8px; }
        .upload-area p { color: var(--text-muted); font-size: 14px; margin-bottom: 16px; }
        .btn-select { background: var(--primary-green); color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
        .how-it-works { background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; }
        .how-it-works h3 { margin-bottom: 24px; font-size: 18px; }
        .step { display: flex; gap: 16px; margin-bottom: 20px; }
        .step-num { width: 32px; height: 32px; background: var(--primary-green); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; }
        .step-info h4 { font-size: 15px; margin-bottom: 4px; }
        .step-info p { font-size: 14px; color: var(--text-muted); }
    </style>
</head>
<body>

    <header class="top-header">
        <div class="header-left">
            <div class="header-icon"><i class="fas fa-calendar-alt"></i></div>
            <div class="header-titles">
                <h1>SPIST Scheduling System</h1>
                <p>Southern Philippines Institute of Science and Technology</p>
            </div>
        </div>
        <div class="header-right">
            <h2><?php echo $role_title; ?></h2>
            <p><?php echo $_SESSION['username']; ?>@spist.edu.ph</p>
        </div>
    </header>

    <main class="main-container">
        <div style="display: flex; gap: 24px; align-items: flex-start;">
            <a href="dashboard.php" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Dashboard</a>
            <div class="page-title">
                <h2>Upload Employee Schedule</h2>
                <p>Upload PDF, Excel, or CSV files to automatically detect attendance status</p>
            </div>
        </div>

        <div class="upload-card">
            <h3 style="font-size: 16px; margin-bottom: 4px;">Upload Schedule File</h3>
            <p style="font-size: 14px; color: var(--text-muted);">Supported formats: PDF, Excel (.xlsx, .xls), CSV</p>
            
            <div class="upload-area">
                <i class="fas fa-file-upload"></i>
                <h3>Drop your file here or click to browse</h3>
                <p>Maximum file size: 10MB</p>
                <form action="process_upload.php" method="POST" enctype="multipart/form-data">
                    <button type="button" class="btn-select" onclick="document.getElementById('fileInput').click()"><i class="fas fa-file-alt"></i> Select File</button>
                    <input type="file" id="fileInput" name="schedule_file" style="display: none;" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf">
                </form>
            </div>
        </div>

        <div class="how-it-works">
            <h3>How It Works</h3>
            <div class="step">
                <div class="step-num">1</div>
                <div class="step-info">
                    <h4>Upload Schedule File</h4>
                    <p>Upload a PDF, Excel, or CSV file containing employee schedules with columns: Employee Name, Department, Date, Start Time, End Time, Rest Day</p>
                </div>
            </div>
            <div class="step">
                <div class="step-num">2</div>
                <div class="step-info">
                    <h4>Auto-Detection</h4>
                    <p>The system automatically parses the file and extracts schedule information for each employee</p>
                </div>
            </div>
            <div class="step">
                <div class="step-num">3</div>
                <div class="step-info">
                    <h4>Smart Tracking</h4>
                    <p>When employees clock in, the system compares their actual time with scheduled time to automatically determine if they're late, on time, or on a rest day</p>
                </div>
            </div>
        </div>
    </main>

</body>
</html>