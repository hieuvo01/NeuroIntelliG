"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

// interface Earning {
//   _id: string;
//   userId: string;
//   info: {
//     details: string;
//     data: string;
//   };
//   status: string;
//   feedId: string;
//   createdAt: string;
//   updatedAt: string;
// }

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hàm gọi API để lấy dữ liệu earnings
  const getEarnings = async () => {
    try {
      const response = await axios.get(
        `${process.env.HTTP_URL}/api/earning/search`
      );
      setEarnings(response.data.earning);
    } catch (error) {
      console.error(error);
      message.error("Failed to load earnings data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEarnings();
  }, []);

  return (
    <div className="overflow-x-auto bg-white p-6">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingOutlined />
        </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Details
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Data
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Feed ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earning) => (
              <tr key={earning._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.info.details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.info.data}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {earning.feedId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(earning.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(earning.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
