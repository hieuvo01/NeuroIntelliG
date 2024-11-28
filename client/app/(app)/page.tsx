/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { UserContext } from "./layout";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { message } from "antd";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

function HomePage() {
  const route = useRouter();
  const currentUser = useContext(UserContext) as any;
  const [position, setPosition] = React.useState("bottom");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //search
  const [keyword, setKeyword] = useState("");

  const downloadImage = async (dataFeed: any) => {
    if (dataFeed?.price > 0) {
      if (!currentUser) {
        message.info("Sign-in required to download contents!", 5);
        setTimeout(() => {
          route.push("/login");
        }, 2000);
        return;
      }
      if (
        dataFeed?.user_id !== currentUser?._id ||
        dataFeed?.earning?.status !== "COMPLETED" ||
        dataFeed?.earning?.userId?.toString() !== currentUser?._id?.toString()
      ) {
        // await toast("You are being directed to the payment process. Please wait ...!", {
        //   position: "bottom-right",
        //   autoClose: 2000,
        // });
        route.push(`feed/${dataFeed?._id}`);
        return;
      }
    }
    // Replace the base URL
    const modifiedUrl = dataFeed?.image?.replace(
      "https://pollinations.ai/p/",
      "https://image.pollinations.ai/prompt/"
    );

    const response = await fetch(modifiedUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob(); // Convert the response to a Blob
    const link = document.createElement("a"); // Create a temporary anchor element
    link.href = URL.createObjectURL(blob); // Create a URL for the Blob
    link.download = "generated_image.jpg"; // Specify the filename
    link.rel = "noopener";

    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically click the link to trigger the download
    toast("Image downloaded successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    document.body.removeChild(link);
  };

  const handleLoadData = async () => {
    try {
      setLoading(true);
      let response;

      if (currentUser && currentUser?._id) {
        const token = localStorage.getItem("token");
        response = await axios({
          method: "get",
          url: `${process.env.HTTP_URL}/api/feeds/search?token=${token}&keywords=${keyword}`,
        });
      } else {
        response = await axios({
          method: "get",
          url: `${process.env.HTTP_URL}/api/feeds/search?keywords=${keyword}`,
        });
      }
      setData(response.data?.feeds);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, [keyword]);

  return (
    <div>
      <main>
        <section className="relative">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-[url('/placeholder.svg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container relative mx-auto px-4 py-24">
            <div className="mx-auto max-w-3xl text-center text-white">
              <h1 className="mb-8 text-4xl font-bold">
                The best stock photos, royalty free images & videos shared by
                creators.
              </h1>
              <div className="flex rounded-lg bg-white p-1">
                <Button variant="ghost" className="text-black">
                  Photos
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>

                <Input
                  className="flex-1 border-0 bg-transparent"
                  placeholder="Search for free photos"
                  style={{ color: "black" }}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button size="sm" className="rounded-md">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Stock Photos</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort ↓</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">
                    <Button variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                        />
                      </svg>
                      <p className="" style={{ marginLeft: "6px" }}>
                        Trending
                      </p>
                    </Button>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    <Button variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                        />
                      </svg>
                      <p className="" style={{ marginLeft: "6px" }}>
                        Free to download
                      </p>
                    </Button>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    <Button variant="outline">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                      <p className="" style={{ marginLeft: "6px" }}>
                        High to low
                      </p>
                    </Button>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ToastContainer closeOnClick theme="dark" />

          {loading ? (
            <p>Loading ...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data &&
                data?.map((i: any) => (
                  <div
                    key={i?._id}
                    className="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden group"
                  >
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge
                        style={{
                          padding: "0.5rem 1.0rem",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          backgroundColor: "rgb(220 18 62 / 78%)",
                          color: "white",
                          borderRadius: "0.5rem",
                          position: "absolute",
                          left: "-444%",
                        }}
                        className=""
                        variant="outline"
                      >
                        {i?.price > 0 ? (
                          <p className="text-lg ">${i?.price}</p>
                        ) : (
                          <p className="text-lg text-green-400 font-bold">
                            FREE ⭐
                          </p>
                        )}
                      </Badge>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-cyan-400 hover:bg-cyan-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </Button>
                      <Button
                        onClick={() => downloadImage(i)}
                        size="icon"
                        variant="secondary"
                        className="rounded-full  bg-cyan-400 hover:bg-cyan-600"
                      >
                        {/* <a href={i?.image} download> */}
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                        {/* </a> */}
                      </Button>
                    </div>
                    <img
                      style={{ pointerEvents: "none" }}
                      src={i?.image}
                      alt={i?.image}
                      className="w-full h-auto object-cover rounded-lg "
                    />
                    <div className="absolute bottom-0 px-4 py-2 text-sm text-primary">
                      <p
                        className="uppercase bg-transparent text-lime-500 text-3xl font-bold font-mono"
                        style={{
                          textShadow:
                            "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                        }}
                      >
                        {i?.title}
                      </p>
                      <p
                        className="shadow-slate-950 line-clamp-3 text-ellipsis overflow-hidden ... text-red-400"
                        style={{
                          textShadow:
                            "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
                        }}
                      >
                        {i?.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
