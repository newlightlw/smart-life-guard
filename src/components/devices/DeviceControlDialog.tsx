import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Power, 
  PowerOff, 
  RotateCcw, 
  Settings, 
  Wifi,
  Volume2,
  Sun,
  Thermometer,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeviceControlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: {
    id: string;
    name: string;
    type: string;
    status: string;
  };
}

export function DeviceControlDialog({ open, onOpenChange, device }: DeviceControlDialogProps) {
  const [isOnline, setIsOnline] = useState(device.status === "online");
  const [brightness, setBrightness] = useState([75]);
  const [volume, setVolume] = useState([60]);
  const [temperature, setTemperature] = useState([24]);
  const [autoMode, setAutoMode] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [energySaving, setEnergySaving] = useState(false);
  
  const { toast } = useToast();

  const handlePowerToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    toast({
      title: newStatus ? "设备已启动" : "设备已关闭",
      description: `${device.name} 已${newStatus ? "成功启动" : "安全关闭"}`,
    });
  };

  const handleRestart = () => {
    toast({
      title: "重启命令已发送",
      description: `正在重启 ${device.name}，预计需要30秒...`,
    });
  };

  const handleFactoryReset = () => {
    toast({
      title: "恢复出厂设置",
      description: `${device.name} 已恢复到出厂设置`,
      variant: "destructive",
    });
  };

  const getDeviceTypeControls = () => {
    switch (device.type) {
      case "智能空调":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                温度控制
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>目标温度: {temperature[0]}°C</Label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  max={30}
                  min={16}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>自动模式</Label>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>节能模式</Label>
                <Switch checked={energySaving} onCheckedChange={setEnergySaving} />
              </div>
            </CardContent>
          </Card>
        );
        
      case "监控摄像头":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                图像设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>亮度: {brightness[0]}%</Label>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>夜视模式</Label>
                <Switch checked={nightMode} onCheckedChange={setNightMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>移动检测</Label>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </CardContent>
          </Card>
        );
        
      case "智能门锁":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                门锁设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>音量: {volume[0]}%</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>自动上锁</Label>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>访客模式</Label>
                <Switch checked={nightMode} onCheckedChange={setNightMode} />
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>设备控制</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label>智能模式</Label>
                <Switch checked={autoMode} onCheckedChange={setAutoMode} />
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            设备控制
          </DialogTitle>
          <DialogDescription>
            远程控制 {device.name} 的运行状态和参数
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 设备状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                设备状态
                <Badge variant={isOnline ? "default" : "secondary"}>
                  {isOnline ? "在线" : "离线"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">设备名称</span>
                <span className="text-sm">{device.name}</span>
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">设备类型</span>
                <span className="text-sm">{device.type}</span>
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">连接状态</span>
                <div className="flex items-center gap-1">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm">信号良好</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 电源控制 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                电源控制
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handlePowerToggle} 
                className="w-full"
                variant={isOnline ? "destructive" : "default"}
              >
                {isOnline ? (
                  <>
                    <PowerOff className="h-4 w-4 mr-2" />
                    关闭设备
                  </>
                ) : (
                  <>
                    <Power className="h-4 w-4 mr-2" />
                    启动设备
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleRestart} 
                variant="outline" 
                className="w-full"
                disabled={!isOnline}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重启设备
              </Button>
              
              <Button 
                onClick={handleFactoryReset} 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive"
                disabled={!isOnline}
              >
                恢复出厂设置
              </Button>
            </CardContent>
          </Card>

          {/* 设备特定控制 */}
          {getDeviceTypeControls()}
        </div>
      </DialogContent>
    </Dialog>
  );
}