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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface CreateWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEmergency?: boolean;
}

export function CreateWorkOrderDialog({ open, onOpenChange, isEmergency = false }: CreateWorkOrderDialogProps) {
  const { toast } = useToast();
  const [expectedDate, setExpectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    deviceId: "",
    deviceName: "",
    location: "",
    priority: isEmergency ? "urgent" : "medium",
    assignee: "",
    reporter: "",
    reporterPhone: "",
    category: "",
    description: ""
  });

  const priorities = [
    { value: "low", label: "低", color: "text-green-600" },
    { value: "medium", label: "中", color: "text-yellow-600" },
    { value: "high", label: "高", color: "text-orange-600" },
    { value: "urgent", label: "紧急", color: "text-red-600" }
  ];

  const categories = [
    "硬件故障", "软件故障", "网络故障", "日常维护", "定期保养", "设备更换"
  ];

  const technicians = [
    "张师傅", "王师傅", "李师傅", "陈师傅", "刘师傅", "赵师傅"
  ];

  const handleSubmit = () => {
    if (!formData.title || !formData.deviceName || !formData.description) {
      toast({
        title: "表单验证失败",
        description: "请填写必填字段：工单标题、设备名称、故障描述",
        variant: "destructive"
      });
      return;
    }

    // 生成工单ID
    const workOrderId = `WO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    
    const workOrder = {
      id: workOrderId,
      ...formData,
      expectedTime: expectedDate?.toISOString(),
      reportTime: new Date().toISOString(),
      status: "pending",
      createdAt: new Date().toISOString()
    };

    console.log("创建工单:", workOrder);

    toast({
      title: isEmergency ? "紧急工单创建成功" : "工单创建成功",
      description: `工单 ${workOrderId} 已创建${formData.assignee ? `，已派发给${formData.assignee}` : "，等待派发"}`,
    });

    // 重置表单
    setFormData({
      title: "", deviceId: "", deviceName: "", location: "",
      priority: isEmergency ? "urgent" : "medium", assignee: "",
      reporter: "", reporterPhone: "", category: "", description: ""
    });
    setExpectedDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEmergency && <span className="text-red-500">🚨</span>}
            {isEmergency ? "创建紧急工单" : "创建工单"}
          </DialogTitle>
          <DialogDescription>
            {isEmergency ? "紧急工单将优先处理，请确保信息准确" : "填写工单详细信息，系统将自动分配工单号"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="title">
              工单标题 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="简要描述故障问题"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-id">设备ID</Label>
            <Input
              id="device-id"
              value={formData.deviceId}
              onChange={(e) => setFormData({...formData, deviceId: e.target.value})}
              placeholder="如：SLG-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-name">
              设备名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="device-name"
              value={formData.deviceName}
              onChange={(e) => setFormData({...formData, deviceName: e.target.value})}
              placeholder="故障设备名称"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="location">位置</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="设备所在位置"
            />
          </div>

          <div className="space-y-2">
            <Label>
              优先级 {isEmergency && <span className="text-red-500">(紧急)</span>}
            </Label>
            <Select 
              value={formData.priority} 
              onValueChange={(value) => setFormData({...formData, priority: value})}
              disabled={isEmergency}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <span className={priority.color}>{priority.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>故障类型</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="选择故障类型" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reporter">报修人</Label>
            <Input
              id="reporter"
              value={formData.reporter}
              onChange={(e) => setFormData({...formData, reporter: e.target.value})}
              placeholder="报修人姓名"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">联系电话</Label>
            <Input
              id="phone"
              value={formData.reporterPhone}
              onChange={(e) => setFormData({...formData, reporterPhone: e.target.value})}
              placeholder="报修人联系方式"
            />
          </div>

          <div className="space-y-2">
            <Label>指派技术员</Label>
            <Select value={formData.assignee} onValueChange={(value) => setFormData({...formData, assignee: value})}>
              <SelectTrigger>
                <SelectValue placeholder="选择技术员（可稍后指派）" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map(tech => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>期望完成时间</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expectedDate ? format(expectedDate, "yyyy-MM-dd") : "选择日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expectedDate}
                  onSelect={setExpectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">
              故障描述 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="详细描述故障现象、发生时间、影响范围等"
              className="resize-none"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} className={isEmergency ? "bg-red-600 hover:bg-red-700" : ""}>
            {isEmergency ? "创建紧急工单" : "创建工单"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}