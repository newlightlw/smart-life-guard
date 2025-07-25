import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield
} from "lucide-react";

const metrics = [
  {
    title: "设备总数",
    value: "1,524",
    change: "+12",
    changeType: "increase" as const,
    icon: Smartphone,
    description: "本月新增",
    color: "bg-blue-500"
  },
  {
    title: "在线设备",
    value: "1,247",
    change: "81.8%",
    changeType: "neutral" as const,
    icon: CheckCircle,
    description: "在线率",
    color: "bg-green-500"
  },
  {
    title: "活跃告警",
    value: "23",
    change: "-5",
    changeType: "decrease" as const,
    icon: AlertTriangle,
    description: "较昨日",
    color: "bg-red-500"
  },
  {
    title: "待处理工单",
    value: "156",
    change: "+8",
    changeType: "increase" as const,
    icon: Clock,
    description: "今日新增",
    color: "bg-yellow-500"
  }
];

const healthMetrics = [
  { label: "智能门锁", total: 248, online: 235, health: 95 },
  { label: "监控摄像头", total: 156, online: 142, health: 91 },
  { label: "智能空调", total: 89, online: 82, health: 92 },
  { label: "烟雾探测器", total: 324, online: 320, health: 99 },
  { label: "智能水表", total: 445, online: 398, health: 89 },
  { label: "充电桩", total: 28, online: 25, health: 89 }
];

export function MetricsOverview() {
  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="dashboard-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          
          return (
            <Card key={metric.title} className="metric-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  {metric.changeType === "increase" && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                  {metric.changeType === "decrease" && (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={
                    metric.changeType === "increase" ? "text-green-500" :
                    metric.changeType === "decrease" ? "text-red-500" :
                    "text-muted-foreground"
                  }>
                    {metric.change}
                  </span>
                  <span>{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Device Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              设备健康状态
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthMetrics.map((device) => (
              <div key={device.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{device.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {device.online}/{device.total}
                    </span>
                    <Badge 
                      variant={device.health >= 95 ? "default" : device.health >= 90 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {device.health}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={device.health} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              今日关键指标
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">98.2%</div>
                <div className="text-xs text-muted-foreground">系统可用性</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">4.2min</div>
                <div className="text-xs text-muted-foreground">平均响应时间</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">87%</div>
                <div className="text-xs text-muted-foreground">故障预测准确率</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-xs text-muted-foreground">预防性维护</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}