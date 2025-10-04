import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, DoorOpen, Monitor, Calendar, AlertTriangle, TrendingUp } from "lucide-react";

export const CapacityPlanning = () => {
  const facultyData = [
    { name: "Dr. James Wilson", load: 18, max: 20, courses: 3, status: "optimal" },
    { name: "Dr. Maria Garcia", load: 22, max: 20, courses: 4, status: "overload" },
    { name: "Prof. Robert Lee", load: 15, max: 20, courses: 2, status: "available" },
    { name: "Dr. Sarah Chen", load: 19, max: 20, courses: 3, status: "optimal" },
  ];

  const rooms = [
    { name: "Room A-101", capacity: 60, utilization: 85, type: "Lecture Hall" },
    { name: "Lab B-205", capacity: 30, utilization: 92, type: "Computer Lab" },
    { name: "Room C-304", capacity: 40, utilization: 68, type: "Classroom" },
    { name: "Lab D-112", capacity: 25, utilization: 95, type: "Physics Lab" },
  ];

  const examCapacity = [
    { center: "Main Campus", seats: 500, booked: 432, devices: 480 },
    { center: "North Wing", seats: 300, booked: 285, devices: 290 },
    { center: "South Campus", seats: 250, booked: 198, devices: 240 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Capacity Planning</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage faculty load, room allocation, and exam capacity
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Optimize Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Faculty Members", value: "48", icon: Users, color: "bg-blue-500/10 text-blue-600" },
          { label: "Active Rooms", value: "32", icon: DoorOpen, color: "bg-purple-500/10 text-purple-600" },
          { label: "Exam Seats", value: "1,050", icon: Monitor, color: "bg-orange-500/10 text-orange-600" },
          { label: "Avg Utilization", value: "82%", icon: TrendingUp, color: "bg-emerald-500/10 text-emerald-600" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Faculty Workload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {facultyData.map((faculty, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{faculty.name}</p>
                    <p className="text-xs text-muted-foreground">{faculty.courses} courses</p>
                  </div>
                  <Badge
                    variant={
                      faculty.status === "overload" ? "destructive" :
                      faculty.status === "available" ? "secondary" : "default"
                    }
                    className="text-xs"
                  >
                    {faculty.load}/{faculty.max} hrs
                  </Badge>
                </div>
                <Progress value={(faculty.load / faculty.max) * 100} className="h-2" />
                {faculty.status === "overload" && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Exceeds recommended load
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DoorOpen className="h-4 w-4" />
              Room Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rooms.map((room, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{room.name}</p>
                    <p className="text-xs text-muted-foreground">{room.type} • {room.capacity} seats</p>
                  </div>
                  <Badge variant={room.utilization > 90 ? "destructive" : "default"} className="text-xs">
                    {room.utilization}%
                  </Badge>
                </div>
                <Progress value={room.utilization} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Exam Center Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {examCapacity.map((center, i) => (
              <div key={i} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">{center.center}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {center.booked} of {center.seats} seats booked • {center.devices} devices available
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round((center.booked / center.seats) * 100)}% capacity
                  </Badge>
                </div>
                <Progress value={(center.booked / center.seats) * 100} className="h-2" />
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">View Schedule</Button>
                  <Button size="sm" variant="ghost">Allocate Devices</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
