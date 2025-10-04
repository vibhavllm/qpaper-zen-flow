import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Eye,
  MessageSquare,
  GitBranch,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarJames from "@/assets/avatar-james.jpg";
import avatarMaria from "@/assets/avatar-maria.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarRobert from "@/assets/avatar-robert.jpg";

interface DashboardProps {
  onNavigate: (view: "dashboard" | "editor" | "workflow" | "audit") => void;
}

const stats = [
  { label: "Active Papers", value: "12", icon: FileText, color: "text-primary", bgColor: "bg-primary/10" },
  { label: "In Review", value: "5", icon: Clock, color: "text-warning", bgColor: "bg-warning/10" },
  { label: "Approved", value: "23", icon: CheckCircle2, color: "text-success", bgColor: "bg-success/10" },
  { label: "Active Users", value: "8", icon: Users, color: "text-secondary", bgColor: "bg-secondary/10" },
];

const recentActivity = [
  {
    id: 1,
    user: { name: "Dr. James Wilson", avatar: avatarJames },
    action: "suggested changes to",
    paper: "Mathematics Final 2025",
    time: "2 minutes ago",
    type: "suggestion"
  },
  {
    id: 2,
    user: { name: "Prof. Maria Garcia", avatar: avatarMaria },
    action: "approved",
    paper: "Physics Midterm 2025",
    time: "15 minutes ago",
    type: "approval"
  },
  {
    id: 3,
    user: { name: "Dr. Sarah Chen", avatar: avatarSarah },
    action: "is editing",
    paper: "Chemistry Final 2025",
    time: "Active now",
    type: "editing"
  },
  {
    id: 4,
    user: { name: "Dr. Robert Lee", avatar: avatarRobert },
    action: "added comments to",
    paper: "Biology Quiz 3",
    time: "1 hour ago",
    type: "comment"
  },
];

const papers = [
  {
    id: 1,
    title: "Mathematics Final Exam 2025",
    subject: "Mathematics",
    status: "in_review",
    version: "v3.2",
    activeUsers: 3,
    comments: 12,
    lastModified: "2 hours ago"
  },
  {
    id: 2,
    title: "Physics Midterm 2025",
    subject: "Physics",
    status: "approved",
    version: "v2.1",
    activeUsers: 0,
    comments: 5,
    lastModified: "1 day ago"
  },
  {
    id: 3,
    title: "Chemistry Final Exam 2025",
    subject: "Chemistry",
    status: "draft",
    version: "v1.0",
    activeUsers: 2,
    comments: 8,
    lastModified: "30 minutes ago"
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    draft: { variant: "secondary" as const, label: "Draft", className: "" },
    in_review: { variant: "default" as const, label: "In Review", className: "" },
    approved: { variant: "default" as const, label: "Approved", className: "bg-success text-success-foreground" },
  };
  
  const config = variants[status as keyof typeof variants];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Real-time collaboration and workflow management
          </p>
        </div>
        <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow" onClick={() => onNavigate("editor")}>
          <FileText className="h-4 w-4" />
          New Paper
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              Recent Papers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer bg-card"
                onClick={() => onNavigate("editor")}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{paper.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{paper.subject}</p>
                  </div>
                  {getStatusBadge(paper.status)}
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4" />
                    {paper.version}
                  </span>
                  {paper.activeUsers > 0 && (
                    <span className="flex items-center gap-1 text-primary">
                      <Eye className="h-4 w-4" />
                      {paper.activeUsers} viewing
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {paper.comments}
                  </span>
                  <span className="ml-auto">{paper.lastModified}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-secondary" />
              </div>
              Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">{activity.user.name}</span>
                    {" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                    {" "}
                    <span className="font-medium text-foreground">{activity.paper}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Pending Approvals
              </h3>
              <p className="text-sm text-muted-foreground">
                5 papers require your review and approval
              </p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => onNavigate("workflow")}>
              Review Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
