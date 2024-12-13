// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../layout";
// import axios from "axios";
// import { LoadingOutlined } from "@ant-design/icons";
// import AdminTable from "@/components/ui/admin/table_admin";
// import { message, Tooltip } from "antd";
// import { useRouter } from "next/navigation";
// import { Sidebar } from "@/components/ui/dashboard_sidebar";

// export default function Admin_Feeds() {
//   const currentUser = useContext(UserContext) as any;
//   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [feeds, setFeeds] = useState<any[]>([]);
//   const route = useRouter();

//   const handleEditFeed = async (id: string) => {
//     route.push(`${process.env.HTTP_URL}/admin/feeds/edit/${id}`);
//   };

//   const getFeeds = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       setIsLoading(true);
//       const response = await axios.get(
//         `${process.env.HTTP_URL}/api/feeds/admin/feeds?token=${token}`
//       );
//       const data = await response;
//       setFeeds(data.data?.feeds);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteFeed = async (id: string) => {
//     try {
//       const token = localStorage.getItem("token");

//       setIsLoading(true);
//       await axios.delete(
//         `${process.env.HTTP_URL}/api/feeds/admin/${id}?token=${token}`
//       );
//       message.success("Feed deleted successfully", 5);
//       getFeeds();
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       setIsAdmin(currentUser.role === "admin");
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (isAdmin !== null) {
//       if (!isAdmin) {
//         window.history.back();
//         return;
//       }
//     }
//     getFeeds();
//   }, [isAdmin]);

//   const column = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//       render: (description: string) => {
//         const truncated =
//           description.length > 100
//             ? description.slice(0, 100) + "..."
//             : description;
//         return (
//           <Tooltip title={description}>
//             <span>{truncated}</span>
//           </Tooltip>
//         );
//       },
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       key: "type",
//     },
//     {
//       title: "Options",
//       dataIndex: "_id",
//       key: "options",
//       render: (_id: string) => {
//         return (
//           <div className="flex space-x-2">
//             <button
//               className="text-sm text-blue-500 hover:text-blue-700"
//               onClick={() => {
//                 handleEditFeed(_id);
//               }}
//             >
//               Edit
//             </button>
//             <button
//               className="text-sm text-red-500 hover:text-red-700"
//               onClick={() => {
//                 handleDeleteFeed(_id);
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//           {isLoading && !feeds ? (
//             <div className="flex justify-center items-center h-screen">
//               <LoadingOutlined />
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100 text-left">
//                     {column.map((col) => (
//                       <th
//                         key={col.key}
//                         className="py-2 px-4 text-sm font-medium text-gray-700 border-b"
//                       >
//                         {col.title}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {feeds.map((feed) => (
//                     <tr key={feed._id} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 text-sm text-gray-600">
//                         {feed.title}
//                       </td>
//                       <td className="py-2 px-4 text-sm text-gray-600">
//                         {feed.description}
//                       </td>
//                       <td className="py-2 px-4 text-sm text-gray-600">
//                         ${feed.price}
//                       </td>
//                       <td className="py-2 px-4 text-sm text-gray-600">
//                         {feed.type}
//                       </td>
//                       <td className="py-2 px-4 text-sm text-gray-600">
//                         <div className="flex space-x-2">
//                           <button
//                             className="text-sm text-blue-500 hover:text-blue-700"
//                             onClick={() => {
//                               handleEditFeed(feed._id);
//                             }}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="text-sm text-red-500 hover:text-red-700"
//                             onClick={() => {
//                               handleDeleteFeed(feed._id);
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../layout";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
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
    route.push(`/admin/feeds/update/${id}`);
  };

  const getFeeds = async () => {
    try {
      const token = localStorage.getItem("token");

      setIsLoading(true);
      const response = await axios.get(
        `${process.env.HTTP_URL}/api/feeds/admin/feeds?token=${token}`
      );
      setFeeds(response.data?.feeds);
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button
                        type="button"
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                      >
                        Create New
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeds.map((feed) => (
                    <tr
                      key={feed._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={
                            feed?.image || "/docs/images/products/default.png"
                          }
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={feed.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {feed.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              id="quantity"
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="1"
                              required
                            />
                          </div>
                          <button
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ${feed.price}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            className="text-sm text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditFeed(feed._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-sm text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteFeed(feed._id)}
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
