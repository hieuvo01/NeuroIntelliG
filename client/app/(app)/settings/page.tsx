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
import { toast } from "react-toastify";
import { useState } from "react";
// import { Textarea } from "@/components/ui/textarea";

export default function UserSettings() {
  function ProfileEdit() {
    //usestate de doi mat khau
    const [password, setPassword] = useState("");
    //usestate(s) de thay doi thong tin nguoi dung
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
      e.preventDefault();

      try {
        const response = await axios.put("/api/users/update-settings", {
          name,
          email,
          phone_number,
        });
        console.log("User updated:", response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    async function handleChangePassword() {
      try {
        const response = await axios.put("/api/users/change-password", {
          password: password,
        });
        console.log("Password changed:", response.data);
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  }
  const handleChangeSettings = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="mx-auto max-w-3xl text-center text-white">
        {/* <h1 className="mt-8 mb-8 text-4xl font-bold">
          Update your information
        </h1> */}
      </div>
      <div className="px-4 py-12 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto flex justify-around space-y-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
              <CardDescription>
                Update your profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <CardFooter className="flex justify-end">
                <Button onSubmit={ProfileEdit} type="submit">
                  Save
                </Button>
              </CardFooter>
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
                    <Button> Choose new avatar</Button>
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
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  placeholder="Enter your current password"
                  type="password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  placeholder="Enter your new password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
