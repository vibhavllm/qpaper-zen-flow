import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Search,
  Download,
  FileEdit,
  CheckCircle2,
  Lock,
  Unlock,
  GitBranch,
  MessageSquare,
  AlertTriangle,
  Eye
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarJames from "@/assets/avatar-james.jpg";
import avatarMaria from "@/assets/avatar-maria.jpg";
import avatarRobert from "@/assets/avatar-robert.jpg";

const auditEvents = [
  {
    id: 1,
    timestamp: "2025-10-04 19:45:23",
    user: { name: "Dr. Sarah Chen", avatar: avatarSarah, role: "COE Admin" },
    action: "approved",
    resource: "Mathematics Final Exam 2025",
    details: "Version 3.2 approved for publication",
    severity: "high",
    icon: CheckCircle2,
    iconColor: "text-success"
  },
  {
    id: 2,
    timestamp: "2025-10-04 19:30:15",
    user: { name: "Dr. James Wilson", avatar: avatarJames, role: "Author" },
    action: "edited",
    resource: "Mathematics Final Exam 2025",
    details: "Modified Question 3, added 2 new questions",
    severity: "medium",
    icon: FileEdit,
    iconColor: "text-primary"
  },
  {
    id: 3,
    timestamp: "2025-10-04 19:15:08",
    user: { name: "Prof. Maria Garcia", avatar: avatarMaria, role: "Reviewer" },
    action: "commented",
    resource: "Chemistry Midterm 2025",
    details: "Added review comments on Section B",
    severity: "low",
    icon: MessageSquare,
    iconColor: "text-secondary"
  },
  {
    id: 4,
    timestamp: "2025-10-04 18:50:42",
    user: { name: "Dr. Sarah Chen", avatar: avatarSarah, role: "COE Admin" },
    action: "locked",
    resource: "Physics Final Exam 2025",
    details: "Section locked for exclusive editing",
    severity: "medium",
    icon: Lock,
    iconColor: "text-warning"
  },
  {
    id: 5,
    timestamp: "2025-10-04 18:30:19",
    user: { name: "System", avatar: null, role: "Automated" },
    action: "exported",
    resource: "Biology Quiz 3",
    details: "PDF exported with watermark #WM-2025-1004-001",
    severity: "high",
    icon: Download,
    iconColor: "text-primary"
  },
  {
    id: 6,
    timestamp: "2025-10-04 18:15:55",
    user: { name: "Dr. Robert Lee", avatar: avatarRobert, role: "Author" },
    action: "branched",
    resource: "English Literature Final",
    details: "Created review branch from v2.1",
    severity: "low",
    icon: GitBranch,
    iconColor: "text-secondary"
  },
  {
    id: 7,
    timestamp: "2025-10-04 17:45:33",
    user: { name: "External Reviewer", avatar: null, role: "Guest" },
    action: "viewed",
    resource: "Mathematics Final Exam 2025",
    details: "Accessed via temporary link (expires in 24h)",
    severity: "medium",
    icon: Eye,
    iconColor: "text-muted-foreground"
  },
  {
    id: 8,
    timestamp: "2025-10-04 17:20:11",
    user: { name: "Security System", avatar: null, role: "Automated" },
    action: "alert",
    resource: "System Security",
    details: "Unusual access pattern detected and logged",
    severity: "high",
    icon: AlertTriangle,
    iconColor: "text-destructive"
  },
];

const getSeverityBadge = (severity: string) => {
  const variants = {
    high: { variant: "default" as const, className: "bg-destructive text-destructive-foreground", label: "High" },
    medium: { variant: "default" as const, className: "bg-warning text-warning-foreground", label: "Medium" },
    low: { variant: "secondary" as const, className: "", label: "Low" },
  };
  
  const config = variants[severity as keyof typeof variants];
  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
};

export function AuditLog() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Audit Log
          </h2>
          <p className="text-muted-foreground mt-1">
            Complete immutable trail of all system activities and changes
          </p>
        </div>
        <Button className="gap-2 shadow-md">
          <Download className="h-4 w-4" />
          Export Log
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, resource..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Real-time Updates
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Events</p>
            <p className="text-2xl font-bold text-foreground mt-2">2,847</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">High Severity</p>
            <p className="text-2xl font-bold text-destructive mt-2">12</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-2xl font-bold text-primary mt-2">8</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Papers Modified</p>
            <p className="text-2xl font-bold text-secondary mt-2">15</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Event Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {auditEvents.map((event, index) => (
                <div key={event.id}>
                  <div className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center ${event.iconColor}`}>
                        <event.icon className="h-5 w-5" />
                      </div>
                      {index < auditEvents.length - 1 && (
                        <div className="w-px h-full bg-border" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-foreground capitalize">
                              {event.action}
                            </h4>
                            {getSeverityBadge(event.severity)}
                          </div>
                          <p className="text-sm text-foreground">{event.resource}</p>
                          <p className="text-sm text-muted-foreground">{event.details}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-xs text-muted-foreground font-mono">
                            {event.timestamp}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Avatar className="h-8 w-8 border-2 border-border">
                          {event.user.avatar ? (
                            <AvatarImage src={event.user.avatar} alt={event.user.name} />
                          ) : (
                            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                              {event.user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{event.user.name}</p>
                          <p className="text-xs text-muted-foreground">{event.user.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Tamper-Evident Logging
              </h3>
              <p className="text-sm text-muted-foreground">
                All audit events are cryptographically signed and timestamped with blockchain-like integrity. 
                Any attempt to modify historical records will be immediately detected and flagged.
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  Immutable Records
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-primary" />
                  End-to-End Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-secondary" />
                  Compliance Ready
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
