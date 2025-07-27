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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFolderDialog({ open, onOpenChange }: CreateFolderDialogProps) {
  const { toast } = useToast();
  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState("view");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setIsSubmitting(true);

    // 模拟创建文件夹
    setTimeout(() => {
      toast({
        title: "文件夹创建成功",
        description: `文件夹 "${folderName}" 已创建`,
      });
      
      handleReset();
      onOpenChange(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setFolderName("");
    setDescription("");
    setPermissions("view");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            新建文件夹
          </DialogTitle>
          <DialogDescription>
            创建一个新的文件夹来组织您的文件
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Folder Name */}
          <div className="space-y-2">
            <Label htmlFor="folderName">文件夹名称 *</Label>
            <Input
              id="folderName"
              placeholder="输入文件夹名称"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">描述（可选）</Label>
            <Textarea
              id="description"
              placeholder="为这个文件夹添加描述..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <Label htmlFor="permissions">默认权限</Label>
            <Select value={permissions} onValueChange={setPermissions}>
              <SelectTrigger>
                <SelectValue placeholder="选择默认权限" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">仅查看</SelectItem>
                <SelectItem value="edit">编辑</SelectItem>
                <SelectItem value="admin">管理员</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={!folderName.trim() || isSubmitting}>
              {isSubmitting ? "创建中..." : "创建文件夹"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}