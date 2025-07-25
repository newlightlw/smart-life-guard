import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { DeviceManagement } from "@/components/devices/DeviceManagement";
import { WorkOrderManagement } from "@/components/workorders/WorkOrderManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <MetricsOverview />;
      case "devices":
        return <DeviceManagement />;
      case "workorders":
        return <WorkOrderManagement />;
      case "monitoring":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">监控中心</h3>
            <p className="text-sm text-muted-foreground mt-2">实时设备监控功能开发中...</p>
          </div>
        );
      case "alerts":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">告警中心</h3>
            <p className="text-sm text-muted-foreground mt-2">智能告警系统功能开发中...</p>
          </div>
        );
      case "users":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">用户管理</h3>
            <p className="text-sm text-muted-foreground mt-2">权限管理功能开发中...</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground">系统设置</h3>
            <p className="text-sm text-muted-foreground mt-2">系统配置功能开发中...</p>
          </div>
        );
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;
