"use client"

import type * as React from "react"
import { Calendar, LayoutDashboard, Monitor, BarChart3, FileText, Users, Hospital, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string
  setActiveView: (view: string) => void
  userRole: string
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
    roles: ["administrator", "doctor", "nurse"],
  },
  {
    title: "OT Scheduling",
    icon: Calendar,
    key: "schedule",
    roles: ["administrator", "doctor"],
  },
  {
    title: "Real-time Monitoring",
    icon: Monitor,
    key: "monitoring",
    roles: ["administrator", "doctor", "nurse"],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    key: "analytics",
    roles: ["administrator"],
  },
  {
    title: "Documents",
    icon: FileText,
    key: "documents",
    roles: ["administrator", "doctor", "nurse"],
  },
  {
    title: "User Management",
    icon: Users,
    key: "users",
    roles: ["administrator"],
  },
]

export function AppSidebar({ activeView, setActiveView, userRole, ...props }: AppSidebarProps) {
  const filteredItems = navigationItems.filter((item) => item.roles.includes(userRole))

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Hospital className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">MedScheduler</h2>
            <p className="text-xs text-muted-foreground">OT Management System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.key)}
                isActive={activeView === item.key}
                className="w-full"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
