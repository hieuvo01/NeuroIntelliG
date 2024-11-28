// import { Sidebar } from "./components/sidebar";
// import { Header } from "./components/header";
// import { Dashboard } from "./components/dashboard";

import Header from "@/components/header";
import { Dashboard } from "@/components/ui/dashboard";
import { Sidebar } from "@/components/ui/dashboard_sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
