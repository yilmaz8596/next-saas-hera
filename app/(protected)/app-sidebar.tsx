"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { useProject } from "@/hooks/use-project";
import { useProjectStore } from "@/store/store";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  ScreenShare,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Q&A",
    icon: Bot,
    url: "/qa",
  },
  {
    title: "Meetings",
    icon: ScreenShare,
    url: "/meetings",
  },
  {
    title: "Billing",
    icon: CreditCard,
    url: "/billing",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { projects } = useProject();
  console.log(projects);
  const { fetchProject } = useProjectStore();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center gap-2 transition-all duration-300",
            state === "collapsed" ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <Image src="/logo.svg" alt="logo" width={250} height={250} />
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        {
                          "!bg-primary !text-white": pathname === item.url,
                        },
                        "list-none"
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((item) => (
                <SidebarMenuItem key={item.projectName}>
                  <SidebarMenuButton asChild>
                    <div>
                      <div
                        className={cn(
                          "rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary cursor-pointer",
                          {
                            "bg-primary text-white": true,
                          }
                        )}
                        onClick={async () => {
                          await fetchProject(item.id);
                        }}
                      >
                        {item.projectName[0]}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>
              {state === "expanded" && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size="sm" variant={"outline"} className="w-fit">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
