"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Monitor,
  Activity,
  Users,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer,
  Heart,
  Stethoscope,
} from "lucide-react"

export function OTMonitoring() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const otRooms = [
    {
      id: "OT-01",
      status: "occupied",
      surgery: "Cardiac Bypass Surgery",
      patient: "John Smith",
      surgeon: "Dr. Anderson",
      startTime: "09:00",
      estimatedDuration: 240,
      elapsedTime: 150,
      team: ["Dr. Anderson", "Nurse Johnson", "Anesthesiologist Brown"],
      vitals: {
        heartRate: 72,
        bloodPressure: "120/80",
        temperature: 98.6,
        oxygenSat: 98,
      },
      equipment: {
        ventilator: "active",
        monitor: "normal",
        anesthesia: "stable",
      },
    },
    {
      id: "OT-02",
      status: "available",
      surgery: null,
      patient: null,
      surgeon: null,
      startTime: null,
      estimatedDuration: null,
      elapsedTime: null,
      team: [],
      vitals: null,
      equipment: {
        ventilator: "standby",
        monitor: "ready",
        anesthesia: "ready",
      },
    },
    {
      id: "OT-03",
      status: "maintenance",
      surgery: null,
      patient: null,
      surgeon: null,
      startTime: null,
      estimatedDuration: null,
      elapsedTime: null,
      team: ["Maintenance Team"],
      vitals: null,
      equipment: {
        ventilator: "maintenance",
        monitor: "maintenance",
        anesthesia: "maintenance",
      },
    },
    {
      id: "OT-04",
      status: "occupied",
      surgery: "Appendectomy",
      patient: "Sarah Johnson",
      surgeon: "Dr. Brown",
      startTime: "14:00",
      estimatedDuration: 90,
      elapsedTime: 45,
      team: ["Dr. Brown", "Nurse Wilson", "Anesthesiologist Davis"],
      vitals: {
        heartRate: 68,
        bloodPressure: "115/75",
        temperature: 98.2,
        oxygenSat: 99,
      },
      equipment: {
        ventilator: "active",
        monitor: "normal",
        anesthesia: "stable",
      },
    },
    {
      id: "OT-05",
      status: "scheduled",
      surgery: "Knee Replacement",
      patient: "Mike Davis",
      surgeon: "Dr. Wilson",
      startTime: "16:30",
      estimatedDuration: 120,
      elapsedTime: null,
      team: ["Dr. Wilson", "Nurse Thompson", "Anesthesiologist Lee"],
      vitals: null,
      equipment: {
        ventilator: "ready",
        monitor: "ready",
        anesthesia: "ready",
      },
    },
    {
      id: "OT-06",
      status: "available",
      surgery: null,
      patient: null,
      surgeon: null,
      startTime: null,
      estimatedDuration: null,
      elapsedTime: null,
      team: [],
      vitals: null,
      equipment: {
        ventilator: "standby",
        monitor: "ready",
        anesthesia: "ready",
      },
    },
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
        return <Activity className="w-4 h-4" />
      case "available":
        return <CheckCircle className="w-4 h-4" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "scheduled":
        return <Timer className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  const getEquipmentStatus = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "normal":
        return "bg-green-100 text-green-800"
      case "stable":
        return "bg-green-100 text-green-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "standby":
        return "bg-gray-100 text-gray-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (elapsedTime: number, totalDuration: number) => {
    return Math.min((elapsedTime / totalDuration) * 100, 100)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-time OT Monitoring</h1>
          <p className="text-muted-foreground">
            Live monitoring of all operation theaters • Last updated: {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <Button variant="outline">
          <Monitor className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* OT Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otRooms.map((ot) => (
          <Card key={ot.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ot.id}</CardTitle>
                <Badge className={getStatusColor(ot.status)}>
                  {getStatusIcon(ot.status)}
                  <span className="ml-1 capitalize">{ot.status}</span>
                </Badge>
              </div>
              {ot.surgery && <CardDescription className="font-medium text-foreground">{ot.surgery}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Surgery Details */}
              {ot.status === "occupied" && (
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Patient: {ot.patient}</div>
                    <div className="text-muted-foreground">Surgeon: {ot.surgeon}</div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress till now </span>
                      <span>
                        {formatTime(ot.elapsedTime!)} / {formatTime(ot.estimatedDuration!)}
                      </span>
                    </div>
                    <Progress value={calculateProgress(ot.elapsedTime!, ot.estimatedDuration!)} />
                  </div>

                  {/* Vitals */}
                  {ot.vitals && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{ot.vitals.heartRate} BPM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-blue-500" />
                        <span>{ot.vitals.bloodPressure}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-500" />
                        <span>{ot.vitals.temperature}°F</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3 text-green-500" />
                        <span>{ot.vitals.oxygenSat}% O2</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Scheduled Surgery  */}
              {ot.status === "scheduled" && (
                <div className="space-y-2">
                  <div className="text-sm">
                    <div className="font-medium">Next: {ot.surgery}</div>
                    <div className="text-muted-foreground">Patient Name: {ot.patient}</div>
                    <div className="text-muted-foreground">Surgeon Name: {ot.surgeon}</div>
                    <div className="text-muted-foreground">Start time : {ot.startTime}</div>
                  </div>
                </div>
              )}

              {/* Equipment Status */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Equipment Status</div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className="flex justify-between">
                    <span>Ventilator:</span>
                    <Badge variant="outline" className={getEquipmentStatus(ot.equipment.ventilator)}>
                      {ot.equipment.ventilator}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitor:</span>
                    <Badge variant="outline" className={getEquipmentStatus(ot.equipment.monitor)}>
                      {ot.equipment.monitor}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Anesthesia:</span>
                    <Badge variant="outline" className={getEquipmentStatus(ot.equipment.anesthesia)}>
                      {ot.equipment.anesthesia}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Team */}
              {ot.team.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Team ({ot.team.length})
                  </div>
                  <div className="text-xs text-muted-foreground">{ot.team.join(", ")}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
