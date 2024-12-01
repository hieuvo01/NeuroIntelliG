"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Sidebar } from "./components/sidebar";
// import { Header } from "./components/header";
// import { Dashboard } from "./components/dashboard";

// import Header from "@/components/header";
// import { Header } from "@/components/dashboard_header";
// import { Dashboard } from "@/components/ui/dashboard";
import { Sidebar } from "@/components/ui/dashboard_sidebar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import AdminTable from "@/components/ui/admin/table_admin";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function Admin_Users() {
  const currentUser = useContext(UserContext) as any;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const route = useRouter();

  const handleEditUser = async (id: string) => {
    route.push(`/admin/users/update/${id}`);
  };

  const getUSers = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await axios.get(
        `${process.env.HTTP_URL}/api/users/admin/search?token=${token}`
      );
      const data = await response;
      setUsers(data.data?.data);
      //   console.log(data.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.delete(
        `${process.env.HTTP_URL}/api/users/admin/delete/${id}?token=${token}`
      );
      message.success("User deleted successfully", 5);
      getUSers();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role === "admin");
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAdmin !== null) {
      if (!isAdmin) {
        window.history.back();
        return;
      }
    }
    getUSers();
  }, [isAdmin]);
  const column = [
    {
      title: "User name",
      dataIndex: "username",
      key: "name",
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phone",
    },
    {
      title: "Verify status",
      dataIndex: "isVerified",
      key: "verifyStatus",
      render: (isVerified: boolean) => {
        switch (isVerified) {
          case true:
            return <span className="text-green-500">Verified</span>;
          case false:
            return <span className="text-red-500">Not verified</span>;
          default:
            return <span>Unknown</span>;
        }
      },
    },
    {
      title: "Options",
      dataIndex: "_id",
      key: "options",
      render: (_id: string) => {
        return (
          <div className="flex space-x-2">
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => {
                handleEditUser(_id);
              }}
            >
              Edit
            </button>
            <button
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => {
                handleDeleteUser(_id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  //   console.log(users);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {isLoading && !users ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingOutlined />
            </div>
          ) : (
            <AdminTable dataSource={users} column={column} />
          )}
        </main>
      </div>
    </div>
  );
}
