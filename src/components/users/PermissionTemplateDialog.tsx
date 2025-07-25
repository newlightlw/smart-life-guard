import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PermissionTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 模拟权限模板数据
const permissionTemplates = [
  {
    id: "template-001",
    name: "基础操作员",
    description: "适用于一般操作人员，只能查看设备和工单信息",
    permissions: ["device_view", "workorder_view"],
    userCount: 15,
    createdAt: "2024-01-10"
  },
  {
    id: "template-002", 
    name: "维修技术员",
    description: "适用于维修人员，可以处理工单和查看设备详情",
    permissions: ["device_view", "workorder_view", "workorder_manage", "alert_view"],
    userCount: 8,
    createdAt: "2024-01-10"
  },
  {
    id: "template-003",
    name: "社区管理员",
    description: "适用于社区管理人员，拥有大部分管理权限",
    permissions: ["device_manage", "device_view", "workorder_manage", "workorder_assign", "workorder_view", "alert_manage", "data_export"],
    userCount: 3,
    createdAt: "2024-01-10"
  }
];

export function PermissionTemplateDialog({ open, onOpenChange }: PermissionTemplateDialogProps) {
  const { toast } = useToast();
  const [templates, setTemplates] = useState(permissionTemplates);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    permissions: [] as string[]
  });

  const allPermissions = [
    { id: "device_manage", label: "设备管理", group: "设备" },
    { id: "device_view", label: "设备查看", group: "设备" },
    { id: "workorder_manage", label: "工单管理", group: "工单" },
    { id: "workorder_assign", label: "工单派发", group: "工单" },
    { id: "workorder_view", label: "工单查看", group: "工单" },
    { id: "alert_manage", label: "告警管理", group: "告警" },
    { id: "alert_config", label: "告警配置", group: "告警" },
    { id: "alert_view", label: "告警查看", group: "告警" },
    { id: "user_manage", label: "用户管理", group: "用户" },
    { id: "role_manage", label: "角色管理", group: "用户" },
    { id: "system_config", label: "系统配置", group: "系统" },
    { id: "data_export", label: "数据导出", group: "系统" },
    { id: "log_view", label: "日志查看", group: "系统" }
  ];

  const groupedPermissions = allPermissions.reduce((groups, permission) => {
    const group = permission.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, typeof allPermissions>);

  const handleCreateTemplate = () => {
    if (!newTemplate.name || newTemplate.permissions.length === 0) {
      toast({
        title: "表单验证失败",
        description: "请填写模板名称并至少选择一个权限",
        variant: "destructive"
      });
      return;
    }

    const templateId = `template-${Date.now().toString().slice(-6)}`;
    const template = {
      id: templateId,
      ...newTemplate,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: "", description: "", permissions: [] });
    setIsCreating(false);

    toast({
      title: "模板创建成功",
      description: `权限模板 ${newTemplate.name} 已成功创建`
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template && template.userCount > 0) {
      toast({
        title: "删除失败",
        description: "该模板正在被用户使用，无法删除",
        variant: "destructive"
      });
      return;
    }

    setTemplates(templates.filter(t => t.id !== templateId));
    toast({
      title: "模板已删除",
      description: "权限模板已成功删除"
    });
  };

  const handleCopyTemplate = (template: typeof templates[0]) => {
    setNewTemplate({
      name: `${template.name} - 副本`,
      description: template.description,
      permissions: [...template.permissions]
    });
    setIsCreating(true);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const newPermissions = checked
      ? [...newTemplate.permissions, permissionId]
      : newTemplate.permissions.filter(p => p !== permissionId);
    
    setNewTemplate({ ...newTemplate, permissions: newPermissions });
  };

  const getPermissionLabel = (permissionId: string) => {
    return allPermissions.find(p => p.id === permissionId)?.label || permissionId;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>权限模板管理</DialogTitle>
          <DialogDescription>
            创建和管理权限模板，方便快速为用户分配权限
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList>
            <TabsTrigger value="templates">模板列表</TabsTrigger>
            <TabsTrigger value="create">创建模板</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>权限数量: {template.permissions.length}</span>
                          <span>使用用户: {template.userCount}</span>
                          <span>创建时间: {template.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCopyTemplate(template)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">包含权限:</Label>
                      <div className="flex flex-wrap gap-1">
                        {template.permissions.map(permissionId => (
                          <Badge key={permissionId} variant="secondary" className="text-xs">
                            {getPermissionLabel(permissionId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="max-h-[500px] overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">模板名称</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="权限模板名称"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-desc">模板描述</Label>
                  <Input
                    id="template-desc"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    placeholder="简要描述模板用途"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">权限配置</Label>
                {Object.entries(groupedPermissions).map(([group, permissions]) => (
                  <Card key={group}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{group}权限</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {permissions.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={permission.id}
                              checked={newTemplate.permissions.includes(permission.id)}
                              onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                            />
                            <Label htmlFor={permission.id} className="text-sm">
                              {permission.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {newTemplate.permissions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">已选择的权限预览</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {newTemplate.permissions.map(permissionId => (
                        <Badge key={permissionId} variant="default" className="text-xs">
                          {getPermissionLabel(permissionId)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                创建模板
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}