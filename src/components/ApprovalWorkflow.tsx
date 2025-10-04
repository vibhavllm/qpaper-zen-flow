import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle2,
  XCircle,
  Clock,
  GitBranch,
  ArrowRight,
  FileText,
  AlertTriangle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const workflowStages = [
  { stage: "Draft", status: "completed", icon: FileText },
  { stage: "Author Review", status: "completed", icon: CheckCircle2 },
  { stage: "COE Review", status: "current", icon: Clock },
  { stage: "Final Approval", status: "pending", icon: Clock },
  { stage: "Published", status: "pending", icon: CheckCircle2 },
];

const pendingApprovals = [
  {
    id: 1,
    title: "Mathematics Final Exam 2025",
    subject: "Mathematics",
    version: "v3.2",
    author: { name: "Dr. Sarah Chen", avatar: "SC" },
    submittedDate: "2 hours ago",
    priority: "high",
    changes: 12,
    comments: 5
  },
  {
    id: 2,
    title: "Chemistry Midterm 2025",
    subject: "Chemistry",
    version: "v2.0",
    author: { name: "Prof. Maria Garcia", avatar: "MG" },
    submittedDate: "1 day ago",
    priority: "medium",
    changes: 8,
    comments: 3
  },
  {
    id: 3,
    title: "Biology Quiz 3",
    subject: "Biology",
    version: "v1.5",
    author: { name: "Dr. James Wilson", avatar: "JW" },
    submittedDate: "3 days ago",
    priority: "low",
    changes: 4,
    comments: 2
  },
];

const recentApprovals = [
  {
    id: 1,
    title: "Physics Midterm 2025",
    approver: { name: "Dr. Sarah Chen", avatar: "SC" },
    action: "approved",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "English Literature Final",
    approver: { name: "Prof. Robert Lee", avatar: "RL" },
    action: "rejected",
    time: "1 day ago"
  },
];

const getPriorityBadge = (priority: string) => {
  const variants = {
    high: { className: "bg-destructive text-destructive-foreground", label: "High Priority" },
    medium: { className: "bg-warning text-warning-foreground", label: "Medium" },
    low: { className: "bg-muted text-muted-foreground", label: "Low" },
  };
  
  const config = variants[priority as keyof typeof variants];
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

export function ApprovalWorkflow() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Approval Workflow</h2>
        <p className="text-muted-foreground mt-1">
          Review and approve question papers with complete audit trail
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Workflow Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {workflowStages.map((stage, index) => (
              <div key={stage.stage} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                      stage.status === "completed"
                        ? "bg-success border-success text-success-foreground"
                        : stage.status === "current"
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-muted border-border text-muted-foreground"
                    }`}
                  >
                    <stage.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{stage.stage}</p>
                    <p className="text-xs text-muted-foreground capitalize">{stage.status}</p>
                  </div>
                </div>
                {index < workflowStages.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Pending Approvals ({pendingApprovals.length})
              </CardTitle>
              <Badge variant="outline" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Action Required
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((paper) => (
              <Card key={paper.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{paper.title}</h4>
                        {getPriorityBadge(paper.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{paper.subject}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          {paper.version}
                        </span>
                        <span>{paper.changes} changes</span>
                        <span>{paper.comments} comments</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Avatar className="h-10 w-10 border-2 border-border">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {paper.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground text-right">
                        {paper.author.name}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Submitted {paper.submittedDate}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                      <Button size="sm" className="gap-2 bg-success hover:bg-success/90">
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApprovals.map((approval) => (
              <div key={approval.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 border-2 border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {approval.approver.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">
                        {approval.approver.name}
                      </span>
                      {" "}
                      <span
                        className={
                          approval.action === "approved"
                            ? "text-success"
                            : "text-destructive"
                        }
                      >
                        {approval.action}
                      </span>
                    </p>
                    <p className="text-sm text-foreground">{approval.title}</p>
                    <p className="text-xs text-muted-foreground">{approval.time}</p>
                  </div>
                  {approval.action === "approved" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
