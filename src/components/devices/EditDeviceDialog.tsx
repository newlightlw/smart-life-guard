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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface EditDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: {
    id: string;
    name: string;
    type: string;
    brand: string;
    model: string;
    location: string;
    status: string;
    health: number;
    lastOnline: string;
    installDate: string;
    warranty: string;
  };
}

export function EditDeviceDialog({ open, onOpenChange, device }: EditDeviceDialogProps) {
  const [formData, setFormData] = useState({
    name: device.name,
    type: device.type,
    brand: device.brand,
    model: device.model,
    location: device.location,
    description: "",
    autoRestart: true,
    notifications: true,
    dataCollection: true,
    firmwareAutoUpdate: false,
    heartbeatInterval: "30",
    alertThreshold: "80",
  });

  const { toast } = useToast();

  const deviceTypes = ["智能门锁", "监控摄像头", "智能空调", "烟雾探测器", "智能水表", "充电桩"];
  const locations = [
    "A栋-1层-大堂", "A栋-1层-101室", "A栋-2层-会议室", "A栋-3层-走廊",
    "B栋-1层-接待室", "B栋-2层-办公室", "B栋-3层-会议室",
    "公共区域-停车场", "公共区域-花园"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "验证错误",
        description: "设备名称不能为空",
        variant: "destructive",
      });
      return;
    }

    // 模拟保存
    toast({
      title: "保存成功",
      description: `设备 ${formData.name} 的配置已更新`,
    });
    
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>编辑设备</DialogTitle>
          <DialogDescription>
            修改设备的基本信息和配置参数
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">设备名称 *</Label>
                  <Input
                    id="deviceName"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="请输入设备名称"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deviceType">设备类型</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择设备类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">设备品牌</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    placeholder="请输入设备品牌"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">设备型号</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="请输入设备型号"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">安装位置</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择安装位置" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">设备描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="请输入设备描述信息（可选）"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* 系统配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">系统配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>自动重启</Label>
                  <div className="text-sm text-muted-foreground">
                    设备异常时自动重启恢复
                  </div>
                </div>
                <Switch
                  checked={formData.autoRestart}
                  onCheckedChange={(checked) => handleInputChange('autoRestart', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>推送通知</Label>
                  <div className="text-sm text-muted-foreground">
                    设备状态变化时发送通知
                  </div>
                </div>
                <Switch
                  checked={formData.notifications}
                  onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>数据采集</Label>
                  <div className="text-sm text-muted-foreground">
                    启用设备数据自动采集
                  </div>
                </div>
                <Switch
                  checked={formData.dataCollection}
                  onCheckedChange={(checked) => handleInputChange('dataCollection', checked)}
                />
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>固件自动更新</Label>
                  <div className="text-sm text-muted-foreground">
                    自动下载并安装固件更新
                  </div>
                </div>
                <Switch
                  checked={formData.firmwareAutoUpdate}
                  onCheckedChange={(checked) => handleInputChange('firmwareAutoUpdate', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 参数设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">参数设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heartbeat">心跳间隔（秒）</Label>
                  <Input
                    id="heartbeat"
                    type="number"
                    value={formData.heartbeatInterval}
                    onChange={(e) => handleInputChange('heartbeatInterval', e.target.value)}
                    min="10"
                    max="300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="threshold">告警阈值（%）</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={formData.alertThreshold}
                    onChange={(e) => handleInputChange('alertThreshold', e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">
              保存更改
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}