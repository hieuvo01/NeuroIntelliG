/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import AdminTable from "@/components/ui/admin/table_admin";
import { message, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/dashboard_sidebar";

export default function Admin_Feeds() {
  const currentUser = useContext(UserContext) as any;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feeds, setFeeds] = useState<any[]>([]);
  const route = useRouter();

  const handleEditFeed = async (id: string) => {
    route.push(`${process.env.HTTP_URL}/admin/feeds/edit/${id}`);
  };

  const getFeeds = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await axios.get(
        `${process.env.HTTP_URL}/api/feeds/admin/feeds?token=${token}`
      );
      const data = await response;
      setFeeds(data.data?.feeds);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteFeed = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      await axios.delete(
        `${process.env.HTTP_URL}/api/feeds/admin/${id}?token=${token}`
      );
      message.success("Feed deleted successfully", 5);
      getFeeds();
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
    getFeeds();
  }, [isAdmin]);

  const column = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => {
        const truncated =
          description.length > 100
            ? description.slice(0, 100) + "..."
            : description;
        return (
          <Tooltip title={description}>
            <span>{truncated}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
                handleEditFeed(_id);
              }}
            >
              Edit
            </button>
            <button
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => {
                handleDeleteFeed(_id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {isLoading && !feeds ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingOutlined />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    {column.map((col) => (
                      <th
                        key={col.key}
                        className="py-2 px-4 text-sm font-medium text-gray-700 border-b"
                      >
                        {col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feeds.map((feed) => (
                    <tr key={feed._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {feed.title}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {feed.description}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        ${feed.price}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {feed.type}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        <div className="flex space-x-2">
                          <button
                            className="text-sm text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              handleEditFeed(feed._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-sm text-red-500 hover:text-red-700"
                            onClick={() => {
                              handleDeleteFeed(feed._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
