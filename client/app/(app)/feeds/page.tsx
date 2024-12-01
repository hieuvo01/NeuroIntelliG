"use client";
import React, { useState } from "react";
import { usePollinationsImage, usePollinationsText } from "@pollinations/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AIGeneratedContent = () => {
  const router = useRouter();
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [ideaDescriptionAI, setIdeaDescriptionAI] = useState("");
  const [ideaTextAI, setIdeaTextAI] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completion] = useState(true);
  const [price, setPrice] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [generateImage, setGenerateImage] = useState("pending");

  const generateImageAI = usePollinationsImage(ideaDescriptionAI, {
    width: 800,
    height: 600,
    seed: 42,
    model: "openai",
    nologo: true,
    enhance: true,
  });
  //generate text
  const generateTextAI = usePollinationsText(ideaTextAI, {
    seed: 42,
    model: "openai",
  });

  //img
  const handleAIGeneration = async () => {
    try {
      setIsLoading(true);
      setGenerateImage("processing");
      // setImageUrl(generateImageAI);
      // setGenerateImage("done");
      // setIsLoading(false);
      setTimeout(async () => {
        const image = await generateImageAI;
        setImageUrl(image);
        setGenerateImage("done");
        setIsLoading(false);
      }, 4000); // Thời gian 2 giây
    } catch (error) {
      console.log(error);
    }
  };

  //text
  const handleAIGenerationText = async () => {
    try {
      setIsLoading(true);
      setIdeaDescription(generateTextAI);
      setIdeaDescription(generateTextAI);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmit(true);
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        url: `${process.env.HTTP_URL}/api/feeds/create?token=${token}`,
        data: {
          title: ideaTitle,
          description: ideaDescription,
          price: price,
          type: "image",
          url: imageUrl,
        },
      });
      await toast("Data sent successfully!", {
        position: "bottom-right",
        autoClose: 5000,
      });
      setIsSubmit(false);
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  };
  return (
    <div>
      {/* <h2>AI-Generated Travel Guide</h2>
      <img src={imageUrl} alt="AI Generated" />
      {markdown ? (
        <ReactMarkdown>{markdown}</ReactMarkdown>
      ) : (
        <p>Loading markdown content...</p>
      )} */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI-Powered Idea Submission</CardTitle>
          <CardDescription>
            Enter your idea and get AI-generated suggestions
          </CardDescription>
        </CardHeader>
        {/* xu ly generate hinh anh AI */}

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">
                Describe your idea to start generating your image
              </Label>
              <Textarea
                id="AI"
                placeholder="Describe your idea"
                value={ideaDescriptionAI}
                onChange={(e) => setIdeaDescriptionAI(e.target.value)}
                required
              />
            </div>
            <Button onClick={handleAIGeneration} disabled={isLoading}>
              Generating Suggestions...
            </Button>

            {/* hinh anh loading sau khi bam nut */}
            {generateImage === "processing" && (
              <div>
                Loading ...
                <LoadingOutlined />
              </div>
            )}
            {generateImage === "done" && imageUrl && (
              <img src={imageUrl} alt="AI Generated" />
            )}
            {/* generate text */}

            <div className="space-y-2">
              <Label htmlFor="description">Your idea for text-generating</Label>
              <Textarea
                id="AI text"
                placeholder="Your text"
                // value={ideaTextAI}
                // onChange={(e) => setIdeaTextAI(e.target.value)}
                onBlur={(e) => setIdeaTextAI(e.target.value)}
                required
              />
            </div>
            <p className="font-mono text-xs">
              Please wait about 3 - 5 seconds after entering the text then click
              the button.
            </p>
            <Button onClick={handleAIGenerationText} disabled={isLoading}>
              {isLoading ? "Generating Suggestions..." : "Get AI Suggestions"}
            </Button>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter the title of your idea"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your idea in detail"
                value={ideaDescription}
                onChange={(e) => setIdeaDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Price</Label>
              <Input
                id="price"
                placeholder="price"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                type="number"
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading || isSubmit}
            >
              Submit
            </Button>
          </div>
        </CardContent>
        {completion && (
          <CardFooter className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">AI Suggestions:</h3>
            <p className="text-sm text-gray-600">{completion}</p>
          </CardFooter>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AIGeneratedContent;
