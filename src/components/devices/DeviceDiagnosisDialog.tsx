import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Thermometer,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeviceDiagnosisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: {
    id: string;
    name: string;
    type: string;
    status: string;
  };
}

interface DiagnosisItem {
  name: string;
  status: "checking" | "success" | "warning" | "error";
  description: string;
  value?: string;
  icon: React.ReactNode;
}

export function DeviceDiagnosisDialog({ open, onOpenChange, device }: DeviceDiagnosisDialogProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCheck, setCurrentCheck] = useState("");
  const [diagnosisItems, setDiagnosisItems] = useState<DiagnosisItem[]>([
    {
      name: "CPU性能",
      status: "checking",
      description: "检测处理器运行状态",
      icon: <Cpu className="h-4 w-4" />
    },
    {
      name: "内存使用",
      status: "checking", 
      description: "检测内存占用情况",
      icon: <HardDrive className="h-4 w-4" />
    },
    {
      name: "网络连接",
      status: "checking",
      description: "检测网络连接稳定性",
      icon: <Wifi className="h-4 w-4" />
    },
    {
      name: "电池状态",
      status: "checking",
      description: "检测电池健康度",
      icon: <Battery className="h-4 w-4" />
    },
    {
      name: "温度传感器",
      status: "checking",
      description: "检测温度传感器精度",
      icon: <Thermometer className="h-4 w-4" />
    }
  ]);

  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "checking":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">正常</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">警告</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">异常</Badge>;
      case "checking":
        return <Badge variant="secondary">检测中</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const runDiagnosis = async () => {
    setIsRunning(true);
    setProgress(0);
    
    const items = [...diagnosisItems];
    
    for (let i = 0; i < items.length; i++) {
      setCurrentCheck(items[i].name);
      
      // 模拟检测过程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 随机生成检测结果
      const randomResult = Math.random();
      if (randomResult > 0.8) {
        items[i].status = "error";
        items[i].value = "异常";
      } else if (randomResult > 0.6) {
        items[i].status = "warning";
        items[i].value = "需关注";
      } else {
        items[i].status = "success";
        items[i].value = "良好";
      }
      
      // 添加具体数值
      switch (items[i].name) {
        case "CPU性能":
          items[i].value = `${Math.floor(Math.random() * 30 + 10)}%`;
          break;
        case "内存使用":
          items[i].value = `${Math.floor(Math.random() * 40 + 40)}%`;
          break;
        case "网络连接":
          items[i].value = `${Math.floor(Math.random() * 20 + 80)}ms`;
          break;
        case "电池状态":
          items[i].value = `${Math.floor(Math.random() * 30 + 70)}%`;
          break;
        case "温度传感器":
          items[i].value = `${(Math.random() * 10 + 20).toFixed(1)}°C`;
          break;
      }
      
      setDiagnosisItems([...items]);
      setProgress(((i + 1) / items.length) * 100);
    }
    
    setIsRunning(false);
    setCurrentCheck("");
    
    const hasErrors = items.some(item => item.status === "error");
    const hasWarnings = items.some(item => item.status === "warning");
    
    toast({
      title: "诊断完成",
      description: hasErrors ? "发现异常问题，请及时处理" : 
                  hasWarnings ? "设备运行正常，有部分项目需要关注" : 
                  "设备运行状态良好",
      variant: hasErrors ? "destructive" : "default",
    });
  };

  useEffect(() => {
    if (open) {
      // 重置状态
      setDiagnosisItems(prev => prev.map(item => ({ ...item, status: "checking" as const, value: undefined })));
      setProgress(0);
      setIsRunning(false);
      setCurrentCheck("");
    }
  }, [open]);

  const overallHealth = diagnosisItems.filter(item => item.status === "success").length / diagnosisItems.length * 100;
  const errorCount = diagnosisItems.filter(item => item.status === "error").length;
  const warningCount = diagnosisItems.filter(item => item.status === "warning").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            设备诊断
          </DialogTitle>
          <DialogDescription>
            对 {device.name} 进行全面的健康状态检查
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 诊断概览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                诊断概览
                <Button 
                  onClick={runDiagnosis} 
                  disabled={isRunning}
                  size="sm"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      诊断中
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      开始诊断
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isRunning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>正在检测: {currentCheck}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}
              
              {!isRunning && progress > 0 && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">整体健康度</div>
                    <div className="text-2xl font-bold text-green-600">{Math.round(overallHealth)}%</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">警告项目</div>
                    <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-sm text-muted-foreground">异常项目</div>
                    <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 检测项目 */}
          <Card>
            <CardHeader>
              <CardTitle>检测项目</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {diagnosisItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.value && (
                          <span className="text-sm font-mono">{item.value}</span>
                        )}
                        {getStatusIcon(item.status)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    {index < diagnosisItems.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 建议和解决方案 */}
          {!isRunning && progress > 0 && (errorCount > 0 || warningCount > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>建议和解决方案</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {errorCount > 0 && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800">紧急问题</div>
                      <div className="text-sm text-red-700 mt-1">
                        发现 {errorCount} 个异常项目，建议立即联系技术支持进行处理。
                      </div>
                    </div>
                  )}
                  
                  {warningCount > 0 && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800">需要关注</div>
                      <div className="text-sm text-yellow-700 mt-1">
                        发现 {warningCount} 个需要关注的项目，建议定期检查和维护。
                      </div>
                    </div>
                  )}
                  
                  {errorCount === 0 && warningCount === 0 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800">运行良好</div>
                      <div className="text-sm text-green-700 mt-1">
                        设备运行状态良好，所有检测项目均正常。
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}