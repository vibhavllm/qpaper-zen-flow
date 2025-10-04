import { 
  LayoutDashboard, 
  FileEdit, 
  GitBranch, 
  Shield, 
  History,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type View = "dashboard" | "editor" | "workflow" | "audit";

interface AppSidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const menuItems = [
  { 
    title: "Dashboard", 
    icon: LayoutDashboard, 
    view: "dashboard" as View,
    description: "Overview & Activity"
  },
  { 
    title: "Paper Editor", 
    icon: FileEdit, 
    view: "editor" as View,
    description: "Collaborative Editing"
  },
  { 
    title: "Approval Workflow", 
    icon: GitBranch, 
    view: "workflow" as View,
    description: "Review & Approve"
  },
  { 
    title: "Audit Log", 
    icon: History, 
    view: "audit" as View,
    description: "Security & Compliance"
  },
];

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">ExamGuard</h2>
              <p className="text-xs text-muted-foreground">Secure Collaboration</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-6 py-3">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.view)}
                    isActive={currentView === item.view}
                    className={`
                      px-4 py-3 rounded-lg transition-all duration-200
                      ${currentView === item.view 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "hover:bg-muted"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{item.title}</span>
                      <span className={`text-xs ${currentView === item.view ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {item.description}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenuButton className="w-full px-4 py-3 rounded-lg hover:bg-muted transition-colors">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
