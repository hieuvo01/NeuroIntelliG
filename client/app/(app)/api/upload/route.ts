import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const data = new FormData();
    data.append("image", image);

    const response = await axios.post(
      `${process.env.HTTP_URL}/api/feeds/analyze-image`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
