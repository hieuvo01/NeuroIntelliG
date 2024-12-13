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
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function Admin_Users() {
  const currentUser = useContext(UserContext) as any;
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const route = useRouter();

  const handleCreateUser = async () => {
    route.push("/admin/users/create");
  };

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

  //   console.log(users);
  return (
    <div className="flex h-screen  bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {isLoading && !users.length ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingOutlined />
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              {/* Users Table */}
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Verify Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button
                        type="button"
                        onClick={handleCreateUser}
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                      >
                        Create New
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${user._id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.username}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phone_number}</td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            user.isVerified ? "text-green-500" : "text-red-500"
                          }
                        >
                          {user.isVerified ? "Verified" : "Not verified"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-sm text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditUser(user._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-sm text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4"></td>
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
