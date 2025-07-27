import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: {
    id: string;
    name: string;
    type: string;
    location: string;
  };
}

export function QRCodeDialog({ open, onOpenChange, device }: QRCodeDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrData, setQrData] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open && device) {
      // 生成设备信息的JSON字符串作为二维码内容
      const deviceInfo = {
        id: device.id,
        name: device.name,
        type: device.type,
        location: device.location,
        timestamp: new Date().toISOString(),
        url: `${window.location.origin}/device/${device.id}` // 设备详情页面URL
      };
      
      const qrContent = JSON.stringify(deviceInfo);
      setQrData(qrContent);

      // 生成二维码到canvas
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, qrContent, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }).catch(err => {
          console.error('生成二维码失败:', err);
          toast({
            title: "生成失败",
            description: "二维码生成失败，请重试",
            variant: "destructive",
          });
        });
      }
    }
  }, [open, device, toast]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${device.id}_qrcode.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "下载成功",
        description: "二维码图片已保存到本地",
      });
    }
  };

  const handleCopyData = () => {
    navigator.clipboard.writeText(qrData).then(() => {
      toast({
        title: "复制成功",
        description: "设备信息已复制到剪贴板",
      });
    }).catch(() => {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板，请手动复制",
        variant: "destructive",
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>设备二维码</DialogTitle>
          <DialogDescription>
            扫描二维码可快速获取设备信息和访问设备详情页面
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          {/* 设备信息 */}
          <div className="w-full p-4 bg-muted rounded-lg">
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">设备ID:</span> {device.id}</div>
              <div><span className="font-medium">设备名称:</span> {device.name}</div>
              <div><span className="font-medium">设备类型:</span> {device.type}</div>
              <div><span className="font-medium">安装位置:</span> {device.location}</div>
            </div>
          </div>

          {/* 二维码 */}
          <div className="p-4 bg-white rounded-lg border">
            <canvas ref={canvasRef} />
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 w-full">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              下载二维码
            </Button>
            <Button variant="outline" onClick={handleCopyData} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              复制信息
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}