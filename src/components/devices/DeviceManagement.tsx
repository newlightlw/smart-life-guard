import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddDeviceDialog } from "./AddDeviceDialog";
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
  Filter, 
  Download,
  MoreHorizontal,
  Wifi,
  WifiOff,
  AlertTriangle,
  Wrench,
  QrCode
} from "lucide-react";

// 模拟设备数据
const devices = [
  {
    id: "SLG-001",
    name: "智能门锁-A栋101",
    type: "智能门锁",
    brand: "海康威视",
    model: "DS-K1T341AMF",
    location: "A栋-1层-101室",
    status: "online",
    health: 95,
    lastOnline: "2024-01-15 14:30",
    installDate: "2023-08-15",
    warranty: "2025-08-15"
  },
  {
    id: "SLG-002", 
    name: "监控摄像头-大堂",
    type: "监控摄像头",
    brand: "大华",
    model: "DH-IPC-HFW2431T",
    location: "A栋-1层-大堂",
    status: "online",
    health: 92,
    lastOnline: "2024-01-15 14:29",
    installDate: "2023-06-20",
    warranty: "2025-06-20"
  },
  {
    id: "SLG-003",
    name: "智能空调-会议室",
    type: "智能空调",
    brand: "格力",
    model: "GMV-H120WL/A",
    location: "B栋-2层-会议室",
    status: "warning",
    health: 78,
    lastOnline: "2024-01-15 14:28",
    installDate: "2023-05-10",
    warranty: "2026-05-10"
  },
  {
    id: "SLG-004",
    name: "烟雾探测器-走廊",
    type: "烟雾探测器",
    brand: "松下",
    model: "FP7725",
    location: "A栋-3层-走廊",
    status: "offline",
    health: 0,
    lastOnline: "2024-01-14 18:45",
    installDate: "2023-04-15",
    warranty: "2028-04-15"
  }
];

const deviceTypes = ["全部", "智能门锁", "监控摄像头", "智能空调", "烟雾探测器", "智能水表", "充电桩"];
const statusTypes = ["全部", "在线", "离线", "告警", "维修中"];

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

function getStatusText(status: string) {
  switch (status) {
    case "online": return "在线";
    case "offline": return "离线";
    case "warning": return "告警";
    case "maintenance": return "维修中";
    default: return "未知";
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

export function DeviceManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("全部");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "全部" || device.type === selectedType;
    const matchesStatus = selectedStatus === "全部" || getStatusText(device.status) === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">设备管理</h2>
          <p className="text-muted-foreground">管理社区内所有智能设备的全生命周期</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            const csvData = [
              ["设备ID", "设备名称", "设备类型", "位置", "状态", "最后上报时间"],
              ...filteredDevices.map(device => [
                device.id, device.name, device.type, device.location,
                device.status === "online" ? "在线" : device.status === "offline" ? "离线" :
                device.status === "warning" ? "告警" : "维护", device.lastOnline
              ])
            ];
            const csvContent = csvData.map(row => row.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `设备列表_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            添加设备
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">设备筛选</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索设备名称、ID或位置..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="设备类型" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                {statusTypes.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
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

      {/* Device Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>设备列表</span>
            <Badge variant="secondary">{filteredDevices.length} 台设备</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>设备信息</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>健康度</TableHead>
                <TableHead>最后在线</TableHead>
                <TableHead>保修期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">{device.id}</div>
                      <div className="text-xs text-muted-foreground">
                        {device.brand} {device.model}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{device.location}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      {getStatusBadge(device.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{device.health}%</div>
                      <div className={`w-2 h-2 rounded-full ${
                        device.health >= 90 ? 'bg-green-500' :
                        device.health >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {device.lastOnline}
                  </TableCell>
                  <TableCell className="text-sm">
                    {device.warranty}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddDeviceDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog} 
      />
    </div>
  );
}