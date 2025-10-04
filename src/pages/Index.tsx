import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PaperEditor } from "@/components/PaperEditor";
import { ApprovalWorkflow } from "@/components/ApprovalWorkflow";
import { AuditLog } from "@/components/AuditLog";
import { SubjectPlanning } from "@/components/SubjectPlanning";
import { CapacityPlanning } from "@/components/CapacityPlanning";
import { TimetableManagement } from "@/components/TimetableManagement";
import { ExamManagement } from "@/components/ExamManagement";
import { ResultsPublishing } from "@/components/ResultsPublishing";
import { CommandPalette } from "@/components/CommandPalette";
import { Users, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarSarah from "@/assets/avatar-sarah.jpg";

type View = "dashboard" | "editor" | "workflow" | "audit" | "subject-planning" | "capacity" | "timetable" | "exams" | "results";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [currentUser] = useState({
    name: "Dr. Sarah Chen",
    role: "COE Admin",
    avatar: "SC"
  });

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />;
      case "editor":
        return <PaperEditor />;
      case "workflow":
        return <ApprovalWorkflow />;
      case "audit":
        return <AuditLog />;
      case "subject-planning":
        return <SubjectPlanning />;
      case "capacity":
        return <CapacityPlanning />;
      case "timetable":
        return <TimetableManagement />;
      case "exams":
        return <ExamManagement />;
      case "results":
        return <ResultsPublishing />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <SidebarProvider>
      <CommandPalette onNavigate={setCurrentView} />
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold text-foreground">
                Question Paper Management
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              >
                <Command className="h-3 w-3" />
                <span className="text-xs">⌘K</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">3 Active</span>
              </Button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.role}</p>
                </div>
                <Avatar className="h-9 w-9 border-2 border-border">
                  <AvatarImage src={avatarSarah} alt={currentUser.name} />
                </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20">
            {renderView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
