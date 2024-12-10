"use client";
import React, { useState, useEffect } from "react";
import { Table, Spin, Button, message } from "antd";
import axios from "axios";

const EarningsPage = () => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch earnings data on page load
    const fetchEarnings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await axios.get(
          `${process.env.HTTP_URL}/api/earnings/search?token=${token}`
        );
        setEarnings(response.data.earning); // Lưu earnings vào state
      } catch (error) {
        console.error("Error fetching earnings:", error);
        message.error("Failed to load earnings data");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{userId}</span>,
    },
    {
      title: "Feed ID",
      dataIndex: "feedId",
      key: "feedId",
      render: (feedId) => <span>{feedId}</span>,
    },
    {
      title: "Details",
      dataIndex: "info.details",
      key: "details",
      render: (details) => <span>{details}</span>,
    },
    {
      title: "Data",
      dataIndex: "info.data",
      key: "data",
      render: (data) => <span>{data}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>{new Date(createdAt).toLocaleString()}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record._id)} type="danger">
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/earnings/${id}?token=${token}`);
      setEarnings(earnings.filter((earning) => earning._id !== id));
      message.success("Earning deleted successfully");
    } catch (error) {
      console.error("Error deleting earning:", error);
      message.error("Failed to delete earning");
    }
  };

  return (
    <div>
      <h1>Earnings Management</h1>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <Table
          columns={columns}
          dataSource={earnings}
          rowKey="_id"
          pagination={true}
        />
      )}
    </div>
  );
};

export default EarningsPage;
