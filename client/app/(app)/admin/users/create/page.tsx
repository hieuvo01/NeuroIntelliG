"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminCreateUserForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone_number: "",
    password: "",
    isVerified: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isVerified: e.target.checked });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";

    const phoneRegex =
      /^(\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    if (!phoneRegex.test(formData.phone_number))
      newErrors.phone_number = "Invalid Vietnam phone number";

    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        await axios({
          method: "post",
          url: `${process.env.HTTP_URL}/api/users/admin/create`,
          data: {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password,
            isVerified: formData.isVerified, // thay doi quyen admin cho user :>
          },
        }).then(() => {
          console.log("Form submitted:", formData);
          toast("Successfully created! [VERIFICATION REQUIRED]", {
            position: "bottom-right",
            autoClose: 2000,
          });
          setFormData({
            username: "",
            name: "",
            email: "",
            phone_number: "",
            password: "",
            isVerified: false,
          });
          setTimeout(() => {
            router.push("/admin/users");
          }, 2000);
        });
      } catch (error) {
        setLoading(false);
        toast.error("Error while creating user");
        console.log(error);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle>Create a New User</CardTitle>
        <CardDescription>Admin creates a new user account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="+84"
            />
            {errors.phone_number && (
              <p className="text-sm text-red-500">{errors.phone_number}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="****"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="isVerified">User Verified</Label>
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleCheckboxChange}
            />
            <p className="text-sm text-gray-600">Mark if user is verified</p>
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            Create User
          </Button>
        </form>
      </CardContent>
      <ToastContainer closeOnClick theme="dark" />
    </Card>
  );
}
