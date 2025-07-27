import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Share2, 
  Copy, 
  Mail, 
  Link, 
  User,
  Users,
  Globe,
  Shield,
  Calendar,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface ShareFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: FileItem | null;
}

export function ShareFileDialog({ open, onOpenChange, file }: ShareFileDialogProps) {
  const { toast } = useToast();
  const [shareType, setShareType] = useState<"private" | "internal" | "public">("private");
  const [permission, setPermission] = useState("view");
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sharedUsers] = useState([
    { id: "1", name: "张三", email: "zhangsan@example.com", permission: "edit" },
    { id: "2", name: "李四", email: "lisi@example.com", permission: "view" },
  ]);

  if (!file) return null;

  const shareLink = `https://smartlife.com/share/${file.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "分享链接已复制",
      description: "分享链接已复制到剪贴板",
    });
  };

  const handleSendEmail = () => {
    if (!email.trim()) {
      toast({
        title: "请输入邮箱地址",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "邮件发送成功",
      description: `分享邮件已发送到 ${email}`,
    });
    setEmail("");
  };

  const handleShare = () => {
    toast({
      title: "分享设置已更新",
      description: `${file.name} 的分享设置已保存`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            分享文件
          </DialogTitle>
          <DialogDescription>
            分享 "{file.name}" 给其他用户
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Type */}
          <div className="space-y-3">
            <Label>分享范围</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div 
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  shareType === "private" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setShareType("private")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">私有分享</span>
                </div>
                <p className="text-xs text-muted-foreground">仅指定用户可访问</p>
              </div>
              
              <div 
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  shareType === "internal" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setShareType("internal")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">内部分享</span>
                </div>
                <p className="text-xs text-muted-foreground">组织内用户可访问</p>
              </div>
              
              <div 
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  shareType === "public" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setShareType("public")}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">公开分享</span>
                </div>
                <p className="text-xs text-muted-foreground">任何人都可访问</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Share Link */}
          <div className="space-y-3">
            <Label>分享链接</Label>
            <div className="flex gap-2">
              <Input 
                value={shareLink} 
                readOnly 
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                复制
              </Button>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-3">
            <Label>访问权限</Label>
            <Select value={permission} onValueChange={setPermission}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">仅查看</SelectItem>
                <SelectItem value="comment">查看和评论</SelectItem>
                <SelectItem value="edit">编辑</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <Label>高级设置</Label>
            
            {/* Expiry Date */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">设置过期时间</span>
                </div>
                <p className="text-xs text-muted-foreground">链接将在指定时间后失效</p>
              </div>
              <Switch 
                checked={expiryEnabled} 
                onCheckedChange={setExpiryEnabled}
              />
            </div>
            
            {expiryEnabled && (
              <Input
                type="datetime-local"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="ml-6"
              />
            )}

            {/* Password Protection */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">密码保护</span>
                </div>
                <p className="text-xs text-muted-foreground">需要密码才能访问</p>
              </div>
              <Switch 
                checked={passwordEnabled} 
                onCheckedChange={setPasswordEnabled}
              />
            </div>
            
            {passwordEnabled && (
              <Input
                type="password"
                placeholder="设置访问密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-6"
              />
            )}
          </div>

          <Separator />

          {/* Email Sharing */}
          <div className="space-y-3">
            <Label>邮件分享</Label>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                placeholder="添加分享消息（可选）"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSendEmail} className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                发送邮件
              </Button>
            </div>
          </div>

          {/* Current Shares */}
          {sharedUsers.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label>已分享用户</Label>
                <div className="space-y-2">
                  {sharedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{user.permission === "edit" ? "编辑" : "查看"}</Badge>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleShare}>
            保存分享设置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}