/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

interface IProps {
  amount: number;
  feedId: string;
}

export function FormPayPal({ amount, feedId }: IProps) {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const addPaypalScript = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloneWindow = window as any;
    if (cloneWindow && cloneWindow?.paypal) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=AQf7BbOkgelYnTOvS4-ajupJ_PZr7QTUXYKiiJdfgzzYFNQ6rrbBLFIyvGNvc4yEMZgz-mouxs_v79Fb`;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
  };
  const handleEarning = async (details: any, data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!details || !data) {
        message.error("Error when payout, please try again", 5);
        return;
      }
      if (details && details.status === "COMPLETED") {
        await axios({
          method: "post",
          url: `${process.env.HTTP_URL}/api/earning/create?token=${token}`,
          data: {
            details,
            data,
            status: details.status,
            feedId,
          },
        })
          .then((res) =>
            message.success(
              "Payment successful, please visit home page and download image.",
              5
            )
          )
          .catch((err) => message.error("Payment error, please try again"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    addPaypalScript();
  }, []);
  return (
    <div>
      <PayPalButton
        amount={amount}
        onSuccess={(details: any, data: any) => {
          console.log(details);
          console.log(data);
          // OPTIONAL: Call your server to save the transaction
          handleEarning(details, data);
        }}
        options={{
          clientId:
            "AQf7BbOkgelYnTOvS4-ajupJ_PZr7QTUXYKiiJdfgzzYFNQ6rrbBLFIyvGNvc4yEMZgz-mouxs_v79Fb",
        }}
      />
    </div>
  );
}
