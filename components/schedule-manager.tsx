"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, Plus, Filter, AlertCircle } from "lucide-react"

export function ScheduleManager() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ]

  const operationTheaters = ["OT-01", "OT-02", "OT-03", "OT-04", "OT-05", "OT-06"]

  const scheduledSurgeries = [
    {
      id: 1,
      time: "09:00",
      duration: 180,
      ot: "OT-01",
      surgery: "Cardiac Bypass Surgery",
      patient: "John Smith",
      doctor: "Dr. Anderson",
      priority: "high",
      status: "confirmed",
    },
    {
      id: 2,
      time: "14:00",
      duration: 90,
      ot: "OT-02",
      surgery: "Appendectomy",
      patient: "Sarah Johnson",
      doctor: "Dr. Brown",
      priority: "medium",
      status: "confirmed",
    },
    {
      id: 3,
      time: "10:30",
      duration: 120,
      ot: "OT-04",
      surgery: "Knee Replacement",
      patient: "Mike Davis",
      doctor: "Dr. Wilson",
      priority: "low",
      status: "tentative",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tentative":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const totalMinutes = hours * 60 + minutes + duration
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operation Theater Scheduling</h1>
          <p className="text-muted-foreground">Manage and coordinate surgical schedules</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Surgery
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Surgery</DialogTitle>
                <DialogDescription>Add a new surgical procedure to the schedule</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Patient Name</Label>
                    <Input id="patient" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Surgeon</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select surgeon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-anderson">Dr. Anderson</SelectItem>
                        <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                        <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surgery">Surgery Type</Label>
                  <Input id="surgery" placeholder="Enter surgery type" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input id="duration" type="number" placeholder="120" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ot">Operation Theater</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OT" />
                      </SelectTrigger>
                      <SelectContent>
                        {operationTheaters.map((ot) => (
                          <SelectItem key={ot} value={ot}>
                            {ot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes or special requirements" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsScheduleDialogOpen(false)}>Schedule Surgery</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <AlertCircle className="w-4 h-4 mr-2" />
            Emergency Slot
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Schedule Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="date-filter">Date</Label>
              <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ot-filter">Operation Theater</Label>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All OTs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All OTs</SelectItem>
                  {operationTheaters.map((ot) => (
                    <SelectItem key={ot} value={ot}>
                      {ot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor-filter">Surgeon</Label>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Surgeons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Surgeons</SelectItem>
                  <SelectItem value="dr-anderson">Dr. Anderson</SelectItem>
                  <SelectItem value="dr-brown">Dr. Brown</SelectItem>
                  <SelectItem value="dr-wilson">Dr. Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Surgery Schedule -{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardTitle>
          <CardDescription>Click on time slots to schedule new surgeries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledSurgeries.map((surgery) => (
              <div key={surgery.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-medium text-lg">{surgery.time}</div>
                      <div className="text-xs text-muted-foreground">
                        {calculateEndTime(surgery.time, surgery.duration)}
                      </div>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div>
                      <div className="font-medium">{surgery.surgery}</div>
                      <div className="text-sm text-muted-foreground">
                        Patient: {surgery.patient} • Surgeon: {surgery.doctor}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {surgery.ot}
                        </Badge>
                        <Badge className={getPriorityColor(surgery.priority)}>{surgery.priority} priority</Badge>
                        <Badge className={getStatusColor(surgery.status)}>{surgery.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {surgery.duration} min
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
