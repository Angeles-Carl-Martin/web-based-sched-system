export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Settings</h2>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Email Notifications</label>
            <input type="checkbox" className="mr-2" />
            <span>Receive email notifications</span>
          </div>
          <div>
            <label className="block mb-2">Theme</label>
            <select className="w-full px-3 py-2 border rounded">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Language</label>
            <select className="w-full px-3 py-2 border rounded">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
