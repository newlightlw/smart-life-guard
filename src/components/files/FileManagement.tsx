import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Download, 
  Search, 
  Filter, 
  MoreHorizontal,
  FileText,
  Image,
  File,
  Video,
  Music,
  Archive,
  Folder,
  Share2,
  Trash2,
  Star,
  FolderPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadFileDialog } from "./UploadFileDialog";
import { CreateFolderDialog } from "./CreateFolderDialog";
import { FileDetailDialog } from "./FileDetailDialog";
import { ShareFileDialog } from "./ShareFileDialog";
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

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "设备配置文档",
    type: "folder",
    modifiedDate: "2024-01-15",
    owner: "张三",
    permissions: "管理员",
    favorite: true,
    shared: false
  },
  {
    id: "2",
    name: "系统日志_20240115.txt",
    type: "file",
    fileType: "document",
    size: "2.5 MB",
    modifiedDate: "2024-01-15",
    owner: "系统",
    permissions: "只读",
    favorite: false,
    shared: true
  },
  {
    id: "3",
    name: "设备图片库",
    type: "folder",
    modifiedDate: "2024-01-14",
    owner: "李四",
    permissions: "编辑",
    favorite: false,
    shared: true
  },
  {
    id: "4",
    name: "监控视频_001.mp4",
    type: "file",
    fileType: "video",
    size: "45.2 MB",
    modifiedDate: "2024-01-14",
    owner: "王五",
    permissions: "编辑",
    favorite: true,
    shared: false
  },
  {
    id: "5",
    name: "用户手册.pdf",
    type: "file",
    fileType: "document",
    size: "8.7 MB",
    modifiedDate: "2024-01-13",
    owner: "张三",
    permissions: "管理员",
    favorite: false,
    shared: true
  }
];

const getFileIcon = (item: FileItem) => {
  if (item.type === "folder") {
    return <Folder className="h-5 w-5 text-blue-500" />;
  }
  
  switch (item.fileType) {
    case "document":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "image":
      return <Image className="h-5 w-5 text-green-500" />;
    case "video":
      return <Video className="h-5 w-5 text-purple-500" />;
    case "audio":
      return <Music className="h-5 w-5 text-orange-500" />;
    case "archive":
      return <Archive className="h-5 w-5 text-yellow-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

export function FileManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [createFolderDialogOpen, setCreateFolderDialogOpen] = useState(false);
  const [fileDetailDialogOpen, setFileDetailDialogOpen] = useState(false);
  const [shareFileDialogOpen, setShareFileDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileAction = (action: string, file: FileItem) => {
    setSelectedFile(file);
    
    switch (action) {
      case "detail":
        setFileDetailDialogOpen(true);
        break;
      case "download":
        toast({
          title: "下载开始",
          description: `正在下载 ${file.name}`,
        });
        break;
      case "share":
        setShareFileDialogOpen(true);
        break;
      case "favorite":
        toast({
          title: file.favorite ? "取消收藏" : "添加收藏",
          description: `${file.name} ${file.favorite ? "已取消收藏" : "已添加到收藏"}`,
        });
        break;
      case "delete":
        toast({
          title: "删除文件",
          description: `${file.name} 已删除`,
          variant: "destructive",
        });
        break;
    }
  };

  const handleBatchDelete = () => {
    if (selectedFiles.length === 0) return;
    
    toast({
      title: "批量删除",
      description: `已删除 ${selectedFiles.length} 个文件`,
      variant: "destructive",
    });
    setSelectedFiles([]);
  };

  const storageStats = {
    used: "156.8 GB",
    total: "500 GB",
    percentage: 31.36
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">文件管理</h1>
          <p className="text-muted-foreground">管理系统文件和文档</p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => setCreateFolderDialogOpen(true)} variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            新建文件夹
          </Button>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            上传文件
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">存储概览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">已用存储</span>
            <span className="text-sm font-medium">{storageStats.used} / {storageStats.total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${storageStats.percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            剩余 {(500 - 156.8).toFixed(1)} GB 可用空间
          </p>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索文件和文件夹..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  已选择 {selectedFiles.length} 项
                </span>
                <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  批量删除
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Table */}
      <Card>
        <CardHeader>
          <CardTitle>文件列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(filteredFiles.map(f => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                  />
                </TableHead>
                <TableHead>名称</TableHead>
                <TableHead>大小</TableHead>
                <TableHead>修改时间</TableHead>
                <TableHead>所有者</TableHead>
                <TableHead>权限</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="w-16">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <input 
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id]);
                        } else {
                          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(file)}
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{file.name}</span>
                        {file.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{file.size || "-"}</TableCell>
                  <TableCell>{file.modifiedDate}</TableCell>
                  <TableCell>{file.owner}</TableCell>
                  <TableCell>
                    <Badge variant={file.permissions === "管理员" ? "default" : "secondary"}>
                      {file.permissions}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {file.shared && (
                        <Badge variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          共享
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleFileAction("detail", file)}>
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("download", file)}>
                          <Download className="h-4 w-4 mr-2" />
                          下载
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("share", file)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          分享
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileAction("favorite", file)}>
                          <Star className="h-4 w-4 mr-2" />
                          {file.favorite ? "取消收藏" : "收藏"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleFileAction("delete", file)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UploadFileDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
      />
      <CreateFolderDialog 
        open={createFolderDialogOpen} 
        onOpenChange={setCreateFolderDialogOpen}
      />
      <FileDetailDialog 
        open={fileDetailDialogOpen} 
        onOpenChange={setFileDetailDialogOpen}
        file={selectedFile}
      />
      <ShareFileDialog 
        open={shareFileDialogOpen} 
        onOpenChange={setShareFileDialogOpen}
        file={selectedFile}
      />
    </div>
  );
}