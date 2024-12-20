import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CharacterCardProps {
  name: string;
  description: string;
  image: string;
  metrics?: string;
}

export function CharacterCard({
  name,
  description,
  image,
  metrics,
}: CharacterCardProps) {
  return (
    <Link href="#">
      <Card className="h-full hover:bg-accent/50 transition-colors p-4">
        <div className="flex items-start gap-4">
          <img src={image} alt={name} className="w-12 h-12 rounded-full" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {description}
            </p>
            {metrics && (
              <p className="text-xs text-muted-foreground mt-1">{metrics}</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
