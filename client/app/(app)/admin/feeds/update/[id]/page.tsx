"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Input, message } from "antd";
import { Label } from "@radix-ui/react-dropdown-menu";

const AdminEditFeed = () => {
  const [isClient, setIsClient] = useState(false); // Thêm trạng thái để kiểm tra phía client
  const [feedData, setFeedData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // sử dụng useRouter bên trong client-side

  // Chỉ gán router sau khi component đã được mount
  useEffect(() => {
    setIsClient(true); // Set client-side rendering khi component mount
  }, []);

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchFeed = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${process.env.HTTP_URL}/api/feeds/admin/feeds/edit/${id}?token=${token}`
          );
          setFeedData(response.data.feed);
        } catch (error) {
          console.error("Error fetching feed:", error);
        }
      };

      fetchFeed();
    }
  }, [id]); // Chỉ chạy lại khi id thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.HTTP_URL}/api/feeds/admin/feeds/${id}?token=${token}`,
        feedData
      );
      message.success("Feed updated successfully");
      router.push("/admin/feeds"); // Redirect to admin feeds page after update
    } catch (error) {
      console.error("Error updating feed:", error);
      message.error("Failed to update feed");
    } finally {
      setLoading(false);
    }
  };

  // Nếu chưa mount trên client, hiển thị loading hoặc thông báo
  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Nếu chưa có id, hiển thị loading
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Feed</h1>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={feedData.title}
          onChange={handleChange}
        />

        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={feedData.description}
          onChange={handleChange}
        />

        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          value={feedData.price}
          onChange={handleChange}
        />

        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          name="type"
          value={feedData.type}
          onChange={handleChange}
        />

        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={feedData.url}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Feed"}
        </Button>
      </form>
    </div>
  );
};

export default AdminEditFeed;
