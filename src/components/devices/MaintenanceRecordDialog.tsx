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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  FileText,
  Plus,
  Wrench,
  User,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: {
    id: string;
    name: string;
    type: string;
  };
}

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  status: string;
  description: string;
  technician: string;
  duration: string;
  cost: string;
  parts?: string[];
}

const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: "MR-001",
    date: "2024-01-10",
    type: "定期维护",
    status: "completed",
    description: "更换电池，清理传感器，检查连接线路",
    technician: "张工程师",
    duration: "2小时",
    cost: "￥150",
    parts: ["电池", "清洁套件"]
  },
  {
    id: "MR-002",
    date: "2023-12-15",
    type: "故障维修",
    status: "completed",
    description: "修复网络连接问题，更新固件版本",
    technician: "李技师",
    duration: "1.5小时",
    cost: "￥200",
    parts: ["网络模块"]
  },
  {
    id: "MR-003",
    date: "2023-11-20",
    type: "预防性维护",
    status: "completed",
    description: "系统健康检查，数据备份，性能优化",
    technician: "王工程师",
    duration: "1小时",
    cost: "￥100"
  }
];

export function MaintenanceRecordDialog({ open, onOpenChange, device }: MaintenanceRecordDialogProps) {
  const [activeTab, setActiveTab] = useState("records");
  const [newRecord, setNewRecord] = useState({
    type: "",
    description: "",
    technician: "",
    estimatedDuration: "",
    estimatedCost: "",
    scheduledDate: "",
  });

  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">已完成</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">已安排</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">进行中</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.type || !newRecord.description || !newRecord.technician) {
      toast({
        title: "表单验证错误",
        description: "请填写所有必填字段",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "维护记录已添加",
      description: `已为设备 ${device.name} 添加新的维护记录`,
    });

    // 重置表单
    setNewRecord({
      type: "",
      description: "",
      technician: "",
      estimatedDuration: "",
      estimatedCost: "",
      scheduledDate: "",
    });
    
    setActiveTab("records");
  };

  const maintenanceTypes = ["定期维护", "故障维修", "预防性维护", "固件升级", "零部件更换"];
  const technicians = ["张工程师", "李技师", "王工程师", "赵师傅", "刘技术员"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            维护记录
          </DialogTitle>
          <DialogDescription>
            查看和管理 {device.name} 的维护历史记录
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">维护历史</TabsTrigger>
            <TabsTrigger value="add">添加记录</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            {/* 统计信息 */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{maintenanceRecords.length}</div>
                  <div className="text-sm text-muted-foreground">总维护次数</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ￥{maintenanceRecords.reduce((sum, record) => sum + parseInt(record.cost.replace('￥', '')), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">总维护成本</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">2024-02-15</div>
                  <div className="text-sm text-muted-foreground">下次维护</div>
                </CardContent>
              </Card>
            </div>

            {/* 维护记录列表 */}
            <Card>
              <CardHeader>
                <CardTitle>维护历史记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Wrench className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{record.type}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {record.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {record.technician}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {record.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{record.cost}</span>
                          {getStatusBadge(record.status)}
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        {record.description}
                      </div>
                      
                      {record.parts && record.parts.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">更换部件:</span>
                          {record.parts.map((part, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {part}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  添加维护记录
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceType">维护类型 *</Label>
                    <Select value={newRecord.type} onValueChange={(value) => setNewRecord(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择维护类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {maintenanceTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="technician">负责技师 *</Label>
                    <Select value={newRecord.technician} onValueChange={(value) => setNewRecord(prev => ({ ...prev, technician: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择负责技师" />
                      </SelectTrigger>
                      <SelectContent>
                        {technicians.map(tech => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">计划日期</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={newRecord.scheduledDate}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">预计耗时</Label>
                    <Input
                      id="estimatedDuration"
                      placeholder="如：2小时"
                      value={newRecord.estimatedDuration}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">预计费用</Label>
                  <Input
                    id="estimatedCost"
                    placeholder="如：￥200"
                    value={newRecord.estimatedCost}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, estimatedCost: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">维护内容 *</Label>
                  <Textarea
                    id="description"
                    placeholder="请详细描述维护内容和步骤..."
                    value={newRecord.description}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddRecord} className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    添加记录
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("records")}>
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}