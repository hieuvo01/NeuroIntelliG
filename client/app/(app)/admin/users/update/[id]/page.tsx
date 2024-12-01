/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

function AdminUpdateUser() {
  const route = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<any>();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoadData = async () => {
    try {
      const token = localStorage.getItem("token");

      setLoadingUser(true);
      const response = await axios.get(
        `${process.env.HTTP_URL}/api/users/admin/detail/${id}/?token=${token}`
      );
      const data = await response;
      setUser(data.data?.data);
      //   console.log(data.data?.data);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      setLoading(true);
      await axios.put(
        `${process.env.HTTP_URL}/api/users/admin/update/${id}/?token=${token}`,
        {
          name: formData.name,
          phone_number: formData.phone_number,
        }
      );
      message.success("User updated successfully", 5);
      route.push("/admin/users");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleLoadData();
  }, []);
  return (
    <>
      {loadingUser && !user ? (
        <LoadingOutlined />
      ) : (
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-5">Update User</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                defaultValue={user?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                placeholder="+84"
                onChange={handleChange}
                defaultValue={user?.phone_number}
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Update
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default AdminUpdateUser;
