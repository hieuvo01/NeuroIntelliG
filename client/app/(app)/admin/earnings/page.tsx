"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Sidebar } from "./components/sidebar";
// import { Header } from "./components/header";
// import { Dashboard } from "./components/dashboard";

// import Header from "@/components/header";
// import { Header } from "@/components/dashboard_header";
// import { Dashboard } from "@/components/ui/dashboard";
import { Sidebar } from "@/components/ui/dashboard_sidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import { Dashboard } from "@/components/ui/dashboard";

export default function Admin_Earnings() {
  const currentUser = useContext(UserContext) as any;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role === "admin");
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAdmin !== null) {
      if (!isAdmin) {
        window.history.back();
        return;
      }
    }
  }, [isAdmin]);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {/* <Dashboard /> */}
        </main>
      </div>
    </div>
  );
}
