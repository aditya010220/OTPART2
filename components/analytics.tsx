"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Clock, Users, Activity, Calendar } from "lucide-react"

export function Analytics() {
  const utilizationData = [
    { day: "Mon", utilization: 85, surgeries: 12 },
    { day: "Tue", utilization: 92, surgeries: 14 },
    { day: "Wed", utilization: 78, surgeries: 10 },
    { day: "Thu", utilization: 88, surgeries: 13 },
    { day: "Fri", utilization: 95, surgeries: 15 },
    { day: "Sat", utilization: 65, surgeries: 8 },
    { day: "Sun", utilization: 45, surgeries: 5 },
  ]

  const surgeryTypeData = [
    { name: "Cardiac", value: 25, color: "#ef4444" },
    { name: "Orthopedic", value: 20, color: "#3b82f6" },
    { name: "General", value: 18, color: "#10b981" },
    { name: "Neurological", value: 15, color: "#f59e0b" },
    { name: "Plastic", value: 12, color: "#8b5cf6" },
    { name: "Other", value: 10, color: "#6b7280" },
  ]

  const monthlyTrends = [
    { month: "Jan", surgeries: 245, avgDuration: 125 },
    { month: "Feb", surgeries: 268, avgDuration: 118 },
    { month: "Mar", surgeries: 289, avgDuration: 132 },
    { month: "Apr", surgeries: 312, avgDuration: 128 },
    { month: "May", surgeries: 298, avgDuration: 135 },
    { month: "Jun", surgeries: 325, avgDuration: 122 },
  ]

  const performanceMetrics = [
    {
      title: "Average OT Utilization",
      value: "82.5%",
      change: "+5.2%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Average Surgery Duration",
      value: "127 min",
      change: "-3.1%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Monthly Surgeries",
      value: "325",
      change: "+8.7%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Active Surgeons",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Users,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground">Comprehensive insights into OT performance and utilization</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p
                className={`text-xs flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp className={`h-3 w-3 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly OT Utilization</CardTitle>
            <CardDescription>Operation theater usage throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                utilization: {
                  label: "Utilization %",
                  color: "#3b82f6",
                },
                surgeries: {
                  label: "Surgeries",
                  color: "#10b981",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="utilization" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Surgery Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Surgery Types Distribution</CardTitle>
            <CardDescription>Breakdown of surgeries by specialty</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Surgeries",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={surgeryTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {surgeryTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {surgeryTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Surgery Trends</CardTitle>
          <CardDescription>Surgery volume and average duration over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              surgeries: {
                label: "Surgeries",
                color: "#3b82f6",
              },
              avgDuration: {
                label: "Avg Duration (min)",
                color: "#ef4444",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="surgeries"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgDuration"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
