import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList, Plus, Calendar, Lock, Unlock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ExamManagement = () => {
  const [exams, setExams] = useState([
    { id: "E001", name: "CS301 Midterm", date: "2025-10-15", status: "scheduled", enrolled: 85, duration: 120 },
    { id: "E002", name: "MA201 Final", date: "2025-10-22", status: "published", enrolled: 72, duration: 180 },
    { id: "E003", name: "PH101 Lab Exam", date: "2025-10-18", status: "draft", enrolled: 48, duration: 90 },
    { id: "E004", name: "CS402 Quiz", date: "2025-10-12", status: "completed", enrolled: 96, duration: 60 },
  ]);

  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateExam = () => {
    toast({
      title: "Exam Created",
      description: "New exam has been created successfully",
    });
    setIsCreateOpen(false);
  };

  const handlePublishExam = (examId: string) => {
    setExams(exams.map(e => 
      e.id === examId ? { ...e, status: "published" } : e
    ));
    toast({
      title: "Exam Published",
      description: "Exam is now available to students",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "scheduled": return "secondary";
      case "completed": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Exam Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, schedule, and monitor exams across semesters
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Exam
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Exam</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="exam-name">Exam Name</Label>
                <Input id="exam-name" placeholder="e.g., CS301 Midterm Exam" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs301">CS301 - Data Structures</SelectItem>
                    <SelectItem value="ma201">MA201 - Linear Algebra</SelectItem>
                    <SelectItem value="ph101">PH101 - Physics Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-date">Exam Date</Label>
                  <Input id="exam-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input id="duration" type="number" placeholder="120" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="center">Exam Center</Label>
                <Select>
                  <SelectTrigger id="center">
                    <SelectValue placeholder="Select center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Campus</SelectItem>
                    <SelectItem value="north">North Wing</SelectItem>
                    <SelectItem value="south">South Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateExam}>Create Exam</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Exams", value: "24", icon: ClipboardList, color: "bg-rose-500/10 text-rose-600" },
          { label: "Scheduled", value: "8", icon: Calendar, color: "bg-blue-500/10 text-blue-600" },
          { label: "Published", value: "12", icon: Unlock, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Completed", value: "4", icon: Lock, color: "bg-gray-500/10 text-gray-600" },
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Active & Upcoming Exams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exams.map((exam) => (
              <div key={exam.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{exam.id}</Badge>
                      <p className="font-medium text-sm">{exam.name}</p>
                      <Badge variant={getStatusColor(exam.status)} className="text-xs capitalize">
                        {exam.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(exam.date).toLocaleDateString()}
                      </span>
                      <span>{exam.enrolled} enrolled</span>
                      <span>{exam.duration} minutes</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-3 w-3" />
                    </Button>
                    {exam.status === "scheduled" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePublishExam(exam.id)}
                      >
                        Publish
                      </Button>
                    )}
                    {exam.status === "published" && (
                      <Button size="sm" variant="outline">
                        <Lock className="h-3 w-3 mr-1" />
                        Lock
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
