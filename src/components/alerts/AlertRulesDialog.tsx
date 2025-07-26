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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlertRulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// 模拟告警规则数据
const alertRules = [
  {
    id: "rule-001",
    name: "设备离线告警",
    description: "设备超过5分钟未上报数据",
    deviceType: "全部",
    condition: "offline_duration > 5min",
    level: "medium",
    enabled: true,
    actions: ["邮件通知", "短信通知"]
  },
  {
    id: "rule-002", 
    name: "温度异常告警",
    description: "环境温度超过正常范围",
    deviceType: "环境传感器",
    condition: "temperature > 35°C or temperature < 5°C",
    level: "high",
    enabled: true,
    actions: ["邮件通知", "应用推送"]
  },
  {
    id: "rule-003",
    name: "电池电量低告警",
    description: "设备电池电量低于20%",
    deviceType: "无线设备",
    condition: "battery_level < 20%",
    level: "low",
    enabled: false,
    actions: ["邮件通知"]
  }
];

export function AlertRulesDialog({ open, onOpenChange }: AlertRulesDialogProps) {
  const { toast } = useToast();
  const [rules, setRules] = useState(alertRules);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    deviceType: "全部",
    condition: "",
    level: "medium",
    enabled: true,
    actions: [] as string[]
  });

  const deviceTypes = [
    "全部", "智能门锁", "监控摄像头", "智能空调", "烟雾探测器",
    "环境传感器", "智能灯具", "无线设备"
  ];

  const alertLevels = [
    { value: "low", label: "低", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "中", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "高", color: "bg-orange-100 text-orange-800" },
    { value: "critical", label: "严重", color: "bg-red-100 text-red-800" }
  ];

  const actionTypes = ["邮件通知", "短信通知", "应用推送", "语音通话", "微信通知"];

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
    toast({
      title: "规则状态已更新",
      description: "告警规则状态已成功更新"
    });
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    toast({
      title: "规则已删除",
      description: "告警规则已成功删除"
    });
  };

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.condition) {
      toast({
        title: "表单验证失败",
        description: "请填写规则名称和触发条件",
        variant: "destructive"
      });
      return;
    }

    const ruleId = `rule-${Date.now().toString().slice(-6)}`;
    const rule = {
      id: ruleId,
      ...newRule
    };

    setRules([...rules, rule]);
    setNewRule({
      name: "", description: "", deviceType: "全部",
      condition: "", level: "medium", enabled: true, actions: []
    });
    setIsCreating(false);

    toast({
      title: "规则创建成功",
      description: `告警规则 ${newRule.name} 已成功创建`
    });
  };

  const handleActionToggle = (action: string) => {
    const actions = newRule.actions.includes(action)
      ? newRule.actions.filter(a => a !== action)
      : [...newRule.actions, action];
    setNewRule({ ...newRule, actions });
  };

  const handleEditRule = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      setNewRule({
        name: rule.name,
        description: rule.description,
        deviceType: rule.deviceType,
        condition: rule.condition,
        level: rule.level,
        enabled: rule.enabled,
        actions: rule.actions
      });
      setEditingRule(ruleId);
      setIsCreating(true);
    }
  };

  const handleSaveEdit = () => {
    if (!newRule.name || !newRule.condition) {
      toast({
        title: "表单验证失败",
        description: "请填写规则名称和触发条件",
        variant: "destructive"
      });
      return;
    }

    setRules(rules.map(rule => 
      rule.id === editingRule 
        ? { ...rule, ...newRule }
        : rule
    ));

    setNewRule({
      name: "", description: "", deviceType: "全部",
      condition: "", level: "medium", enabled: true, actions: []
    });
    setEditingRule(null);
    setIsCreating(false);

    toast({
      title: "规则更新成功",
      description: `告警规则已成功更新`
    });
  };

  const resetForm = () => {
    setNewRule({
      name: "", description: "", deviceType: "全部",
      condition: "", level: "medium", enabled: true, actions: []
    });
    setEditingRule(null);
    setIsCreating(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>告警规则管理</DialogTitle>
          <DialogDescription>
            配置设备告警的触发条件、级别和通知方式
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="rules" className="w-full">
          <TabsList>
            <TabsTrigger value="rules">规则列表</TabsTrigger>
            <TabsTrigger value="create">创建规则</TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-4">
            <div className="max-h-[400px] overflow-y-auto space-y-3">
              {rules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{rule.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditRule(rule.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteRule(rule.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">设备类型：</span>
                        <span className="text-muted-foreground">{rule.deviceType}</span>
                      </div>
                      <div>
                        <span className="font-medium">告警级别：</span>
                        <Badge className={alertLevels.find(l => l.value === rule.level)?.color}>
                          {alertLevels.find(l => l.value === rule.level)?.label}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">触发条件：</span>
                        <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                          {rule.condition}
                        </code>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">通知方式：</span>
                        <div className="flex gap-1 mt-1">
                          {rule.actions.map(action => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="max-h-[400px] overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">规则名称</Label>
                  <Input
                    id="rule-name"
                    value={newRule.name}
                    onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                    placeholder="告警规则名称"
                  />
                </div>

                <div className="space-y-2">
                  <Label>设备类型</Label>
                  <Select value={newRule.deviceType} onValueChange={(value) => setNewRule({...newRule, deviceType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">规则描述</Label>
                <Input
                  id="description"
                  value={newRule.description}
                  onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                  placeholder="简要描述该规则的用途"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">触发条件</Label>
                <Input
                  id="condition"
                  value={newRule.condition}
                  onChange={(e) => setNewRule({...newRule, condition: e.target.value})}
                  placeholder="如：temperature > 35 或 offline_duration > 5min"
                />
              </div>

              <div className="space-y-2">
                <Label>告警级别</Label>
                <Select value={newRule.level} onValueChange={(value) => setNewRule({...newRule, level: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alertLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>通知方式</Label>
                <div className="flex flex-wrap gap-2">
                  {actionTypes.map(action => (
                    <div
                      key={action}
                      className={`px-3 py-1 rounded-md cursor-pointer text-sm transition-colors ${
                        newRule.actions.includes(action)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                      onClick={() => handleActionToggle(action)}
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newRule.enabled}
                  onCheckedChange={(checked) => setNewRule({...newRule, enabled: checked})}
                />
                <Label>启用规则</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {isCreating && (
                <Button variant="outline" onClick={resetForm}>
                  取消
                </Button>
              )}
              <Button onClick={editingRule ? handleSaveEdit : handleCreateRule}>
                <Plus className="h-4 w-4 mr-2" />
                {editingRule ? "保存修改" : "创建规则"}
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