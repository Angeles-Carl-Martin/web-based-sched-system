import {
  Users,
  Building2,
  UserCheck,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react";

const stats = [
  {
    name: "Total Employees",
    value: "1,248",
    icon: Users,
    color: "bg-green-500",
  },
  {
    name: "Departments",
    value: "24",
    icon: Building2,
    color: "bg-green-600",
  },
  {
    name: "Present Today",
    value: "1,156",
    icon: UserCheck,
    color: "bg-green-700",
  },
  {
    name: "Absent Today",
    value: "92",
    icon: Clock,
    color: "bg-red-500",
  },
];

const timeInOutHistory = [
  {
    id: 1,
    employeeId: "EMP-001",
    name: "Sarah Johnson",
    department: "Engineering",
    date: "2026-03-27",
    timeIn: "08:45 AM",
    timeOut: "05:30 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 2,
    employeeId: "EMP-002",
    name: "Michael Chen",
    department: "Sales",
    date: "2026-03-27",
    timeIn: "09:15 AM",
    timeOut: "06:00 PM",
    workHours: "8h 45m",
    status: "Late",
  },
  {
    id: 3,
    employeeId: "EMP-003",
    name: "Emily Davis",
    department: "Marketing",
    date: "2026-03-27",
    timeIn: "08:30 AM",
    timeOut: "05:15 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 4,
    employeeId: "EMP-004",
    name: "James Wilson",
    department: "Finance",
    date: "2026-03-27",
    timeIn: "08:50 AM",
    timeOut: "05:35 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 5,
    employeeId: "EMP-005",
    name: "Lisa Anderson",
    department: "HR",
    date: "2026-03-27",
    timeIn: "08:55 AM",
    timeOut: "05:40 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 6,
    employeeId: "EMP-006",
    name: "Alex Thompson",
    department: "Engineering",
    date: "2026-03-27",
    timeIn: "09:30 AM",
    timeOut: "06:15 PM",
    workHours: "8h 45m",
    status: "Late",
  },
  {
    id: 7,
    employeeId: "EMP-007",
    name: "Rachel Green",
    department: "Sales",
    date: "2026-03-27",
    timeIn: "08:40 AM",
    timeOut: "05:25 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 8,
    employeeId: "EMP-008",
    name: "David Martinez",
    department: "Operations",
    date: "2026-03-27",
    timeIn: "08:35 AM",
    timeOut: "05:20 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 9,
    employeeId: "EMP-009",
    name: "Sophia Lee",
    department: "Marketing",
    date: "2026-03-27",
    timeIn: "09:05 AM",
    timeOut: "05:50 PM",
    workHours: "8h 45m",
    status: "Late",
  },
  {
    id: 10,
    employeeId: "EMP-010",
    name: "Robert Brown",
    department: "Finance",
    date: "2026-03-27",
    timeIn: "08:45 AM",
    timeOut: "05:30 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 11,
    employeeId: "EMP-011",
    name: "Jessica White",
    department: "Engineering",
    date: "2026-03-27",
    timeIn: "08:25 AM",
    timeOut: "05:10 PM",
    workHours: "8h 45m",
    status: "On Time",
  },
  {
    id: 12,
    employeeId: "EMP-012",
    name: "Christopher Moore",
    department: "Sales",
    date: "2026-03-27",
    timeIn: "09:20 AM",
    timeOut: "06:05 PM",
    workHours: "8h 45m",
    status: "Late",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here's what's happening with your organization today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time In/Time Out History */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Time In/Time Out History
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Today's attendance records - March 27, 2026
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Filter
              </button>
              <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Time In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Time Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Work Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {timeInOutHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {record.employeeId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                        {record.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {record.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      {record.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-900">
                        {record.timeIn}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-900">
                        {record.timeOut}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {record.workHours}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        record.status === "On Time"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {timeInOutHistory.length} employees
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">
                  On Time:{" "}
                  {
                    timeInOutHistory.filter((r) => r.status === "On Time")
                      .length
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">
                  Late: {timeInOutHistory.filter((r) => r.status === "Late").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
