/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormPayPal } from "@/components/form-paypal";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function FormDetailFeed() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataFeed, setDataFeed] = useState<any>();
  const loadDetailsFeed = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const result = await axios({
        method: "get",
        url: `${process.env.HTTP_URL}/api/feeds/${id}/details?token=${token}`,
      });
      setDataFeed(result?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const addPaypalScript = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloneWindow = window as any;
    if (cloneWindow && cloneWindow?.paypal) {
      // setPaypalLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=AQf7BbOkgelYnTOvS4-ajupJ_PZr7QTUXYKiiJdfgzzYFNQ6rrbBLFIyvGNvc4yEMZgz-mouxs_v79Fb`;
    script.type = "text/javascript";
    script.async = true;
    // script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!id) {
      return redirect("404");
    }
    loadDetailsFeed();
    addPaypalScript();
  }, []);
  return (
    <div>
      {/* back button  */}
      <button className="m-8">
        <a href="/" className="">
          Back to home
        </a>
      </button>
      {!!dataFeed && !loading ? (
        <div>
          <main className="container mx-auto px-4 py-8">
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/9] w-full flex">
                {/* <figure className="w-9/12">
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={dataFeed?.image}
                    alt="image description"
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {dataFeed?.title || "Untitled Image"}
                  </figcaption>
                </figure> */}
                <img
                  style={{ pointerEvents: "none" }}
                  src={dataFeed?.image}
                  alt="Nature image"
                  className="object-cover h-auto w-2/3 rounded-lg"
                />
                <CardContent className="p-6">
                  <h1 className="mt-2 text-center text-gray-500 dark:text-gray-400 text-3xl font-bold mb-2">
                    {dataFeed?.title}
                  </h1>
                  <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                    <p className="line-clamp-6 text-ellipsis overflow-hidden ... text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                      {dataFeed?.description}
                    </p>
                  </blockquote>
                  <p className="text-muted-foreground mb-8 line-clamp-6 text-ellipsis overflow-hidden ..."></p>
                  <dl className="mb-4 font-bold">
                    <dt>Price:</dt>
                    <dd className="text-green-400 text-3xl">
                      ${dataFeed?.price}
                    </dd>
                  </dl>
                  <FormPayPal
                    feedId={id?.toString()}
                    amount={Number(dataFeed?.price) || 0}
                  />
                  {/* Payment Options */}
                  {/* <PaymentOptions /> */}
                </CardContent>
              </div>
            </Card>
          </main>
          {/* <Result
            style={{ background: "#ccc" }}
            icon={<img src={dataFeed?.image} />}
            title={dataFeed?.title}
            subTitle={dataFeed?.description}
          />*/}
        </div>
      ) : (
        <LoadingOutlined />
      )}
    </div>
  );
}
