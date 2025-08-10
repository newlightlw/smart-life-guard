import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationManagement } from "./OrganizationManagement";
import { PersonnelRecords } from "./PersonnelRecords";
import { OnboardingTransfers } from "./OnboardingTransfers";
import { AffairsManagement } from "./AffairsManagement";

export function PersonnelManagement() {
  useEffect(() => {
    document.title = "人员管理 - 组织管理/档案/入转调离/事务管理";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "人员管理模块：组织管理、人员档案、入转调离、事务管理，一体化人事管理看板"
      );
    }
  }, []);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">人员管理</h1>
        <p className="text-sm text-muted-foreground mt-1">
          覆盖组织管理、人员档案、入转调离与事务管理的综合人力资源模块。
        </p>
      </header>

      <Tabs defaultValue="org" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="org">组织管理</TabsTrigger>
          <TabsTrigger value="records">人员档案</TabsTrigger>
          <TabsTrigger value="flow">入转调离</TabsTrigger>
          <TabsTrigger value="affairs">事务管理</TabsTrigger>
        </TabsList>

        <TabsContent value="org">
          <OrganizationManagement />
        </TabsContent>
        <TabsContent value="records">
          <PersonnelRecords />
        </TabsContent>
        <TabsContent value="flow">
          <OnboardingTransfers />
        </TabsContent>
        <TabsContent value="affairs">
          <AffairsManagement />
        </TabsContent>
      </Tabs>
    </section>
  );
}
