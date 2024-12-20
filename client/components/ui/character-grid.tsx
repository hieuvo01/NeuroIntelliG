import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Character {
  name: string;
  description: string;
  image: string;
  metrics?: string;
}

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {characters.map((character) => (
        <Link href="#" key={character.name}>
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{character.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {character.description}
                </p>
                {character.metrics && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {character.metrics} chats
                  </p>
                )}
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
