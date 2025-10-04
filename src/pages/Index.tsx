import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { PaperEditor } from "@/components/PaperEditor";
import { ApprovalWorkflow } from "@/components/ApprovalWorkflow";
import { AuditLog } from "@/components/AuditLog";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type View = "dashboard" | "editor" | "workflow" | "audit";

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
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentView={currentView} onNavigate={setCurrentView} />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-foreground">
                Question Paper Management
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                <span>3 Active Users</span>
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.role}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {currentUser.avatar}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {renderView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
