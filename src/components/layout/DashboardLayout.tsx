import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Smartphone, 
  AlertTriangle, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings,
  Files,
  Bell,
  Search,
  Menu,
  X,
  Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "总览", icon: Home },
  { id: "devices", label: "设备管理", icon: Smartphone },
  { id: "monitoring", label: "监控中心", icon: BarChart3 },
  { id: "workorders", label: "工单管理", icon: ClipboardList },
  { id: "alerts", label: "告警中心", icon: AlertTriangle },
  { id: "files", label: "文件管理", icon: Files },
  { id: "users", label: "人员管理", icon: Users },
  { id: "assets", label: "资产管理", icon: Boxes },
  { id: "settings", label: "系统设置", icon: Settings },
];

export function DashboardLayout({ children, activeTab = "dashboard", onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 enterprise-gradient rounded-lg flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">智能生活卫士</h1>
              <p className="text-xs text-muted-foreground">Smart Life Guard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="搜索设备、工单..." 
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs">3</Badge>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">管</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">系统管理员</p>
              <p className="text-xs text-muted-foreground">admin@smartlife.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-11",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => {
                      onTabChange?.(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-border">
              <Card className="bg-primary-light border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">系统状态</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>在线设备</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>活跃告警</span>
                    <Badge variant="destructive" className="h-5 text-xs">23</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}