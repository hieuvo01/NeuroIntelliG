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
import axios from "axios";
// import { useRouter } from "next/navigation";

export default function LoginForm() {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method: "post",
        url: `${process.env.HTTP_URL}/api/users/login`,
        data: {
          username,
          password,
        },
      }).then((res) => {
        return res.data;
      });

      //   console.log(result);
      localStorage.setItem("token", result.token);
      setLoading(false);
      await toast("Signed In Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      setLoading(false);
      const e = await error;
      await toast.error(`Error while signing up: Invalid username or password`);
      console.error(e);
    }
  };
  return (
    <Card className="w-full max-w-md max-h-max min-h-96 mt-8 mx-auto">
      <CardHeader>
        <CardTitle>Sign In Your Account!</CardTitle>
        {/* <CardDescription>Login</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>
          {/* checkbox remember password */}

          {/* login with social media */}

          {/* <div className="flex justify-start">
            <Button type="button" className="text-sm">
              Sign in with Google
            </Button>
          </div> */}
          <div className="">
            Are you new to this site?
            <a href="/registration" className="ml-1 mr-1 text-teal-200">
              Sign up
            </a>
            now
          </div>
          <a href="/registration" className="ml-1 mr-1 text-red-300">
            Forgot password?
          </a>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </CardContent>

      <ToastContainer closeOnClick theme="dark" />
    </Card>
  );
}
