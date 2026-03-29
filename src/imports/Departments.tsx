import { useState } from "react";
import { Plus, Edit, Trash2, Users, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const departments = [
  {
    id: 1,
    name: "Engineering",
    head: "Sarah Johnson",
    employees: 385,
    budget: "$4,850,000",
    growth: "+12.5%",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Sales",
    head: "Michael Chen",
    employees: 242,
    budget: "$2,420,000",
    growth: "+8.3%",
    color: "#10B981",
  },
  {
    id: 3,
    name: "Marketing",
    head: "Emily Davis",
    employees: 156,
    budget: "$1,950,000",
    growth: "+15.7%",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "HR",
    head: "Lisa Anderson",
    employees: 89,
    budget: "$890,000",
    growth: "+5.2%",
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Finance",
    head: "James Wilson",
    employees: 124,
    budget: "$1,240,000",
    growth: "+6.8%",
    color: "#EF4444",
  },
  {
    id: 6,
    name: "Operations",
    head: "David Martinez",
    employees: 252,
    budget: "$3,150,000",
    growth: "+10.2%",
    color: "#06B6D4",
  },
];

const chartData = departments.map((dept) => ({
  name: dept.name,
  value: dept.employees,
  color: dept.color,
}));

export function Departments() {
  const [showAddModal, setShowAddModal] = useState(false);

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + dept.employees,
    0
  );
  const totalBudget = departments.reduce((sum, dept) => {
    const budget = parseFloat(dept.budget.replace(/[$,]/g, ""));
    return sum + budget;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage organizational departments and their resources
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Departments</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {departments.length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totalEmployees.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Total Budget</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            ${(totalBudget / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">Avg Growth</p>
          <p className="mt-2 text-3xl font-semibold text-green-600">+9.8%</p>
        </div>
      </div>

      {/* Chart and List */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Distribution Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`dept-cell-${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Department Performance
          </h2>
          <div className="space-y-3">
            {[...departments]
              .sort((a, b) => {
                const aGrowth = parseFloat(a.growth.replace(/[+%]/g, ""));
                const bGrowth = parseFloat(b.growth.replace(/[+%]/g, ""));
                return bGrowth - aGrowth;
              })
              .slice(0, 3)
              .map((dept, index) => (
                <div
                  key={dept.id}
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-semibold text-white">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-600">
                      {dept.employees} employees • {dept.budget}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      {dept.growth}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Color accent bar */}
            <div
              className="h-2"
              style={{ backgroundColor: dept.color }}
            />

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {dept.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Head: {dept.head}
                  </p>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="rounded p-1.5 text-gray-600 hover:bg-gray-100">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-600 hover:bg-gray-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Employees</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {dept.employees}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="font-semibold text-gray-900">
                    {dept.budget}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-700">Growth</span>
                  </div>
                  <span className="font-semibold text-green-700">
                    {dept.growth}
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Department
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Customer Success"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department Head
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Initial Budget
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="$500,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color Theme
                  </label>
                  <input
                    type="color"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300"
                    defaultValue="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Brief description of the department..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}