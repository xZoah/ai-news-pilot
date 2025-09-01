import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sources", href: "/sources", icon: Globe },
  { name: "Content", href: "/content", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
              AI News
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive: navActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                navActive || isActive(item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon
              className={cn("w-5 h-5", isCollapsed ? "" : "mr-3")}
            />
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User section - placeholder for future implementation */}
      <div className="p-4 border-t border-sidebar-border">
        <div
          className={cn(
            "flex items-center px-3 py-2 text-sm text-sidebar-foreground",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-medium">A</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70">admin@ai-news.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}