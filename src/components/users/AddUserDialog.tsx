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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    position: "",
    permissions: [] as string[],
    status: "active",
    sendWelcomeEmail: true
  });

  const roles = [
    { value: "super_admin", label: "超级管理员", color: "bg-red-100 text-red-800" },
    { value: "admin", label: "系统管理员", color: "bg-blue-100 text-blue-800" },
    { value: "manager", label: "社区管理员", color: "bg-green-100 text-green-800" },
    { value: "technician", label: "维修技术员", color: "bg-orange-100 text-orange-800" },
    { value: "operator", label: "操作员", color: "bg-gray-100 text-gray-800" },
    { value: "viewer", label: "只读用户", color: "bg-purple-100 text-purple-800" }
  ];

  const allPermissions = [
    { id: "device_manage", label: "设备管理", group: "设备" },
    { id: "device_view", label: "设备查看", group: "设备" },
    { id: "workorder_manage", label: "工单管理", group: "工单" },
    { id: "workorder_assign", label: "工单派发", group: "工单" },
    { id: "workorder_view", label: "工单查看", group: "工单" },
    { id: "alert_manage", label: "告警管理", group: "告警" },
    { id: "alert_config", label: "告警配置", group: "告警" },
    { id: "user_manage", label: "用户管理", group: "用户" },
    { id: "role_manage", label: "角色管理", group: "用户" },
    { id: "system_config", label: "系统配置", group: "系统" },
    { id: "data_export", label: "数据导出", group: "系统" },
    { id: "log_view", label: "日志查看", group: "系统" }
  ];

  const rolePermissions = {
    super_admin: allPermissions.map(p => p.id),
    admin: ["device_manage", "device_view", "workorder_manage", "workorder_assign", "workorder_view", "alert_manage", "alert_config", "user_manage", "system_config", "data_export", "log_view"],
    manager: ["device_view", "workorder_manage", "workorder_assign", "workorder_view", "alert_manage", "data_export"],
    technician: ["device_view", "workorder_view", "alert_view"],
    operator: ["device_view", "workorder_view"],
    viewer: ["device_view", "workorder_view"]
  };

  const handleRoleChange = (role: string) => {
    setFormData({
      ...formData,
      role,
      permissions: rolePermissions[role as keyof typeof rolePermissions] || []
    });
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const newPermissions = checked
      ? [...formData.permissions, permissionId]
      : formData.permissions.filter(p => p !== permissionId);
    
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toast({
        title: "表单验证失败",
        description: "请填写所有必填字段",
        variant: "destructive"
      });
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "邮箱格式错误",
        description: "请输入正确的邮箱地址",
        variant: "destructive"
      });
      return;
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的手机号码",
        variant: "destructive"
      });
      return;
    }

    const userId = `USR-${Date.now().toString().slice(-8)}`;
    const newUser = {
      id: userId,
      ...formData,
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };

    console.log("创建用户:", newUser);

    toast({
      title: "用户创建成功",
      description: `用户 ${formData.name} (${userId}) 已成功创建${formData.sendWelcomeEmail ? "，欢迎邮件已发送" : ""}`,
    });

    // 重置表单
    setFormData({
      name: "", email: "", phone: "", role: "", department: "", position: "",
      permissions: [], status: "active", sendWelcomeEmail: true
    });
    onOpenChange(false);
  };

  const groupedPermissions = allPermissions.reduce((groups, permission) => {
    const group = permission.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {} as Record<string, typeof allPermissions>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>添加新用户</DialogTitle>
          <DialogDescription>
            创建新用户账号并分配相应的角色和权限
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          {/* 基本信息 */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3">基本信息</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  姓名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="用户姓名"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  邮箱 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="user@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  手机号 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="13800138000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">部门</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="所属部门"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">职位</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  placeholder="职位名称"
                />
              </div>

              <div className="space-y-2">
                <Label>账号状态</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 角色设置 */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3">角色设置</h3>
            <div className="space-y-2">
              <Label>
                用户角色 <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="选择用户角色" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={role.color}>{role.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 权限设置 */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3">权限设置</h3>
            <div className="space-y-4">
              {Object.entries(groupedPermissions).map(([group, permissions]) => (
                <div key={group} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">{group}权限</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {permissions.map(permission => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 其他设置 */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3">其他设置</h3>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.sendWelcomeEmail}
                onCheckedChange={(checked) => setFormData({...formData, sendWelcomeEmail: checked})}
              />
              <Label>创建成功后发送欢迎邮件</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            创建用户
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}