//
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import DisableF12 from "@/components/disableF12";

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
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Record<string, any>>();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const handleLoadUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${process.env.HTTP_URL}/api/users/me?token=${token}`
        );
        setUser(response.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLoadUser();
  }, []);
  //chan F12 va chuot phai
  DisableF12();

  return (
    <html lang="en">
      <body className=" bg-[url('https://c4.wallpaperflare.com/wallpaper/616/569/304/tree-snowflake-new-year-merry-christmas-hd-background-wallpaper-preview.jpg')] bg-cover">
        {!loading && (
          <UserContext.Provider value={user as any}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {!isAdmin && <Header />}
              {children}
              <Footer />
            </ThemeProvider>
          </UserContext.Provider>
        )}
      </body>
    </html>
  );
}
