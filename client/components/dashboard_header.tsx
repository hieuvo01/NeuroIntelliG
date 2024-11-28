import { Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center">
          <button className="p-2 mr-4 text-gray-600 hover:text-gray-800">
            <Bell className="h-6 w-6" />
          </button>
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <User className="h-6 w-6 mr-2" />
            <span>John Doe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
