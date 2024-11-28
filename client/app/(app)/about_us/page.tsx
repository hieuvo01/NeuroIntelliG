import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Our Company</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Who We Are</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            NeuroIntelliG: Pioneering the Future of AI NeuroIntelliG is a
            cutting-edge technology company dedicated to harnessing the power of
            artificial intelligence to revolutionize industries and solve
            complex challenges. Our mission is to develop innovative AI
            solutions that push the boundaries of what is possible.
          </p>
        </CardContent>
        <CardContent>
          <strong>Our Vision: </strong>
          To create a future where AI seamlessly integrates with human
          intelligence, enhancing our capabilities and improving our lives.
        </CardContent>
        <CardContent>
          <strong>What we do </strong>
          To create a future where AI seamlessly integrates with human
          intelligence, enhancing our capabilities and improving our lives.
          <strong>What We Do:</strong>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
          <CardDescription>Meet the people behind our success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Vo Minh 'Marcus' Hieu",
                role: "CEO",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Duong Dinh Nam",
                role: "CTO",
                image:
                  "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/341615475_2434267820081587_6490100784537918171_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFLDi-1jjN-UAhnPBFY3-pcFI7O-5yFcjwUjs77nIVyPF0GHJHnLaOskm8HhJ2DBhzplDXBqnXEt-ouAsJEuUM4&_nc_ohc=0ACiqpHtVYwQ7kNvgFLLDKT&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AZVjqsaMD9AO6aZ2ew0YsWN&oh=00_AYDmfudElyhpNfrWEuRMiZTEKwjR5IfmgiaMz69nHASzZA&oe=674E3B0D?height=100&width=100",
              },
            ].map((member) => (
              <div key={member.name} className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <strong>AI Research and Development:</strong> We invest in
              cutting-edge research to advance the field of AI, focusing on
              areas such as machine learning, natural language processing, and
              computer vision.
            </li>
            <li>
              <strong>AI-Powered Solutions:</strong> We develop innovative
              AI-powered solutions tailored to specific industry needs,
              including healthcare, finance, and autonomous systems.
            </li>
            <li>
              <strong>Data Science and Analytics:</strong> We leverage data
              science techniques to extract valuable insights from large
              datasets, enabling data-driven decision-making.
            </li>
            <li>
              <strong>AI Consulting Services:</strong> We provide expert
              consulting services to help organizations adopt AI and leverage
              its potential.
            </li>
          </ul>
          <p className="text-lg"></p>
        </CardContent>
      </Card>
    </div>
  );
}
