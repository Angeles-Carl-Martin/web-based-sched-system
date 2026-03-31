<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

// Database Connection
$conn = new mysqli("localhost", "root", "", "attendance_db");
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

// Auto-detect role
$role = $_SESSION['role'];
$role_title = ($role == 'super_admin') ? 'Super Admin Dashboard' : 'Admin Dashboard';
$username = $_SESSION['username'];

// Fetch all unique departments for the dropdown filter
$dept_query = $conn->query("SELECT DISTINCT Department FROM employee_info WHERE Department != ''");
$departments = [];
while ($row = $dept_query->fetch_assoc()) {
    $departments[] = $row['Department'];
}

// Fetch Today's Attendance combining employee_info and attendance_logs
// Assume standard schedule is 8:00 AM to 5:00 PM for calculations since it's not in DB yet
$today = date("Y-m-d");
$sql = "SELECT e.Employee_Name, e.Department, a.Time_In, a.Time_Out 
        FROM employee_info e 
        LEFT JOIN attendance_logs a ON e.Employee_Number = a.Employee_Number AND a.Date = '$today'";
$result = $conn->query($sql);

$attendance_data = [];
$stats = ['total' => 0, 'ontime' => 0, 'late' => 0, 'absent' => 0];

while ($row = $result->fetch_assoc()) {
    $stats['total']++;
    $status = 'Absent';
    $badge_class = 'badge-absent';
    $icon = 'far fa-times-circle';

    if ($row['Time_In'] != null) {
        $time_in_stamp = strtotime($row['Time_In']);
        $schedule_start = strtotime("08:00:00"); // Assuming 8 AM start time
        
        if ($time_in_stamp <= $schedule_start) {
            $status = 'On Time';
            $badge_class = 'badge-ontime';
            $icon = 'far fa-check-circle';
            $stats['ontime']++;
        } else {
            $status = 'Late';
            $badge_class = 'badge-late';
            $icon = 'far fa-clock';
            $stats['late']++;
        }
    } else {
        $stats['absent']++;
    }

    $row['status_label'] = $status;
    $row['badge_class'] = $badge_class;
    $row['icon'] = $icon;
    
    // Format times for display
    $row['display_time_in'] = $row['Time_In'] ? date("g:i A", strtotime($row['Time_In'])) : "-";
    $row['display_time_out'] = $row['Time_Out'] ? date("g:i A", strtotime($row['Time_Out'])) : "-";
    
    // Calculate hours worked
    if ($row['Time_In'] && $row['Time_Out']) {
        $hours = round((strtotime($row['Time_Out']) - strtotime($row['Time_In'])) / 3600, 2);
        $row['hours_worked'] = $hours . "h";
    } else {
        $row['hours_worked'] = "-";
    }

    $attendance_data[] = $row;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SPIST</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* (Same CSS as the previous template) */
        :root { --primary-green: #0E8F4F; --bg-color: #F9FAFB; --card-bg: #FFFFFF; --text-main: #111827; --text-muted: #6B7280; --border-color: #E5E7EB; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--bg-color); color: var(--text-main); display: flex; min-height: 100vh; }
        .sidebar { width: 280px; background-color: var(--card-bg); border-right: 1px solid var(--border-color); padding: 24px 0; position: fixed; height: 100vh; overflow-y: auto; }
        .sidebar-header { padding: 0 24px 24px; border-bottom: 1px solid var(--border-color); margin-bottom: 24px; }
        .sidebar-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .sidebar-logo .logo-icon { background: var(--primary-green); color: white; width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .sidebar-logo h3 { font-size: 16px; font-weight: 600; color: var(--text-main); }
        .sidebar-logo p { font-size: 12px; color: var(--text-muted); }
        .sidebar-nav { list-style: none; }
        .nav-item { margin-bottom: 4px; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 24px; text-decoration: none; color: var(--text-muted); font-weight: 500; transition: all 0.2s; }
        .nav-link:hover { background-color: #F3F4F6; color: var(--text-main); }
        .nav-link.active { background-color: var(--primary-green); color: white; }
        .nav-link i { width: 20px; font-size: 16px; }
        .main-content { flex: 1; margin-left: 280px; }
        .top-header { background-color: var(--primary-green); color: white; padding: 12px 32px; display: flex; justify-content: space-between; align-items: center; }
        .header-left { display: flex; align-items: center; gap: 16px; }
        .header-icon { background: white; color: var(--primary-green); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .header-titles h1 { font-size: 16px; font-weight: 600; }
        .header-titles p { font-size: 12px; color: rgba(255,255,255,0.8); }
        .header-right { text-align: right; }
        .header-right h2 { font-size: 14px; font-weight: 600; }
        .header-right p { font-size: 12px; color: rgba(255,255,255,0.8); }
        .header-right a { color: white; font-size: 12px; text-decoration: underline; }
        .main-container { padding: 32px; max-width: 1400px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .page-header h2 { font-size: 24px; margin-bottom: 4px; }
        .page-header p { font-size: 14px; color: var(--text-muted); }
        .btn-upload { background-color: var(--primary-green); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .stat-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
        .stat-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .stat-info p { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; font-weight: 500; }
        .stat-info h3 { font-size: 28px; font-weight: 700; }
        .stat-icon { width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .icon-blue { background: #E0F2FE; color: #0284C7; } .icon-green { background: #DCFCE7; color: #16A34A; } .icon-yellow { background: #FEF9C3; color: #CA8A04; } .icon-red { background: #FEE2E2; color: #DC2626; }
        .filters { display: flex; gap: 16px; margin-bottom: 24px; }
        .search-bar { flex: 1; position: relative; }
        .search-bar i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9CA3AF; }
        .search-bar input { width: 100%; padding: 10px 14px 10px 40px; border: 1px solid var(--border-color); border-radius: 8px; outline: none; }
        .filter-select { padding: 10px 16px; border: 1px solid var(--border-color); border-radius: 8px; min-width: 180px; }
        .table-container { background: white; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; }
        .table-header { padding: 20px; border-bottom: 1px solid var(--border-color); }
        table { width: 100%; border-collapse: collapse; }
        th { background: #F9FAFB; padding: 12px 20px; text-align: left; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border-color); }
        td { padding: 16px 20px; border-bottom: 1px solid var(--border-color); font-size: 14px; }
        .emp-name { font-weight: 600; }
        .time-sched { font-size: 12px; color: #9CA3AF; display: block; }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
        .badge-ontime { background: #DCFCE7; color: #16A34A; } .badge-late { background: #FEF9C3; color: #CA8A04; } .badge-absent { background: #FEE2E2; color: #DC2626; }
    </style>
</head>
<body>

    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="logo-icon"><i class="fas fa-calendar-alt"></i></div>
                <div>
                    <h3>SPIST</h3>
                    <p>Scheduling System</p>
                </div>
            </div>
        </div>
        <nav>
            <ul class="sidebar-nav">
                <li class="nav-item">
                    <a href="dashboard.php" class="nav-link active">
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fas fa-users"></i>
                        Employees
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fas fa-clock"></i>
                        Attendance
                    </a>
                </li>
                <li class="nav-item">
                    <a href="upload_schedule.php" class="nav-link">
                        <i class="fas fa-calendar"></i>
                        Schedule
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fas fa-chart-bar"></i>
                        Reports
                    </a>
                </li>
                <?php if($role == 'super_admin'): ?>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fas fa-cog"></i>
                        Settings
                    </a>
                </li>
                <?php endif; ?>
            </ul>
        </nav>
    </aside>

    <div class="main-content">
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
            <p><?php echo $username; ?> | <a href="logout.php">Logout</a></p>
        </div>
    </header>

    <main class="main-container">
        
        <div class="page-header">
            <div>
                <h2>Employee Attendance Dashboard</h2>
                <p><?php echo date("l, F j, Y"); ?></p>
            </div>
            <a href="upload_schedule.php" class="btn-upload">
                <i class="fas fa-upload"></i> Upload Schedule
            </a>
        </div>

        <div class="stat-cards">
            <div class="stat-card">
                <div class="stat-info"><p>Total Employees</p><h3><?php echo $stats['total']; ?></h3></div>
                <div class="stat-icon icon-blue"><i class="fas fa-users"></i></div>
            </div>
            <div class="stat-card">
                <div class="stat-info"><p>On Time</p><h3><?php echo $stats['ontime']; ?></h3></div>
                <div class="stat-icon icon-green"><i class="fas fa-user-check"></i></div>
            </div>
            <div class="stat-card">
                <div class="stat-info"><p>Late</p><h3><?php echo $stats['late']; ?></h3></div>
                <div class="stat-icon icon-yellow"><i class="fas fa-clock"></i></div>
            </div>
            <div class="stat-card">
                <div class="stat-info"><p>Absent</p><h3><?php echo $stats['absent']; ?></h3></div>
                <div class="stat-icon icon-red"><i class="fas fa-times-circle"></i></div>
            </div>
        </div>

        <div class="filters">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Search by employee name...">
            </div>
            <select id="statusFilter" class="filter-select">
                <option value="all">All Status</option>
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
            </select>
            <select id="deptFilter" class="filter-select">
                <option value="all">All Departments</option>
                <?php foreach($departments as $dept): ?>
                    <option value="<?php echo htmlspecialchars($dept); ?>"><?php echo htmlspecialchars($dept); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="table-container">
            <div class="table-header">
                <h3>Today's Attendance</h3>
            </div>
            <table id="attendanceTable">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Hours Worked</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(count($attendance_data) > 0): ?>
                        <?php foreach($attendance_data as $row): ?>
                            <tr class="data-row" data-name="<?php echo strtolower($row['Employee_Name']); ?>" data-dept="<?php echo $row['Department']; ?>" data-status="<?php echo $row['status_label']; ?>">
                                <td class="emp-name"><?php echo htmlspecialchars($row['Employee_Name']); ?></td>
                                <td><?php echo htmlspecialchars($row['Department']); ?></td>
                                <td>
                                    <span class="time-sched">Sched: 8:00 AM</span>
                                    <span style="<?php echo ($row['status_label'] == 'Late') ? 'color: red;' : ''; ?>">
                                        <?php echo $row['display_time_in']; ?>
                                    </span>
                                </td>
                                <td>
                                    <span class="time-sched">Sched: 5:00 PM</span>
                                    <span><?php echo $row['display_time_out']; ?></span>
                                </td>
                                <td style="font-weight: 500;"><?php echo $row['hours_worked']; ?></td>
                                <td><span class="badge <?php echo $row['badge_class']; ?>"><i class="<?php echo $row['icon']; ?>"></i> <?php echo $row['status_label']; ?></span></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr><td colspan="6" style="text-align: center;">No employee records found.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

    </main>

    <script>
        const searchInput = document.getElementById('searchInput');
        const statusFilter = document.getElementById('statusFilter');
        const deptFilter = document.getElementById('deptFilter');
        const rows = document.querySelectorAll('.data-row');

        function filterTable() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedStatus = statusFilter.value;
            const selectedDept = deptFilter.value;

            rows.forEach(row => {
                const name = row.getAttribute('data-name');
                const dept = row.getAttribute('data-dept');
                const status = row.getAttribute('data-status');

                const matchesSearch = name.includes(searchTerm);
                const matchesStatus = (selectedStatus === 'all' || status === selectedStatus);
                const matchesDept = (selectedDept === 'all' || dept === selectedDept);

                if (matchesSearch && matchesStatus && matchesDept) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        searchInput.addEventListener('input', filterTable);
        statusFilter.addEventListener('change', filterTable);
        deptFilter.addEventListener('change', filterTable);
    </script>
    </div>
</body>
</html>