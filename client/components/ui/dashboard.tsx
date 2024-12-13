import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, Zap, TrendingUp } from "lucide-react";

export function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">NeuroVision Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+4 new this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Neural Interfaces
            </CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In development</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Research Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>[HUTECH] - (Nov, 2022) iMessages</li>
              <li>[HUTECH] - (Feb, 2024) iMovies</li>
              <li>[HUTECH] - (Nov, 2024) NeuroVision</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Mr. Vo Minh Hieu joined as Lead Neuroscientist</li>
              <li>AI team completed deep learning model for EEG analysis</li>
              <li>Hardware team finalized prototype for new neural implant</li>
              <li>
                Research paper on cognitive enhancement accepted for publication
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
