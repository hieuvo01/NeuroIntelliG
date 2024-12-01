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
  return (
    <html lang="en">
      <body>
        {!loading && (
          <UserContext.Provider value={user as any}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </UserContext.Provider>
        )}
      </body>
    </html>
  );
}
