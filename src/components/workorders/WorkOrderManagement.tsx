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
  Plus, 
  Search, 
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";

// 模拟工单数据
const workOrders = [
  {
    id: "WO-2024-001",
    title: "智能门锁无法识别指纹",
    deviceId: "SLG-001",
    deviceName: "智能门锁-A栋101",
    location: "A栋-1层-101室",
    priority: "high",
    status: "in_progress",
    assignee: "张师傅",
    reporter: "李女士",
    reportTime: "2024-01-15 09:30",
    expectedTime: "2024-01-15 16:00",
    description: "门锁指纹识别模块出现故障，无法正常识别业主指纹",
    category: "hardware"
  },
  {
    id: "WO-2024-002",
    title: "监控摄像头画面模糊",
    deviceId: "SLG-002",
    deviceName: "监控摄像头-大堂",
    location: "A栋-1层-大堂",
    priority: "medium",
    status: "pending",
    assignee: "王师傅",
    reporter: "物业管理",
    reportTime: "2024-01-15 11:15",
    expectedTime: "2024-01-16 10:00",
    description: "大堂监控摄像头画面出现模糊，需要清洁镜头或调整焦距",
    category: "maintenance"
  },
  {
    id: "WO-2024-003",
    title: "智能空调温度控制异常",
    deviceId: "SLG-003",
    deviceName: "智能空调-会议室",
    location: "B栋-2层-会议室",
    priority: "medium",
    status: "completed",
    assignee: "陈师傅",
    reporter: "管理员",
    reportTime: "2024-01-14 14:20",
    expectedTime: "2024-01-15 09:00",
    description: "会议室空调无法准确控制温度，存在温度偏差",
    category: "software"
  },
  {
    id: "WO-2024-004",
    title: "烟雾探测器离线",
    deviceId: "SLG-004",
    deviceName: "烟雾探测器-走廊",
    location: "A栋-3层-走廊",
    priority: "high",
    status: "cancelled",
    assignee: "刘师傅",
    reporter: "系统自动",
    reportTime: "2024-01-14 18:45",
    expectedTime: "2024-01-15 08:00",
    description: "烟雾探测器设备离线，需要检查电源和网络连接",
    category: "network"
  }
];

const priorities = ["全部", "低", "中", "高", "紧急"];
const statuses = ["全部", "待派发", "进行中", "已完成", "已取消"];
const categories = ["全部", "硬件故障", "软件故障", "网络故障", "日常维护"];

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return <Badge className="bg-red-100 text-red-800 border-red-200">高</Badge>;
    case "medium":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">中</Badge>;
    case "low":
      return <Badge className="bg-green-100 text-green-800 border-green-200">低</Badge>;
    case "urgent":
      return <Badge className="bg-red-500 text-white">紧急</Badge>;
    default:
      return <Badge variant="secondary">低</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="border-blue-200 text-blue-800">待派发</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">进行中</Badge>;
    case "completed":
      return <Badge className="bg-green-100 text-green-800 border-green-200">已完成</Badge>;
    case "cancelled":
      return <Badge variant="secondary">已取消</Badge>;
    default:
      return <Badge variant="secondary">未知</Badge>;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "in_progress":
      return <User className="h-4 w-4 text-blue-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-gray-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
}

export function WorkOrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.deviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = selectedPriority === "全部" || 
      (selectedPriority === "高" && order.priority === "high") ||
      (selectedPriority === "中" && order.priority === "medium") ||
      (selectedPriority === "低" && order.priority === "low") ||
      (selectedPriority === "紧急" && order.priority === "urgent");
    
    const matchesStatus = selectedStatus === "全部" ||
      (selectedStatus === "待派发" && order.status === "pending") ||
      (selectedStatus === "进行中" && order.status === "in_progress") ||
      (selectedStatus === "已完成" && order.status === "completed") ||
      (selectedStatus === "已取消" && order.status === "cancelled");
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">工单管理</h2>
          <p className="text-muted-foreground">管理设备维修与维护工单全流程</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            紧急派单
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            创建工单
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-muted-foreground">待派发</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-xs text-muted-foreground">进行中</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-2xl font-bold">234</div>
                <div className="text-xs text-muted-foreground">本月完成</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">超时工单</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">工单筛选</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索工单标题、ID或设备..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="优先级" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
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
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="类型" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>工单列表</span>
            <Badge variant="secondary">{filteredOrders.length} 个工单</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>工单信息</TableHead>
                <TableHead>设备</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>期望完成时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{order.title}</div>
                      <div className="text-sm text-muted-foreground">{order.id}</div>
                      <div className="text-xs text-muted-foreground">
                        报修人：{order.reporter} | {order.reportTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{order.deviceName}</div>
                      <div className="text-xs text-muted-foreground">{order.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(order.priority)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.assignee}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.expectedTime}</div>
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
    </div>
  );
}