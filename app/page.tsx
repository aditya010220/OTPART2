"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Dashboard } from "@/components/dashboard"
import { ScheduleManager } from "@/components/schedule-manager"
import { OTMonitoring } from "@/components/ot-monitoring"
import { Analytics } from "@/components/analytics"
import { DocumentManager } from "@/components/document-manager"
import { UserManagement } from "@/components/user-management"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function HospitalScheduler() {
  const [activeView, setActiveView] = useState("dashboard")
  const [userRole] = useState("administrator") // In real app, this would come from auth

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "schedule":
        return <ScheduleManager />
      case "monitoring":
        return <OTMonitoring />
      case "analytics":
        return <Analytics />
      case "documents":
        return <DocumentManager />
      case "users":
        return <UserManagement />
      default:
        return <Dashboard />
    }
  }

  const getPageTitle = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard Overview"
      case "schedule":
        return "Operation Theater Scheduling"
      case "monitoring":
        return "Real-time OT Monitoring"
      case "analytics":
        return "Analytics & Reports"
      case "documents":
        return "Document Management"
      case "users":
        return "User Management"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} setActiveView={setActiveView} userRole={userRole} />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{getPageTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
