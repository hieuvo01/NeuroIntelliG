/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Upload,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { ThemeProvider } from "./ui/themeprovider";
// import { ModeToggle } from "./ui/modetoggle";
import { UserContext } from "@/app/(app)/layout";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../components/ui/dropdown-menu";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import Link from "next/link";
import AILogoN from "./ui/AILogo";
import SnowEffect from "./SnowEffect";

function Header() {
  const route = useRouter();
  const userToggle = useContext(UserContext) as any;
  const handleFeedsPage = async () => {
    if (!userToggle) {
      route.push("/login");
      return;
    }
    route.push("/feeds");
  };

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (userToggle) {
      setIsAdmin(userToggle.role === "admin");
    }
  }, [userToggle]);

  const getUserInfo = () => {
    const token = localStorage.getItem("token"); // Hoặc lấy từ cookie/sessionStorage
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token); // Giải mã token JWT
        const userName = decodedToken.name; // Lấy tên người dùng
        const userAvatar = decodedToken.avatar; // Lấy avatar người dùng

        return { name: userName, avatar: userAvatar };
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    }
    return null;
  };

  const handleUserSettings = async () => {
    route.push(`/settings`);
  };

  // Nếu userToggle có dữ liệu và có ảnh
  const profileImage =
    userToggle?.avatar ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44JZXz0BWztRFIXCsN7mAp_oU8W3BbPYbGQ&s"; // Nếu không có, dùng ảnh mặc định
  const userLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <div className=" bg-white">
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-400 to-cyan-500 ">
          <a href="/">
            <div className="flex items-center space-x-4">
              {/* <div className="w-14 h-10 rounded-3xl bg-emerald-500  flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div> */}
              <div className="h-24 flex flex-col items-center justify-center bg-transparent">
                <AILogoN className="mb-2" />
                <span
                  className="text-xl text-blue-800 tracking-widest md:text-lg font-extrabold "
                  style={{
                    textShadow:
                      "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                  }}
                >
                  NeuroVision
                </span>
              </div>
            </div>
          </a>

          <nav className="hidden md:flex space-x-4">
            <a
              href="#"
              className=" text-lg font-bold text-pink-700 hover:text-gray-900"
              style={{
                textShadow:
                  "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
              }}
            >
              Explore
            </a>
            <a
              href="/test/demo"
              className="text-lg font-bold text-pink-700 hover:text-gray-900"
              style={{
                textShadow:
                  "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
              }}
            >
              Image Analyzing
            </a>
            <a
              href="/image_of_the_day"
              className="text-lg font-bold text-pink-700 hover:text-gray-900"
              style={{
                textShadow:
                  "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
              }}
            >
              Image of the day
            </a>
            {/* <a href="#" className="text-gray-600 hover:text-gray-900">
              Products
            </a> */}
            <a
              href="/about_us"
              className="text-lg font-bold text-pink-700 hover:text-gray-900"
              style={{
                textShadow:
                  "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
              }}
            >
              About us
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {!userToggle?._id ? (
              <>
                {/* <a href="/login" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </a> */}
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <a href="/login">Sign in</a>
                  </span>
                </button>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <a href="/registration">Sign up</a>
                  </span>
                </button>
              </>
            ) : (
              <>
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* <Button variant="outline"> */}

                      <div
                        style={{
                          boxSizing: "border-box",
                          position: "relative",
                          borderRadius: "50%",
                          padding: "4px",
                          boxShadow: "inset 0 0 0 2px #4D4FF6E",
                          width: "68px",
                          height: "68px",
                        }}
                        className="cursor-pointer transition-all hover:opacity-70 flex items-center gap-4"
                      >
                        <img
                          style={{
                            maxWidth: "100%",
                            verticalAlign: "middle",
                            borderRadius: "50%",
                            marginLeft: "4px",
                          }}
                          src={profileImage}
                          alt="Avatar-border"
                          className="avatar-image"
                        />

                        <img
                          style={{
                            position: "absolute",
                            pointerEvents: "none",
                            animation: "spin 20s linear infinite",
                          }}
                          src="https://i.imgur.com/T1lahme.png"
                          alt="Moldura"
                          className="avatar-frame anim-spin"
                        ></img>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>
                        {userToggle?.name || "Guest"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard />
                          <span>Billing</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings />
                          <span
                            className="cursor-pointer"
                            onClick={handleUserSettings}
                          >
                            Settings
                          </span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <UserPlus />
                            <span>Invite users</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Mail />
                                <span>Email</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare />
                                <span>Message</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle />
                                <span>More...</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Github />
                        <span>GitHub</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LifeBuoy />
                        <span>Support</span>
                      </DropdownMenuItem>
                      {isAdmin && ( // Kiểm tra xem user có phải admin không
                        <DropdownMenuItem>
                          <Settings />
                          <Link href={"/admin/dashboard"}>Admin Panel</Link>
                          <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem disabled>
                        <Cloud />
                        <span>API</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut />
                        <button onClick={userLogout}>Log out</button>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
            <Button variant="outline" onClick={handleFeedsPage}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            {/* avatar  */}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
function jwt_decode(token: string): any {
  throw new Error("Function not implemented.");
}
