import { Calendar, Clock, UserCheck, UserX, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const weeklyAttendance = [
  { day: "Mon", present: 1156, absent: 35, late: 22, onTime: 1134 },
  { day: "Tue", present: 1168, absent: 28, late: 18, onTime: 1150 },
  { day: "Wed", present: 1145, absent: 42, late: 25, onTime: 1120 },
  { day: "Thu", present: 1172, absent: 31, late: 15, onTime: 1157 },
  { day: "Fri", present: 1139, absent: 48, late: 28, onTime: 1111 },
];

const monthlyTrend = [
  { month: "Sep", rate: 94.2 },
  { month: "Oct", rate: 95.1 },
  { month: "Nov", rate: 93.8 },
  { month: "Dec", rate: 92.5 },
  { month: "Jan", rate: 94.7 },
  { month: "Feb", rate: 95.3 },
  { month: "Mar", rate: 96.1 },
];

const departmentAttendance = [
  { department: "Engineering", present: 372, absent: 13, rate: 96.6 },
  { department: "Sales", present: 235, absent: 7, rate: 97.1 },
  { department: "Marketing", present: 149, absent: 7, rate: 95.5 },
  { department: "HR", present: 87, absent: 2, rate: 97.8 },
  { department: "Finance", present: 119, absent: 5, rate: 96.0 },
  { department: "Operations", present: 245, absent: 7, rate: 97.2 },
];

const recentLogs = [
  {
    id: 1,
    employee: "Sarah Johnson",
    checkIn: "08:45 AM",
    checkOut: "05:30 PM",
    status: "On Time",
    hours: "8h 45m",
  },
  {
    id: 2,
    employee: "Michael Chen",
    checkIn: "09:15 AM",
    checkOut: "06:00 PM",
    status: "Late",
    hours: "8h 45m",
  },
  {
    id: 3,
    employee: "Emily Davis",
    checkIn: "08:30 AM",
    checkOut: "05:15 PM",
    status: "On Time",
    hours: "8h 45m",
  },
  {
    id: 4,
    employee: "Alex Thompson",
    checkIn: "08:55 AM",
    checkOut: "05:45 PM",
    status: "On Time",
    hours: "8h 50m",
  },
  {
    id: 5,
    employee: "Rachel Green",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    hours: "-",
  },
];

export function Attendance() {
  const todayStats = {
    totalEmployees: 1248,
    present: 1156,
    absent: 48,
    late: 28,
    onLeave: 44,
  };

  const attendanceRate = (
    (todayStats.present / todayStats.totalEmployees) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Attendance Tracking
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor employee attendance and work hours
        </p>
      </div>

      {/* Today's Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present Today</p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {todayStats.present}
              </p>
            </div>
            <div className="rounded-lg bg-green-100 p-3">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="mt-2 text-3xl font-semibold text-red-600">
                {todayStats.absent}
              </p>
            </div>
            <div className="rounded-lg bg-red-100 p-3">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late Arrivals</p>
              <p className="mt-2 text-3xl font-semibold text-orange-600">
                {todayStats.late}
              </p>
            </div>
            <div className="rounded-lg bg-orange-100 p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Leave</p>
              <p className="mt-2 text-3xl font-semibold text-blue-600">
                {todayStats.onLeave}
              </p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {attendanceRate}%
              </p>
            </div>
            <div className="rounded-lg bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Attendance */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Weekly Attendance Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="present" fill="#10B981" name="Present" />
              <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              <Bar dataKey="late" fill="#F59E0B" name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Monthly Attendance Rate Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis
                domain={[90, 100]}
                stroke="#6B7280"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value: any) => `${value}%`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", r: 5 }}
                name="Attendance Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department-wise Attendance */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Department-wise Attendance (Today)
        </h2>
        <div className="space-y-3">
          {departmentAttendance.map((dept) => (
            <div
              key={dept.department}
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{dept.department}</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${dept.rate}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-900">
                  {dept.rate}%
                </p>
                <p className="text-xs text-gray-600">
                  {dept.present} / {dept.present + dept.absent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attendance Logs */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Attendance Logs
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Today's check-in and check-out records
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{log.employee}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {log.checkIn}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {log.checkOut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {log.hours}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        log.status === "On Time"
                          ? "bg-green-100 text-green-700"
                          : log.status === "Late"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
