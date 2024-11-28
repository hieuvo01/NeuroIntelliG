import { Button, Result } from "antd";
import { redirect } from "next/navigation";

export default function PageError() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={() => redirect("404")} type="primary">
          Back Home
        </Button>
      }
    />
  );
}
