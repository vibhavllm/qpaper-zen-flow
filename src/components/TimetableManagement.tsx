import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, AlertCircle, CheckCircle, Clock } from "lucide-react";

export const TimetableManagement = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const schedule = {
    Monday: [
      { time: "09:00 AM", course: "CS301", room: "A-101", faculty: "Dr. Wilson", conflict: false },
      { time: "11:00 AM", course: "MA201", room: "B-205", faculty: "Dr. Garcia", conflict: false },
      { time: "02:00 PM", course: "PH101", room: "D-112", faculty: "Prof. Lee", conflict: true },
    ],
    Tuesday: [
      { time: "10:00 AM", course: "CS402", room: "A-101", faculty: "Dr. Chen", conflict: false },
      { time: "01:00 PM", course: "CS301", room: "C-304", faculty: "Dr. Wilson", conflict: false },
    ],
  };

  const conflicts = [
    { type: "Room Conflict", description: "Room D-112 double-booked at 2:00 PM Monday", severity: "high" },
    { type: "Faculty Overlap", description: "Dr. Wilson has back-to-back classes", severity: "medium" },
    { type: "Capacity Issue", description: "CS301 enrollment exceeds room capacity", severity: "high" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Timetable Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage course schedules and resolve conflicts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Export Timetable
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: "156", icon: Calendar, color: "bg-blue-500/10 text-blue-600" },
          { label: "Active Conflicts", value: "3", icon: AlertCircle, color: "bg-rose-500/10 text-rose-600" },
          { label: "Rooms Used", value: "28", icon: CheckCircle, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Avg Session/Day", value: "31", icon: Clock, color: "bg-purple-500/10 text-purple-600" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Weekly Schedule</CardTitle>
              <div className="flex gap-1">
                {days.map((day) => (
                  <Button
                    key={day}
                    size="sm"
                    variant={selectedDay === day ? "default" : "ghost"}
                    onClick={() => setSelectedDay(day)}
                    className="text-xs"
                  >
                    {day.slice(0, 3)}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((slot) => {
                const session = schedule[selectedDay as keyof typeof schedule]?.find(s => s.time === slot);
                return (
                  <div
                    key={slot}
                    className={`p-3 rounded-lg border transition-colors ${
                      session
                        ? session.conflict
                          ? "border-destructive bg-destructive/5"
                          : "border-primary bg-primary/5"
                        : "border-dashed border-border"
                    }`}
                  >
                    {session ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-muted-foreground min-w-[80px]">{session.time}</div>
                          <div>
                            <p className="text-sm font-medium">{session.course}</p>
                            <p className="text-xs text-muted-foreground">{session.room} • {session.faculty}</p>
                          </div>
                        </div>
                        {session.conflict && (
                          <Badge variant="destructive" className="text-xs">
                            Conflict
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">{slot}</div>
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conflicts.map((conflict, i) => (
              <div key={i} className="p-3 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium">{conflict.type}</p>
                  <Badge
                    variant={conflict.severity === "high" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {conflict.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{conflict.description}</p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Resolve
                </Button>
              </div>
            ))}
            {conflicts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conflicts detected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
