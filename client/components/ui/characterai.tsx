import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CharacterCard } from "@/components/ui/character-card";
import { PlayCircle } from "lucide-react";

export default function CharacterAI() {
  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Try these</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CharacterCard
            name="Practice a new language"
            description="with HyperGlot"
            image="/placeholder.svg?height=48&width=48"
          />
          <CharacterCard
            name="Practice interviewing"
            description="with Interviewer"
            image="/placeholder.svg?height=48&width=48"
          />
          <CharacterCard
            name="Brainstorm ideas"
            description="with Brainstormer"
            image="/placeholder.svg?height=48&width=48"
          />
          <CharacterCard
            name="Get book recommendations"
            description="with Librarian Linda"
            image="/placeholder.svg?height=48&width=48"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CharacterCard
            name="Character Assistant"
            description="Your AI work/study buddy"
            image="/placeholder.svg?height=48&width=48"
            metrics="179.9m"
          />
          <CharacterCard
            name="Man From 2025"
            description="Curious about your 2025? I'll check for you."
            image="/placeholder.svg?height=48&width=48"
            metrics="586.0k"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <VoiceCard
            name="Indian Girl Accent"
            description="A Hindi girl's accent"
          />
          <VoiceCard
            name="Bodyguard"
            description="My job is to protect you... 👮 (Esp-Eng)"
          />
          <VoiceCard
            name="Male Russian Accent"
            description="Russian accent! (Male. Pitch -16)"
          />
          <VoiceCard name="Taz" description="Australian dude" />
        </div>
      </section>

      <section>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="secondary" className="rounded-full">
            Assistants
          </Button>
          <Button variant="ghost" className="rounded-full">
            Anime
          </Button>
          <Button variant="ghost" className="rounded-full">
            Creativity & Writing
          </Button>
          <Button variant="ghost" className="rounded-full">
            Entertainment & Gaming
          </Button>
          <Button variant="ghost" className="rounded-full">
            History
          </Button>
          <Button variant="ghost" className="rounded-full">
            Humor
          </Button>
          <Button variant="ghost" className="rounded-full">
            Learning
          </Button>
          <Button variant="ghost" className="rounded-full">
            Lifestyle
          </Button>
          <Button variant="ghost" className="rounded-full">
            Parody
          </Button>
          <Button variant="ghost" className="rounded-full">
            RPG & Puzzles
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CharacterCard
            name="DecisionHelper"
            description="Hello! I'm ready to help you work through any of the difficult choices you face in life!"
            image="/placeholder.svg?height=48&width=48"
            metrics="9.1m"
          />
          <CharacterCard
            name="Evie"
            description="I am Evie I'm bisexual cat person my favorite show is adventure time and I'm a..."
            image="/placeholder.svg?height=48&width=48"
            metrics="396.2k"
          />
        </div>
      </section>
    </div>
  );
}

function VoiceCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <Card className="h-full hover:bg-accent/50 transition-colors p-4">
      <div className="flex items-center gap-4">
        <Button size="icon" variant="secondary" className="rounded-full">
          <PlayCircle className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
