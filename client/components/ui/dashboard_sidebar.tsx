import Link from "next/link";
import { Brain, BarChart2, Users, Folder, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <Brain className="h-8 w-8 text-purple-400" />
        <span className="text-2xl font-extrabold">NeuroIntelliG™</span>
      </div>
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <svg
            className="inline-block mr-3 h-5 w-5  "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />{" "}
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Homepage
        </Link>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <BarChart2 className="inline-block mr-2 h-5 w-5" /> Dashboard
        </Link>
        <Link
          href="/admin/feeds"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Folder className="inline-block mr-2 h-5 w-5" /> Feeds
        </Link>
        <Link
          href="/admin/users"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2 h-5 w-5" /> Users
        </Link>
        <Link
          href="/admin/earnings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <svg
            className="inline-block mr-3 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Earnings
        </Link>
        <Link
          href="/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="inline-block mr-2 h-5 w-5" /> Settings
        </Link>
      </nav>
    </div>
  );
}
