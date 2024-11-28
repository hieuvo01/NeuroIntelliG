"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import axios from "axios";
// import { useRouter } from "next/navigation";

export default function LoginForm() {
  // const router = useRouter();

  return (
    <Card className="w-full max-w-md max-h-max min-h-96 mt-8 mx-auto">
      <CardHeader>
        <CardTitle>
          We have sent you a verification mail to your mailbox
        </CardTitle>
        {/* <CardDescription>Login</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              Please click on the link we sent to complete your account
              registration
            </Label>
          </div>
        </div>
      </CardContent>

      <ToastContainer closeOnClick theme="dark" />
    </Card>
  );
}
