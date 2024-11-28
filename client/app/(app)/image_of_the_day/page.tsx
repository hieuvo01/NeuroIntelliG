/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageOfTheDayProps {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

export default function ImageOfTheDay({
  title,
  description,
  imageUrl,
  altText,
}: ImageOfTheDayProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full aspect-video">
          <img
            draggable="false"
            src="https://png.pngtree.com/png-vector/20241009/ourmid/pngtree-illustration-of-a-3d-snowman-with-christmas-background-ai-generated-png-image_14030566.png"
            alt={altText}
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-muted-foreground">
          3D Snowman With Christmas Background AI Generated.
        </p>
      </CardContent>
    </Card>
  );
}
