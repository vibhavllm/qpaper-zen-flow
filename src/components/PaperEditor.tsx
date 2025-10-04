import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Save,
  Users,
  MessageSquare,
  Lock,
  Eye,
  GitBranch,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const activeUsers = [
  { name: "Dr. Sarah Chen", avatar: "SC", status: "editing", section: "Question 3" },
  { name: "Prof. Maria Garcia", avatar: "MG", status: "viewing", section: null },
  { name: "Dr. James Wilson", avatar: "JW", status: "commenting", section: "Question 1" },
];

const comments = [
  {
    id: 1,
    user: { name: "Dr. James Wilson", avatar: "JW" },
    content: "This question might be too complex for the time allocated. Consider simplifying or extending the time.",
    section: "Question 1",
    time: "5 minutes ago",
    resolved: false
  },
  {
    id: 2,
    user: { name: "Prof. Maria Garcia", avatar: "MG" },
    content: "Great addition! This aligns perfectly with the learning objectives.",
    section: "Question 3",
    time: "15 minutes ago",
    resolved: true
  },
];

const versions = [
  { version: "v3.2", author: "Dr. Sarah Chen", time: "Current", status: "current" },
  { version: "v3.1", author: "Dr. James Wilson", time: "2 hours ago", status: "saved" },
  { version: "v3.0", author: "Prof. Maria Garcia", time: "1 day ago", status: "saved" },
];

export function PaperEditor() {
  const [isLocked, setIsLocked] = useState(false);
  const [paperContent, setPaperContent] = useState(`Mathematics Final Exam 2025

Section A: Multiple Choice Questions (40 marks)

Question 1: [LOCKED by Dr. Sarah Chen]
Consider the function f(x) = 3x² - 2x + 1. What is the vertex of this parabola?

A) (1/3, 2/3)
B) (1/3, 4/3)
C) (2/3, 1/3)
D) (2/3, 2/3)

Question 2:
If log₂(x) = 5, what is the value of x?

A) 10
B) 25
C) 32
D) 64

Question 3: [AI SUGGESTION - Pending Review]
A right triangle has legs of length 5 cm and 12 cm. What is the length of the hypotenuse?

A) 13 cm
B) 15 cm
C) 17 cm
D) 20 cm`);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">
                Mathematics Final Exam 2025
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  Version 3.2
                </span>
                <span>Last saved 2 minutes ago</span>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Draft
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {activeUsers.map((user) => (
                  <Avatar
                    key={user.name}
                    className="h-8 w-8 border-2 border-card ring-2 ring-primary/20"
                  >
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                3 Viewing
              </Button>
              <Button size="sm" className="gap-2 shadow-md">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Paper Title</label>
                    <Input 
                      defaultValue="Mathematics Final Exam 2025" 
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
                    <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Section Locked
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Dr. Sarah Chen is currently editing Question 1
                      </p>
                    </div>
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Content</label>
                    <Textarea
                      value={paperContent}
                      onChange={(e) => setPaperContent(e.target.value)}
                      className="mt-2 min-h-[500px] font-mono text-sm"
                      placeholder="Enter your exam questions here..."
                    />
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-accent border border-border">
                    <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        AI Suggestion Available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Question 3 was generated by AI and requires human review
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="w-96 border-l border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Collaboration Panel
          </h3>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Active Users</h4>
              <div className="space-y-3">
                {activeUsers.map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.section ? `Editing ${user.section}` : "Viewing"}
                      </p>
                    </div>
                    <Badge variant={user.status === "editing" ? "default" : "secondary"} className="text-xs">
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comments & Suggestions
              </h4>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-lg border ${
                      comment.resolved
                        ? "bg-success/5 border-success/20"
                        : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Avatar className="h-8 w-8 border-2 border-border">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {comment.user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground">
                            {comment.user.name}
                          </p>
                          {comment.resolved && (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{comment.time}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-2">{comment.content}</p>
                    <Badge variant="outline" className="text-xs">
                      {comment.section}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Version History
              </h4>
              <div className="space-y-2">
                {versions.map((v) => (
                  <div
                    key={v.version}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      v.status === "current"
                        ? "bg-primary/5 border-primary"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{v.version}</span>
                      {v.status === "current" && (
                        <Badge variant="default" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{v.author}</p>
                    <p className="text-xs text-muted-foreground">{v.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
