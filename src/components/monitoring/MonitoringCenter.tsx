import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Activity,
  Thermometer,
  Droplets,
  Zap,
  Wifi,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Maximize2,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

// 模拟实时数据
const realtimeData = {
  temperature: 24.5,
  humidity: 68,
  pm25: 15,
  powerConsumption: 145.6,
  networkLatency: 12,
  systemLoad: 67
};

const deviceStatusData = [
  { zone: "A栋", total: 125, online: 118, offline: 4, warning: 3 },
  { zone: "B栋", total: 98, online: 92, offline: 3, warning: 3 },
  { zone: "C栋", total: 156, online: 148, offline: 5, warning: 3 },
  { zone: "地下车库", total: 45, online: 42, offline: 2, warning: 1 },
  { zone: "公共区域", total: 67, online: 65, offline: 1, warning: 1 }
];

const energyData = [
  { time: "00:00", power: 120 },
  { time: "04:00", power: 95 },
  { time: "08:00", power: 180 },
  { time: "12:00", power: 220 },
  { time: "16:00", power: 195 },
  { time: "20:00", power: 165 },
  { time: "24:00", power: 145 }
];

const criticalDevices = [
  { id: "SLG-001", name: "主入口门禁", status: "warning", lastUpdate: "2分钟前" },
  { id: "SLG-035", name: "消防泵", status: "online", lastUpdate: "刚刚" },
  { id: "SLG-078", name: "电梯A1", status: "maintenance", lastUpdate: "10分钟前" },
  { id: "SLG-112", name: "备用发电机", status: "online", lastUpdate: "5分钟前" }
];

export function MonitoringCenter() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">监控中心</h2>
          <p className="text-muted-foreground">实时监控社区设备运行状态与环境参数</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">近1小时</SelectItem>
              <SelectItem value="24h">近24小时</SelectItem>
              <SelectItem value="7d">近7天</SelectItem>
              <SelectItem value="30d">近30天</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            自动刷新
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            全屏
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-blue-700">环境温度</div>
                <div className="text-2xl font-bold text-blue-800">{realtimeData.temperature}°C</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-600" />
              <div>
                <div className="text-sm text-cyan-700">湿度</div>
                <div className="text-2xl font-bold text-cyan-800">{realtimeData.humidity}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm text-green-700">PM2.5</div>
                <div className="text-2xl font-bold text-green-800">{realtimeData.pm25} μg/m³</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm text-orange-700">功耗</div>
                <div className="text-2xl font-bold text-orange-800">{realtimeData.powerConsumption}kW</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-sm text-purple-700">网络延迟</div>
                <div className="text-2xl font-bold text-purple-800">{realtimeData.networkLatency}ms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-pink-600" />
              <div>
                <div className="text-sm text-pink-700">系统负载</div>
                <div className="text-2xl font-bold text-pink-800">{realtimeData.systemLoad}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">设备状态</TabsTrigger>
          <TabsTrigger value="energy">能耗分析</TabsTrigger>
          <TabsTrigger value="critical">关键设备</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分区设备状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceStatusData.map((zone) => (
                  <div key={zone.zone} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{zone.zone}</h4>
                      <div className="flex gap-2 text-sm">
                        <span className="text-green-600">在线 {zone.online}</span>
                        <span className="text-gray-500">离线 {zone.offline}</span>
                        <span className="text-yellow-600">告警 {zone.warning}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-green-200 h-2 rounded" style={{width: `${zone.online/zone.total*100}%`}} />
                      <div className="bg-gray-200 h-2 rounded" style={{width: `${zone.offline/zone.total*100}%`}} />
                      <div className="bg-yellow-200 h-2 rounded" style={{width: `${zone.warning/zone.total*100}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>24小时能耗趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-4 px-4">
                {energyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="bg-primary rounded-t w-full min-h-[20px]"
                      style={{height: `${data.power / 250 * 200}px`}}
                    />
                    <div className="text-xs text-muted-foreground">{data.time}</div>
                    <div className="text-xs font-medium">{data.power}kW</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>关键设备监控</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {device.status === "online" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {device.status === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {device.status === "maintenance" && <Clock className="h-5 w-5 text-blue-500" />}
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">{device.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">最后更新</div>
                      <div className="text-sm font-medium">{device.lastUpdate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}