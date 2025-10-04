import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  History,
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  Award,
  Settings,
  Plus,
  Search,
} from "lucide-react";

type View = "dashboard" | "editor" | "workflow" | "audit" | "subject-planning" | "capacity" | "timetable" | "exams" | "results";

interface CommandPaletteProps {
  onNavigate: (view: View) => void;
}

export const CommandPalette = ({ onNavigate }: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (callback: () => void) => {
    setOpen(false);
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type to search or navigate..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleSelect(() => onNavigate("dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("editor"))}>
            <FileText className="mr-2 h-4 w-4" />
            Paper Editor
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("workflow"))}>
            <GitBranch className="mr-2 h-4 w-4" />
            Approval Workflow
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("audit"))}>
            <History className="mr-2 h-4 w-4" />
            Audit Log
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("subject-planning"))}>
            <BookOpen className="mr-2 h-4 w-4" />
            Subject Planning
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("capacity"))}>
            <Users className="mr-2 h-4 w-4" />
            Capacity Planning
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("timetable"))}>
            <Calendar className="mr-2 h-4 w-4" />
            Timetable Management
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("exams"))}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Exam Management
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("results"))}>
            <Award className="mr-2 h-4 w-4" />
            Results Publishing
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => handleSelect(() => onNavigate("exams"))}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Exam
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("subject-planning"))}>
            <Plus className="mr-2 h-4 w-4" />
            Create Course Outline
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => onNavigate("timetable"))}>
            <Plus className="mr-2 h-4 w-4" />
            Generate Timetable
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
