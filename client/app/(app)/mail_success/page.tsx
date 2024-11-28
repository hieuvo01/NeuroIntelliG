"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function MailSuccess() {
  const COUNT = 3000;
  const router = useRouter();
  const [count, setCount] = useState(0);

  setTimeout(() => {
    router.push("/login");
    toast.success("Redirecting to homepage...");
  }, COUNT);
  return (
    <Card className="w-full max-w-md max-h-max min-h-96 mt-8 mx-auto">
      <CardHeader>
        <CardTitle>Your account has been verified.</CardTitle>
        {/* <CardDescription>Login</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Directing you to homepage ...</Label>
          </div>
        </div>
      </CardContent>

      <ToastContainer closeOnClick theme="dark" />
    </Card>
  );
}
