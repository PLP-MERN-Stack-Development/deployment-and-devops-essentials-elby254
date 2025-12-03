import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Clean Nairobi</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="text-gray-700 hover:text-black">Home</Link>
          <Link to="/dashboard/main" className="text-gray-700 hover:text-black">Dashboard</Link>
          <Link to="/login" className="text-gray-700 hover:text-black">Logout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

