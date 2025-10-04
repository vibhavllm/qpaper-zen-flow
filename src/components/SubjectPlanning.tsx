import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Plus, 
  Target, 
  Link as LinkIcon, 
  Award,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";

export const SubjectPlanning = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    { id: "CS301", name: "Data Structures", credits: 4, status: "active", completion: 85 },
    { id: "CS402", name: "Database Systems", credits: 3, status: "active", completion: 72 },
    { id: "MA201", name: "Linear Algebra", credits: 3, status: "draft", completion: 45 },
    { id: "PH101", name: "Physics Lab", credits: 2, status: "active", completion: 90 },
  ];

  const learningOutcomes = [
    { id: 1, code: "LO1", text: "Apply data structure concepts to solve problems", mapped: 12 },
    { id: 2, code: "LO2", text: "Analyze algorithm complexity", mapped: 8 },
    { id: 3, code: "LO3", text: "Implement efficient search algorithms", mapped: 15 },
    { id: 4, code: "LO4", text: "Design scalable data systems", mapped: 6 },
  ];

  const topics = [
    { week: 1, title: "Introduction to Arrays", hours: 3, assessments: 2, resources: 5 },
    { week: 2, title: "Linked Lists", hours: 4, assessments: 3, resources: 7 },
    { week: 3, title: "Stacks and Queues", hours: 3, assessments: 2, resources: 6 },
    { week: 4, title: "Trees and BST", hours: 5, assessments: 4, resources: 8 },
    { week: 5, title: "Graph Algorithms", hours: 4, assessments: 3, resources: 9 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Subject Planning</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage course outlines, learning outcomes, and syllabus mapping
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Course Outline
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Courses", value: "24", icon: BookOpen, color: "bg-primary/10 text-primary" },
          { label: "Total Credits", value: "96", icon: Award, color: "bg-secondary/10 text-secondary" },
          { label: "Mapped Outcomes", value: "185", icon: Target, color: "bg-success/10 text-success" },
          { label: "Avg Completion", value: "78%", icon: TrendingUp, color: "bg-warning/10 text-warning" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCourse === course.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{course.id}</p>
                    <p className="text-xs text-muted-foreground">{course.name}</p>
                  </div>
                  <Badge variant={course.status === "active" ? "default" : "secondary"} className="text-xs">
                    {course.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{course.credits} credits</span>
                  <span>{course.completion}% complete</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Course Details - CS301</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="outcomes" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="outcomes" className="space-y-3 mt-4">
                {learningOutcomes.map((outcome) => (
                  <div key={outcome.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Badge variant="outline" className="text-xs">{outcome.code}</Badge>
                        <div>
                          <p className="text-sm">{outcome.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {outcome.mapped} questions mapped
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <LinkIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="topics" className="space-y-2 mt-4">
                {topics.map((topic) => (
                  <div key={topic.week} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">Week {topic.week}</Badge>
                        <p className="text-sm font-medium">{topic.title}</p>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {topic.hours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {topic.assessments} assessments
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {topic.resources} resources
                      </span>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="assessment" className="mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Assessment blueprint and weightings</p>
                  <Button size="sm" className="mt-4">Configure Assessments</Button>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Learning resources and materials</p>
                  <Button size="sm" className="mt-4">Add Resources</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
