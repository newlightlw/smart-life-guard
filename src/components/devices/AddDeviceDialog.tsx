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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AddDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDeviceDialog({ open, onOpenChange }: AddDeviceDialogProps) {
  const { toast } = useToast();
  const [installDate, setInstallDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    model: "",
    serialNumber: "",
    location: "",
    installer: "",
    supplier: "",
    warrantyMonths: "",
    description: ""
  });

  const deviceTypes = [
    "智能门锁", "监控摄像头", "智能空调", "烟雾探测器", 
    "智能音箱", "智能灯具", "智能开关", "环境传感器"
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.location) {
      toast({
        title: "表单验证失败",
        description: "请填写必填字段：设备名称、设备类型、安装位置",
        variant: "destructive"
      });
      return;
    }

    // 生成设备ID
    const deviceId = `DEV-${Date.now().toString().slice(-8)}`;
    
    console.log("新增设备:", {
      id: deviceId,
      ...formData,
      installDate: installDate?.toISOString(),
      status: "online",
      createdAt: new Date().toISOString()
    });

    toast({
      title: "设备添加成功",
      description: `设备 ${formData.name} (${deviceId}) 已成功添加到系统`,
    });

    // 重置表单
    setFormData({
      name: "", type: "", brand: "", model: "", serialNumber: "",
      location: "", installer: "", supplier: "", warrantyMonths: "", description: ""
    });
    setInstallDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>添加新设备</DialogTitle>
          <DialogDescription>
            录入新设备的基本信息，系统将自动生成设备ID和二维码
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              设备名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="如：智能门锁-A栋101"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">
              设备类型 <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
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

          <div className="space-y-2">
            <Label htmlFor="brand">品牌</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              placeholder="如：小米、海康威视"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">型号</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              placeholder="设备型号"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serial">序列号</Label>
            <Input
              id="serial"
              value={formData.serialNumber}
              onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
              placeholder="设备序列号"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              安装位置 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="如：A栋-1层-101室"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="installer">安装人员</Label>
            <Input
              id="installer"
              value={formData.installer}
              onChange={(e) => setFormData({...formData, installer: e.target.value})}
              placeholder="安装人员姓名"
            />
          </div>

          <div className="space-y-2">
            <Label>安装日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {installDate ? format(installDate, "yyyy-MM-dd") : "选择日期"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={installDate}
                  onSelect={setInstallDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">供应商</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
              placeholder="供应商名称"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">保修期(月)</Label>
            <Input
              id="warranty"
              type="number"
              value={formData.warrantyMonths}
              onChange={(e) => setFormData({...formData, warrantyMonths: e.target.value})}
              placeholder="保修月数"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">设备描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="设备的详细描述和备注信息"
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            添加设备
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}