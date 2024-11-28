/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import DisableF12 from "@/components/disableF12";
import { usePathname } from "next/navigation";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Neuro Vision",
//   description: "AI-powered Image Video Generator",
// };
export const UserContext = createContext(null);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<Record<string, any>>();

  //khong cho trang admin dung lai header chung
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const handleLoadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.HTTP_URL}/api/users/me?token=${token}`
        );
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoadUser();
  }, []);
  return (
    <html lang="en">
      <body>
        <DisableF12 />
        <UserContext.Provider value={user as any}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* kiem tra neu la trang admin thi khong su dung header  */}
            {!isAdmin && <Header />}
            {/* <Header /> */}
            {children}
            <Footer />
          </ThemeProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
