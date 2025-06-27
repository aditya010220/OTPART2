"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, Activity, AlertTriangle, CheckCircle, XCircle, Timer } from "lucide-react"

export function Dashboard() {
  const currentTime = new Date().toLocaleTimeString()
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const otStatus = [
    { id: "OT-01", status: "occupied", surgery: "Cardiac Bypass", doctor: "Dr. Smith", timeRemaining: "2h 30m" },
    { id: "OT-02", status: "available", surgery: null, doctor: null, timeRemaining: null },
    { id: "OT-03", status: "maintenance", surgery: null, doctor: null, timeRemaining: "1h 15m" },
    { id: "OT-04", status: "occupied", surgery: "Appendectomy", doctor: "Dr. Johnson", timeRemaining: "45m" },
    {
      id: "OT-05",
      status: "scheduled",
      surgery: "Knee Replacement",
      doctor: "Dr. Williams",
      timeRemaining: "Next: 30m",
    },
    { id: "OT-06", status: "available", surgery: null, doctor: null, timeRemaining: null },
  ]

  const upcomingSurgeries = [
    { time: "14:30", patient: "John Doe", surgery: "Gallbladder Removal", doctor: "Dr. Brown", ot: "OT-02" },
    { time: "15:00", patient: "Jane Smith", surgery: "Hernia Repair", doctor: "Dr. Davis", ot: "OT-06" },
    { time: "16:30", patient: "Mike Johnson", surgery: "Cataract Surgery", doctor: "Dr. Wilson", ot: "OT-05" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200"
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "occupied":
        return <XCircle className="w-4 h-4" />
      case "available":
        return <CheckCircle className="w-4 h-4" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "scheduled":
        return <Timer className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            {currentDate} • {currentTime}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Emergency Surgery
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operations</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available OTs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ready for scheduling</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Surgeries</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">5 completed, 3 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OT Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* OT Status */}
        <Card>
          <CardHeader>
            <CardTitle>Operation Theater Status</CardTitle>
            <CardDescription>Real-time status of all operation theaters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {otStatus.map((ot) => (
                <div key={ot.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{ot.id}</div>
                    <Badge className={getStatusColor(ot.status)}>
                      {getStatusIcon(ot.status)}
                      <span className="ml-1 capitalize">{ot.status}</span>
                    </Badge>
                  </div>
                  <div className="text-right text-sm">
                    {ot.surgery && <div className="font-medium">{ot.surgery}</div>}
                    {ot.doctor && <div className="text-muted-foreground">{ot.doctor}</div>}
                    {ot.timeRemaining && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ot.timeRemaining}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Surgeries */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Surgeries</CardTitle>
            <CardDescription>Next scheduled operations for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSurgeries.map((surgery, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {surgery.time}
                    </div>
                    <div>
                      <div className="font-medium">{surgery.patient}</div>
                      <div className="text-sm text-muted-foreground">{surgery.surgery}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{surgery.doctor}</div>
                    <div className="text-muted-foreground">{surgery.ot}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
