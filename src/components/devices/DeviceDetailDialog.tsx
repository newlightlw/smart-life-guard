import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  Wrench,
  MapPin,
  Calendar,
  Shield,
  Activity,
  Zap,
  Thermometer
} from "lucide-react";

interface DeviceDetailDialogProps {
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

function getStatusIcon(status: string) {
  switch (status) {
    case "online":
      return <Wifi className="h-4 w-4 text-green-500" />;
    case "offline":
      return <WifiOff className="h-4 w-4 text-gray-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "maintenance":
      return <Wrench className="h-4 w-4 text-blue-500" />;
    default:
      return <WifiOff className="h-4 w-4 text-gray-500" />;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "online":
      return <Badge className="bg-green-100 text-green-800 border-green-200">在线</Badge>;
    case "offline":
      return <Badge variant="secondary">离线</Badge>;
    case "warning":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">告警</Badge>;
    case "maintenance":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">维修中</Badge>;
    default:
      return <Badge variant="secondary">未知</Badge>;
  }
}

// 模拟实时数据
const generateRealtimeData = () => ({
  temperature: (20 + Math.random() * 10).toFixed(1),
  humidity: (45 + Math.random() * 20).toFixed(1),
  power: (80 + Math.random() * 20).toFixed(1),
  signal: Math.floor(80 + Math.random() * 20),
  uptime: "72小时15分钟",
  dataUsage: "2.1GB",
});

export function DeviceDetailDialog({ open, onOpenChange, device }: DeviceDetailDialogProps) {
  const realtimeData = generateRealtimeData();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(device.status)}
            设备详细信息
          </DialogTitle>
          <DialogDescription>
            查看设备的详细配置信息和实时状态数据
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">设备名称</span>
                <span className="font-medium">{device.name}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">设备ID</span>
                <span className="font-mono text-sm">{device.id}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">设备类型</span>
                <span>{device.type}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">品牌型号</span>
                <span>{device.brand} {device.model}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">当前状态</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  {getStatusBadge(device.status)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 位置和安装信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                位置信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">安装位置</span>
                <span>{device.location}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">安装日期</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {device.installDate}
                </span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">保修截止</span>
                <span className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  {device.warranty}
                </span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">最后上线</span>
                <span>{device.lastOnline}</span>
              </div>
            </CardContent>
          </Card>

          {/* 实时状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                实时状态
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">健康度</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{device.health}%</span>
                  <div className={`w-2 h-2 rounded-full ${
                    device.health >= 90 ? 'bg-green-500' :
                    device.health >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                </div>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">信号强度</span>
                <span>{realtimeData.signal}%</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">运行时间</span>
                <span>{realtimeData.uptime}</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">数据使用量</span>
                <span>{realtimeData.dataUsage}</span>
              </div>
            </CardContent>
          </Card>

          {/* 传感器数据 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                传感器数据
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">环境温度</span>
                <span className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  {realtimeData.temperature}°C
                </span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">环境湿度</span>
                <span>{realtimeData.humidity}%</span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">电池电量</span>
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  {realtimeData.power}%
                </span>
              </div>
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">工作模式</span>
                <Badge variant="outline">自动模式</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 设备配置参数 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">配置参数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">固件版本</div>
                <div className="font-medium">v2.1.3</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">IP地址</div>
                <div className="font-mono text-sm">192.168.1.105</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">MAC地址</div>
                <div className="font-mono text-sm">AA:BB:CC:DD:EE:FF</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground">通信协议</div>
                <div className="font-medium">MQTT/TCP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}