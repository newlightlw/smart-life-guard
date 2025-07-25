import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { DeviceManagement } from "@/components/devices/DeviceManagement";
import { WorkOrderManagement } from "@/components/workorders/WorkOrderManagement";
import { MonitoringCenter } from "@/components/monitoring/MonitoringCenter";
import { AlertCenter } from "@/components/alerts/AlertCenter";
import { UserManagement } from "@/components/users/UserManagement";
import { SystemSettings } from "@/components/settings/SystemSettings";

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
        return <MonitoringCenter />;
      case "alerts":
        return <AlertCenter />;
      case "users":
        return <UserManagement />;
      case "settings":
        return <SystemSettings />;
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
