/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { toast } from "react-toastify";

function AdminUpdateUser() {
  const route = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<any>();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone_number: "",
    email: "",
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
      await toast("Updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setLoadingUser(false);
    } catch (error) {
      await toast(`${error}`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.log(error);
      setLoadingUser(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data", formData);
    if (
      !formData.name ||
      !formData.phone_number ||
      !formData.username ||
      !formData.email
    ) {
      message.error("Please fill in all fields");
    }
    try {
      const token = localStorage.getItem("token");

      setLoading(true);
      await axios.put(
        `${process.env.HTTP_URL}/api/users/admin/update/${id}/?token=${token}`,
        {
          name: formData.name,
          phone_number: formData.phone_number,
          username: formData.username,
          email: formData.email,
        }
      );
      message.success("User updated successfully", 5);
      route.push("/admin/users");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
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
        <div className="w-full max-w-md mx-auto my-16">
          <div className="h-[100%] w-[100%] m-auto p-11 align-middle text-sm rtl:text-right bg-gradient-to-l from-green-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium px-5  me-2 mb-2  rounded-md py-9  text-gray-500 dark:text-gray-400">
            <h1 className="text-2xl text-center text-lime-500  font-bold mb-5">
              USER MANAGEMENT: UPDATE
            </h1>
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-6"
            >
              {/* Email */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  defaultValue={user?.email}
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-xl text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {/* Username */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder={user?.username}
                  required
                  onChange={handleChange}
                  defaultValue={user?.username}
                />
                <label
                  htmlFor="username"
                  className="peer-focus:font-medium absolute text-xl text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>
              {/* Name */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required
                    onChange={handleChange}
                    defaultValue={user?.name}
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] "
                  >
                    Full Name
                  </label>
                </div>
              </div>

              {/* Phone Number */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                  defaultValue={user?.phone_number}
                />
                <label
                  htmlFor="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminUpdateUser;
