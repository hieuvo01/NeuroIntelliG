/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext } from "react";
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
  const userLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div>
      <div className=" bg-white">
        <header className="flex items-center justify-between p-4 bg-white">
          <a href="/">
            <div className="flex items-center space-x-4">
              {/* <div className="w-14 h-10 rounded-3xl bg-emerald-500  flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div> */}
              <div className="h-24 flex flex-col items-center justify-center bg-transparent">
                <AILogoN className="mb-2" />
                <span className="text-xl text-blue-800 tracking-widest md:text-lg font-extrabold">
                  NeuroVision
                </span>
              </div>
            </div>
          </a>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Explore
            </a>
            <a
              href="/image_of_the_day"
              className="text-gray-600 hover:text-gray-900"
            >
              Image of the day
            </a>
            {/* <a href="#" className="text-gray-600 hover:text-gray-900">
              Products
            </a> */}
            <a href="/about_us" className="text-gray-600 hover:text-gray-900">
              About us
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {!userToggle?._id ? (
              <>
                <a href="/login" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </a>
                <a
                  href="/registration"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Up
                </a>
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
                          src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/341615475_2434267820081587_6490100784537918171_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFLDi-1jjN-UAhnPBFY3-pcFI7O-5yFcjwUjs77nIVyPF0GHJHnLaOskm8HhJ2DBhzplDXBqnXEt-ouAsJEuUM4&_nc_ohc=0ACiqpHtVYwQ7kNvgFLLDKT&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AZVjqsaMD9AO6aZ2ew0YsWN&oh=00_AYDmfudElyhpNfrWEuRMiZTEKwjR5IfmgiaMz69nHASzZA&oe=674E3B0D"
                          alt="Avatar-border"
                          className="avatar-image"
                        />

                        <img
                          style={{
                            position: "absolute",
                            pointerEvents: "none",
                            animation: "spin 20s linear infinite",
                          }}
                          src="https://i.imgur.com/0aDdQyR.png"
                          alt="Moldura"
                          className="avatar-frame anim-spin"
                        ></img>
                      </div>
                      {/* <img
                        style={{
                          borderRadius: "25%",
                          border: "6px solid #419949",
                          padding: "4px",
                          width: "4rem",
                        }}
                        className="cursor-pointer"
                        src="https://images.pexels.com/users/avatars/1931010954/2004-_-vo-minh-hi-u-711.jpg?auto=compress&fit=crop&h=30&w=30&dpr=2"
                        alt=""
                      /> */}
                      {/* </Button> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Hieu Minh</DropdownMenuLabel>
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
                          <Link href={"/settings"}>Settings</Link>
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
