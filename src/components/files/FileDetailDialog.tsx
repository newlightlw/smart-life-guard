import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  File, 
  Folder, 
  Download, 
  Share2, 
  Star,
  Calendar,
  User,
  Shield,
  HardDrive,
  FileText,
  Image,
  Video,
  Music,
  Archive
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  fileType?: "document" | "image" | "video" | "audio" | "archive" | "other";
  size?: string;
  modifiedDate: string;
  owner: string;
  permissions: string;
  favorite: boolean;
  shared: boolean;
}

interface FileDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: FileItem | null;
}

export function FileDetailDialog({ open, onOpenChange, file }: FileDetailDialogProps) {
  if (!file) return null;

  const getFileIcon = () => {
    if (file.type === "folder") {
      return <Folder className="h-12 w-12 text-blue-500" />;
    }
    
    switch (file.fileType) {
      case "document":
        return <FileText className="h-12 w-12 text-red-500" />;
      case "image":
        return <Image className="h-12 w-12 text-green-500" />;
      case "video":
        return <Video className="h-12 w-12 text-purple-500" />;
      case "audio":
        return <Music className="h-12 w-12 text-orange-500" />;
      case "archive":
        return <Archive className="h-12 w-12 text-yellow-500" />;
      default:
        return <File className="h-12 w-12 text-gray-500" />;
    }
  };

  const getFileTypeText = () => {
    if (file.type === "folder") return "文件夹";
    
    switch (file.fileType) {
      case "document": return "文档文件";
      case "image": return "图片文件";
      case "video": return "视频文件";
      case "audio": return "音频文件";
      case "archive": return "压缩文件";
      default: return "其他文件";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>文件详情</DialogTitle>
          <DialogDescription>
            查看 {file.name} 的详细信息
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Icon and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {getFileIcon()}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{file.name}</h3>
                {file.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              </div>
              <p className="text-sm text-muted-foreground">{getFileTypeText()}</p>
              <div className="flex gap-2">
                {file.shared && (
                  <Badge variant="outline">
                    <Share2 className="h-3 w-3 mr-1" />
                    已分享
                  </Badge>
                )}
                <Badge variant={file.permissions === "管理员" ? "default" : "secondary"}>
                  <Shield className="h-3 w-3 mr-1" />
                  {file.permissions}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* File Properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">基本信息</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">大小: {file.size || "计算中..."}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">修改时间: {file.modifiedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">所有者: {file.owner}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">访问权限</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>当前权限</span>
                    <Badge variant={file.permissions === "管理员" ? "default" : "secondary"}>
                      {file.permissions}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>分享状态</span>
                    <Badge variant={file.shared ? "default" : "outline"}>
                      {file.shared ? "已分享" : "私有"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* File Preview */}
          {file.type === "file" && file.fileType === "image" && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">预览</Label>
              <div className="mt-2 border rounded-lg p-4 bg-muted/30">
                <div className="aspect-video bg-muted rounded flex items-center justify-center">
                  <Image className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">图片预览</span>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div>
            <Label className="text-sm font-medium text-muted-foreground">最近活动</Label>
            <div className="mt-2 space-y-2">
              <div className="text-sm p-2 bg-muted/30 rounded">
                <span className="font-medium">{file.owner}</span> 在 {file.modifiedDate} 修改了此文件
              </div>
              <div className="text-sm p-2 bg-muted/30 rounded">
                <span className="font-medium">系统</span> 在 {file.modifiedDate} 创建了此文件
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          {file.type === "file" && (
            <Button>
              <Download className="h-4 w-4 mr-2" />
              下载
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}