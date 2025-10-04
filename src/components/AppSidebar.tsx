import { 
  LayoutDashboard, 
  FileEdit, 
  GitBranch, 
  Shield, 
  History,
  Settings,
  Search,
  Command
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
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
    color: "text-primary",
    bgColor: "hover:bg-primary/10"
  },
  { 
    title: "Paper Editor", 
    icon: FileEdit, 
    view: "editor" as View,
    color: "text-secondary",
    bgColor: "hover:bg-secondary/10"
  },
  { 
    title: "Approval Workflow", 
    icon: GitBranch, 
    view: "workflow" as View,
    color: "text-warning",
    bgColor: "hover:bg-warning/10"
  },
  { 
    title: "Audit Log", 
    icon: History, 
    view: "audit" as View,
    color: "text-success",
    bgColor: "hover:bg-success/10"
  },
];

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-card">
        {/* Header with Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">ExamGuard</h2>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers..."
              className="pl-9 h-9 bg-muted/50 border-border hover:bg-muted focus:bg-background transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.view)}
                    isActive={currentView === item.view}
                    className={`
                      px-3 py-2 rounded-md transition-all duration-200 group
                      ${currentView === item.view 
                        ? "bg-accent text-foreground font-medium shadow-sm" 
                        : `${item.bgColor} text-foreground`
                      }
                    `}
                  >
                    <item.icon className={`h-4 w-4 ${currentView === item.view ? 'text-foreground' : item.color}`} />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings at bottom */}
        <div className="mt-auto p-3 border-t border-border">
          <SidebarMenuButton className="w-full px-3 py-2 rounded-md hover:bg-muted/50 transition-colors">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Settings</span>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
