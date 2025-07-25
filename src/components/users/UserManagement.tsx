import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddUserDialog } from "./AddUserDialog";
import { PermissionTemplateDialog } from "./PermissionTemplateDialog";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Users,
  Eye,
  Edit,
  Trash2,
  Key,
  Activity,
  Clock,
  UserCheck,
  UserX
} from "lucide-react";

// 模拟用户数据
const users = [
  {
    id: "USR-001",
    name: "张明",
    email: "zhang.ming@smartlife.com",
    phone: "13812345678",
    role: "系统管理员",
    department: "技术部",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    createTime: "2023-06-15 10:00",
    avatar: "/avatars/zhang-ming.jpg",
    permissions: ["设备管理", "用户管理", "系统设置", "告警管理"]
  },
  {
    id: "USR-002",
    name: "李芳",
    email: "li.fang@smartlife.com",
    phone: "13987654321",
    role: "维修主管",
    department: "维修部",
    status: "active",
    lastLogin: "2024-01-15 12:15",
    createTime: "2023-08-20 09:30",
    avatar: "/avatars/li-fang.jpg",
    permissions: ["工单管理", "设备管理", "告警管理"]
  },
  {
    id: "USR-003",
    name: "王师傅",
    email: "wang.shifu@smartlife.com",
    phone: "13765432198",
    role: "维修员",
    department: "维修部",
    status: "active",
    lastLogin: "2024-01-15 11:45",
    createTime: "2023-09-10 14:20",
    avatar: "/avatars/wang-shifu.jpg",
    permissions: ["工单处理", "设备查看"]
  },
  {
    id: "USR-004",
    name: "陈经理",
    email: "chen.jingli@smartlife.com",
    phone: "13654321987",
    role: "社区管理员",
    department: "物业部",
    status: "inactive",
    lastLogin: "2024-01-10 16:20",
    createTime: "2023-07-05 11:10",
    avatar: "/avatars/chen-jingli.jpg",
    permissions: ["设备查看", "报告查看"]
  }
];

const roles = [
  {
    id: "role-001",
    name: "系统管理员",
    description: "拥有系统全部权限",
    userCount: 2,
    permissions: ["设备管理", "用户管理", "系统设置", "告警管理", "工单管理", "数据分析"]
  },
  {
    id: "role-002", 
    name: "维修主管",
    description: "负责维修工单管理和设备维护",
    userCount: 3,
    permissions: ["工单管理", "设备管理", "告警管理", "维修员管理"]
  },
  {
    id: "role-003",
    name: "维修员",
    description: "执行维修任务和设备检查",
    userCount: 12,
    permissions: ["工单处理", "设备查看", "上传报告"]
  },
  {
    id: "role-004",
    name: "社区管理员",
    description: "查看社区设备状态和数据报告",
    userCount: 8,
    permissions: ["设备查看", "报告查看", "数据导出"]
  }
];

const operationLogs = [
  {
    id: "LOG-001",
    user: "张明",
    action: "创建用户",
    target: "李芳",
    time: "2024-01-15 14:25",
    ip: "192.168.1.100",
    result: "成功"
  },
  {
    id: "LOG-002",
    user: "李芳",
    action: "分配工单",
    target: "WO-2024-001",
    time: "2024-01-15 13:40",
    ip: "192.168.1.101",
    result: "成功"
  },
  {
    id: "LOG-003",
    user: "王师傅",
    action: "更新设备状态",
    target: "SLG-001",
    time: "2024-01-15 12:30",
    ip: "192.168.1.102",
    result: "成功"
  }
];

const statusOptions = ["全部", "活跃", "禁用"];
const roleOptions = ["全部", "系统管理员", "维修主管", "维修员", "社区管理员"];

function getStatusBadge(status: string) {
  return status === "active" ? 
    <Badge className="bg-green-100 text-green-800 border-green-200">活跃</Badge> :
    <Badge variant="secondary">禁用</Badge>;
}

function getStatusIcon(status: string) {
  return status === "active" ? 
    <UserCheck className="h-4 w-4 text-green-500" /> :
    <UserX className="h-4 w-4 text-gray-500" />;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("全部");
  const [selectedRole, setSelectedRole] = useState("全部");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === "全部" ||
      (selectedStatus === "活跃" && user.status === "active") ||
      (selectedStatus === "禁用" && user.status === "inactive");
    
    const matchesRole = selectedRole === "全部" || user.role === selectedRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">用户管理</h2>
          <p className="text-muted-foreground">管理系统用户账户、角色权限和操作日志</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowTemplateDialog(true)}>
            <Shield className="h-4 w-4 mr-2" />
            权限模板
          </Button>
          <Button size="sm" onClick={() => setShowAddUserDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            添加用户
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">{users.length}</div>
                <div className="text-sm text-blue-700">总用户数</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{users.filter(u => u.status === 'active').length}</div>
                <div className="text-sm text-green-700">活跃用户</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">{roles.length}</div>
                <div className="text-sm text-purple-700">系统角色</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-800">24</div>
                <div className="text-sm text-orange-700">今日活跃</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">用户列表</TabsTrigger>
          <TabsTrigger value="roles">角色管理</TabsTrigger>
          <TabsTrigger value="logs">操作日志</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">用户筛选</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索用户姓名、邮箱或手机..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="角色" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
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

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>用户列表</span>
                <Badge variant="secondary">{filteredUsers.length} 个用户</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>用户信息</TableHead>
                    <TableHead>联系方式</TableHead>
                    <TableHead>角色部门</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最后登录</TableHead>
                    <TableHead>权限</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{user.email}</div>
                          <div className="text-sm text-muted-foreground">{user.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{user.role}</div>
                          <div className="text-sm text-muted-foreground">{user.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          {getStatusBadge(user.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {user.lastLogin}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.permissions.slice(0, 2).map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs mr-1">
                              {permission}
                            </Badge>
                          ))}
                          {user.permissions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{user.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Key className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>角色管理</span>
                <Button size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  创建角色
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card key={role.id} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{role.name}</span>
                        <Badge variant="secondary">{role.userCount} 用户</Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">权限列表:</div>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map(permission => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">编辑</Button>
                          <Button variant="outline" size="sm">复制</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>操作日志</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>操作人</TableHead>
                    <TableHead>操作类型</TableHead>
                    <TableHead>操作对象</TableHead>
                    <TableHead>操作时间</TableHead>
                    <TableHead>IP地址</TableHead>
                    <TableHead>结果</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operationLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {log.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddUserDialog 
        open={showAddUserDialog} 
        onOpenChange={setShowAddUserDialog} 
      />
      <PermissionTemplateDialog 
        open={showTemplateDialog} 
        onOpenChange={setShowTemplateDialog} 
      />
    </div>
  );
}