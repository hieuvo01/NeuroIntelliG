"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ImageIcon } from "lucide-react";

export default function ImageAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Please upload an image!");

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.HTTP_URL}/api/feeds/analyze-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.text) {
        setResult(data.text);
      } else {
        alert("No analysis result received.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-[100vh] mx-auto py-10">
      {/* back button  */}
      <button className="m-8">
        <a href="/" className="">
          Back to home
        </a>
      </button>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Image Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
            <span className="font-bold text-red-500 font-mono text-xs">
              Notice: Only pictures with text supported. Plain images are not
              supported!
            </span>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Analyze Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
        {result && (
          <CardFooter className="flex mb-12 flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">Analysis Result:</h2>
            <Textarea
              value={result}
              readOnly
              className="w-full text-lg min-h-[300px]"
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
