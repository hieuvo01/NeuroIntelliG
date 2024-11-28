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
          <BarChart2 className="inline-block mr-2 h-5 w-5" /> Back to Homepage
        </Link>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <BarChart2 className="inline-block mr-2 h-5 w-5" /> Dashboard
        </Link>
        <Link
          href="/projects"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Folder className="inline-block mr-2 h-5 w-5" /> Projects
        </Link>
        <Link
          href="/team"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Users className="inline-block mr-2 h-5 w-5" /> Team
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
