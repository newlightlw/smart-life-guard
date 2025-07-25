import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  AlertTriangle,
  AlertCircle,
  XCircle,
  CheckCircle,
  Search,
  Filter,
  Bell,
  Settings,
  Eye,
  Clock,
  User,
  MapPin,
  TrendingUp
} from "lucide-react";

// 模拟告警数据
const alerts = [
  {
    id: "ALT-2024-001",
    title: "智能门锁通信中断",
    level: "critical",
    status: "active",
    deviceId: "SLG-001",
    deviceName: "智能门锁-A栋101",
    location: "A栋-1层-101室",
    category: "network",
    description: "设备与服务器通信中断超过5分钟",
    triggerTime: "2024-01-15 14:30:25",
    lastUpdate: "2024-01-15 14:35:12",
    assignee: "张师傅",
    affectedUsers: 1
  },
  {
    id: "ALT-2024-002",
    title: "监控摄像头存储空间不足",
    level: "warning",
    status: "acknowledged",
    deviceId: "SLG-002",
    deviceName: "监控摄像头-大堂",
    location: "A栋-1层-大堂",
    category: "storage",
    description: "存储空间使用率超过85%",
    triggerTime: "2024-01-15 12:15:30",
    lastUpdate: "2024-01-15 12:20:15",
    assignee: "王师傅",
    affectedUsers: 0
  },
  {
    id: "ALT-2024-003",
    title: "空调系统温度异常",
    level: "warning",
    status: "resolved",
    deviceId: "SLG-003",
    deviceName: "智能空调-会议室",
    location: "B栋-2层-会议室",
    category: "environment",
    description: "室内温度超出设定范围2度以上",
    triggerTime: "2024-01-15 10:45:20",
    lastUpdate: "2024-01-15 11:30:45",
    assignee: "陈师傅",
    affectedUsers: 8
  },
  {
    id: "ALT-2024-004",
    title: "烟雾探测器电池电量低",
    level: "info",
    status: "active",
    deviceId: "SLG-004",
    deviceName: "烟雾探测器-走廊",
    location: "A栋-3层-走廊",
    category: "power",
    description: "设备电池电量低于20%",
    triggerTime: "2024-01-15 09:30:15",
    lastUpdate: "2024-01-15 09:30:15",
    assignee: "刘师傅",
    affectedUsers: 12
  }
];

const alertStats = {
  total: 156,
  critical: 5,
  warning: 23,
  info: 128,
  active: 28,
  acknowledged: 45,
  resolved: 83
};

const levels = ["全部", "严重", "警告", "信息"];
const statuses = ["全部", "活跃", "已确认", "已解决"];
const categories = ["全部", "网络", "硬件", "环境", "电源", "存储"];

function getLevelBadge(level: string) {
  switch (level) {
    case "critical":
      return <Badge className="bg-red-500 text-white">严重</Badge>;
    case "warning":
      return <Badge className="bg-yellow-500 text-white">警告</Badge>;
    case "info":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">信息</Badge>;
    default:
      return <Badge variant="secondary">未知</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge className="bg-red-100 text-red-800 border-red-200">活跃</Badge>;
    case "acknowledged":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">已确认</Badge>;
    case "resolved":
      return <Badge className="bg-green-100 text-green-800 border-green-200">已解决</Badge>;
    default:
      return <Badge variant="secondary">未知</Badge>;
  }
}

function getLevelIcon(level: string) {
  switch (level) {
    case "critical":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "info":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
}

export function AlertCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === "全部" ||
      (selectedLevel === "严重" && alert.level === "critical") ||
      (selectedLevel === "警告" && alert.level === "warning") ||
      (selectedLevel === "信息" && alert.level === "info");
    
    const matchesStatus = selectedStatus === "全部" ||
      (selectedStatus === "活跃" && alert.status === "active") ||
      (selectedStatus === "已确认" && alert.status === "acknowledged") ||
      (selectedStatus === "已解决" && alert.status === "resolved");
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">告警中心</h2>
          <p className="text-muted-foreground">智能设备告警监控与处理中心</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            告警规则
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            通知设置
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-800">{alertStats.total}</div>
            <div className="text-sm text-blue-700">总告警数</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-800">{alertStats.critical}</div>
            <div className="text-sm text-red-700">严重</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-800">{alertStats.warning}</div>
            <div className="text-sm text-yellow-700">警告</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-800">{alertStats.info}</div>
            <div className="text-sm text-green-700">信息</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-800">{alertStats.active}</div>
            <div className="text-sm text-orange-700">活跃</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-800">{alertStats.acknowledged}</div>
            <div className="text-sm text-purple-700">已确认</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-800">{alertStats.resolved}</div>
            <div className="text-sm text-teal-700">已解决</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">告警列表</TabsTrigger>
          <TabsTrigger value="rules">告警规则</TabsTrigger>
          <TabsTrigger value="analytics">趋势分析</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">告警筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索告警标题、设备或ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="级别" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  高级筛选
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>告警列表</span>
                <Badge variant="secondary">{filteredAlerts.length} 条告警</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>告警信息</TableHead>
                    <TableHead>设备位置</TableHead>
                    <TableHead>级别</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>负责人</TableHead>
                    <TableHead>触发时间</TableHead>
                    <TableHead>影响用户</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getLevelIcon(alert.level)}
                            <span className="font-medium">{alert.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{alert.id}</div>
                          <div className="text-xs text-muted-foreground">{alert.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{alert.deviceName}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getLevelBadge(alert.level)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(alert.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3" />
                          {alert.assignee}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {alert.triggerTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{alert.affectedUsers} 人</div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>告警规则配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">告警规则管理</h3>
                <p className="text-sm text-muted-foreground mt-2">配置设备告警触发条件和通知策略</p>
                <Button className="mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  配置规则
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                告警趋势分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">趋势分析报告</h3>
                <p className="text-sm text-muted-foreground mt-2">基于历史数据的告警趋势分析和预测</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}