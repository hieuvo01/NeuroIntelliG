/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Sử dụng router để chuyển hướng

export default function UserSettings() {
  function ProfileEdit() {
    const [password, setPassword] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const router = useRouter(); // Để chuyển hướng nếu token không hợp lệ
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
          toast.error("No token found! Please log in.");
          router.push("/login"); // Chuyển hướng nếu không có token
          return;
        }

        const response = await axios.put(
          `${process.env.HTTP_URL}/api/users/update-settings`,
          {
            name,
            email,
            phone_number,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Updated successfully, please re-sign in to continue!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
        console.log("User updated:", response.data);
      } catch (error: any) {
        console.error("Error updating user:", error.response || error.message);
        if (error.response?.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          router.push("/login");
        } else {
          toast.error("Error updating user.");
        }
      }
    };

    const handleUploadAvatar = async (e) => {
      e.preventDefault();

      const fileInput = document.getElementById("myfile");
      const file = fileInput.files[0];
      if (!file) {
        toast.error("Please select an avatar first!");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          router.push("/login");
          return;
        }

        const response = await axios.put(
          `${process.env.HTTP_URL}/api/users/update-avatar`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Avatar updated successfully!");
        setAvatar(response.data.avatar); // Cập nhật avatar mới trong giao diện
      } catch (error) {
        toast.error("Failed to update avatar. Please try again.");
      }
    };

    const handleChangePassword = async (e: any) => {
      e.preventDefault(); // Ngăn trình duyệt reload

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found! Please log in.");
          router.push("/login");
          return;
        }

        if (!currentPassword || !newPassword) {
          return toast.error("Both current and new passwords are required.");
        }
        if (currentPassword === newPassword) {
          return toast.error(
            "New password must be different from current password."
          );
        }

        const response = await axios.put(
          `${process.env.HTTP_URL}/api/users/change-password`,
          { current_password: currentPassword, new_password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Password changed successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        console.error(
          "Error changing password:",
          error.response || error.message
        );
        if (error.response?.status === 401) {
          toast.error("Unauthorized! Please log in again.");
          router.push("/login");
        } else {
          toast.error("Error changing password.");
        }
      }
    };

    return (
      <div className="">
        <div className="mx-auto max-w-3xl text-center text-white"></div>
        <div className="px-4 py-12 sm:px-6 lg:px-8 mt-10">
          <div className="mx-auto flex justify-around space-y-8">
            <ToastContainer closeOnClick theme="dark" />

            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>
                  Update your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone_number"
                      placeholder="Enter your phone number"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <CardFooter className="flex justify-end">
                    <Button type="submit">Save</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
            <Card className="w-full max-w-md">
              <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-2">
                  <Label>Avatar</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        alt="@shadcn"
                        src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/341615475_2434267820081587_6490100784537918171_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFLDi-1jjN-UAhnPBFY3-pcFI7O-5yFcjwUjs77nIVyPF0GHJHnLaOskm8HhJ2DBhzplDXBqnXEt-ouAsJEuUM4&_nc_ohc=0ACiqpHtVYwQ7kNvgFLLDKT&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AZVjqsaMD9AO6aZ2ew0YsWN&oh=00_AYDmfudElyhpNfrWEuRMiZTEKwjR5IfmgiaMz69nHASzZA&oe=674E3B0D"
                      />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2.5">
                      <Button>Choose new avatar</Button>
                      <input type="file" id="myfile" name="myfile" />
                      <Button size="sm" variant="outline">
                        Remove avatar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
                <CardDescription>Update your password.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <form onSubmit={handleChangePassword}>
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      placeholder="Enter your current password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      placeholder="Enter your new password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <CardFooter className="flex justify-end">
                    <Button type="submit">Save</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return <ProfileEdit />;
}
