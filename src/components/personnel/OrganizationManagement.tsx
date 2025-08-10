import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react";

// Mock 基础数据
const mockDepartments = [
  { id: "d1", name: "市场部", head: "张三", children: [] as any[] },
  { id: "d2", name: "设计部", head: "李四", children: [] as any[] },
  { id: "d3", name: "售后部", head: "王五", children: [ { id: "d3-1", name: "客服组", head: "赵六", children: [] } ] },
];
const mockEmployees = [
  { id: "e1", name: "王小明" },
  { id: "e2", name: "刘佳" },
  { id: "e3", name: "陈阳" },
];

export function OrganizationManagement() {
  // 角色模拟：gm（总经理）、lead（部门负责人）、staff（员工）
  const [role, setRole] = useState<"gm" | "lead" | "staff">("gm");

  // 公告与公司信息
  const [companyIntro, setCompanyIntro] = useState("我们是一家专注于智能设备与服务的一体化企业。");
  const [rules, setRules] = useState("1. 安全第一 2. 诚信为本 3. 高效协作");
  const [announces, setAnnounces] = useState<string[]>([
    "9 月全员安全培训将于下周一开展",
    "绩效考核于本月底启动，请准备相关材料",
  ]);

  // 组织数据
  const [departments, setDepartments] = useState<any[]>(mockDepartments);

  // 岗位管理
  type Position = { id: string; name: string; level: string; duty: string };
  const [positions, setPositions] = useState<Position[]>([
    { id: "p1", name: "市场专员", level: "P1", duty: "市场推广协助" },
    { id: "p2", name: "设计师", level: "P2", duty: "视觉与交互设计" },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 人员分配
  const [selectedEmp, setSelectedEmp] = useState<string>("e1");
  const [selectedDept, setSelectedDept] = useState<string>("d1");
  const [selectedPos, setSelectedPos] = useState<string>("p1");

  const pendingApprovals = useMemo(() => [
    { id: "a1", title: "王小明 调岗申请", status: "待审批" },
    { id: "a2", title: "刘佳 离职交接确认", status: "待审批" },
  ], []);

  const deptStats = useMemo(() => (
    [
      { name: "市场部", total: 12, active: 11 },
      { name: "设计部", total: 9, active: 9 },
      { name: "售后部", total: 15, active: 13 },
    ]
  ), []);

  const addDepartment = () => {
    if (role !== "gm") return;
    const id = `d${departments.length + 1}`;
    setDepartments((prev) => [...prev, { id, name: `新部门 ${prev.length + 1}`, head: "未设置", children: [] }]);
  };
  const updateDeptHead = (id: string, head: string) => {
    setDepartments((prev) => prev.map((d) => d.id === id ? { ...d, head } : d));
  };
  const removeDepartment = (id: string) => {
    if (role !== "gm") return;
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  const addPosition = () => {
    const id = `p${positions.length + 1}`;
    setPositions((prev) => [...prev, { id, name: "新岗位", level: "P1", duty: "职责描述" }]);
    setEditingId(id);
  };
  const savePosition = (pos: Position) => {
    setPositions((prev) => prev.map((p) => p.id === pos.id ? pos : p));
    setEditingId(null);
  };
  const deletePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const assignEmp = () => {
    // 仅演示分配，无持久化
    alert(`已将员工 ${selectedEmp} 分配至 ${selectedDept} 的岗位 ${selectedPos}`);
  };

  const renderTree = (nodes: any[]) => (
    <ul className="ml-4 list-disc space-y-1">
      {nodes.map((node) => (
        <li key={node.id}>
          <div className="flex items-center gap-2">
            <span className="font-medium">{node.name}</span>
            <Badge variant="outline">负责人：{node.head}</Badge>
            {role === "gm" && (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" onClick={() => updateDeptHead(node.id, prompt("设置负责人", node.head || "") || node.head)}>
                  <Pencil className="h-3 w-3" /> 设置负责人
                </Button>
                <Button size="sm" variant="ghost" onClick={addDepartment}>
                  <Plus className="h-3 w-3" /> 新增部门
                </Button>
                <Button size="sm" variant="ghost" onClick={() => removeDepartment(node.id)}>
                  <Trash2 className="h-3 w-3" /> 删除
                </Button>
              </div>
            )}
          </div>
          {node.children?.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-6">
      {/* 角色切换（演示权限差异） */}
      <Card>
        <CardHeader>
          <CardTitle>首页看板</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">当前角色</span>
              <Select value={role} onValueChange={(v: any) => setRole(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gm">总经理</SelectItem>
                  <SelectItem value="lead">部门负责人</SelectItem>
                  <SelectItem value="staff">员工</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>公司简介</CardTitle>
              </CardHeader>
              <CardContent>
                {role === "gm" ? (
                  <Textarea value={companyIntro} onChange={(e) => setCompanyIntro(e.target.value)} />
                ) : (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{companyIntro}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>规章制度</CardTitle>
              </CardHeader>
              <CardContent>
                {role === "gm" ? (
                  <Textarea value={rules} onChange={(e) => setRules(e.target.value)} />
                ) : (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{rules}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>公司公告</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {announces.map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-sm">{a}</p>
                    {role === "gm" && (
                      <Button variant="ghost" size="sm" onClick={() => setAnnounces((prev) => prev.filter((_, idx) => idx !== i))}>删除</Button>
                    )}
                  </div>
                ))}
                {role === "gm" && (
                  <div className="flex gap-2">
                    <Input placeholder="新增公告" onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        setAnnounces((prev) => [e.currentTarget.value.trim(), ...prev]);
                        e.currentTarget.value = "";
                      }
                    }} />
                    <Button onClick={() => {
                      const val = (document.querySelector("#new-announce") as HTMLInputElement)?.value;
                      if (val) setAnnounces((prev) => [val, ...prev]);
                    }}>发布</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {(role === "gm" || role === "lead") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>待审批列表</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {pendingApprovals.map((i) => (
                    <div key={i.id} className="flex items-center justify-between">
                      <span className="text-sm">{i.title}</span>
                      <Badge variant="secondary">{i.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{role === "gm" ? "关键数据概览" : "本部门人员状态概览"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {deptStats.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <span>{d.name}</span>
                      <span className="text-muted-foreground">在职 {d.active}/{d.total}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 组织架构可视化（树形演示） */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>组织架构</CardTitle>
          {role === "staff" && <Badge variant="outline">员工仅可查看</Badge>}
        </CardHeader>
        <CardContent>
          {renderTree(departments)}
        </CardContent>
      </Card>

      {/* 岗位管理 */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>岗位管理</CardTitle>
          {(role === "gm") && (
            <Button size="sm" onClick={addPosition}><Plus className="h-4 w-4 mr-2" />新增岗位</Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>岗位名称</TableHead>
                <TableHead>职级</TableHead>
                <TableHead>职责</TableHead>
                <TableHead className="w-40">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {editingId === p.id ? (
                      <Input defaultValue={p.name} onChange={(e) => p.name = e.target.value} />
                    ) : p.name}
                  </TableCell>
                  <TableCell>
                    {editingId === p.id ? (
                      <Input defaultValue={p.level} onChange={(e) => p.level = e.target.value} />
                    ) : p.level}
                  </TableCell>
                  <TableCell>
                    {editingId === p.id ? (
                      <Input defaultValue={p.duty} onChange={(e) => p.duty = e.target.value} />
                    ) : <span className="text-muted-foreground">{p.duty}</span>}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {editingId === p.id ? (
                      <Button size="sm" onClick={() => savePosition(p)}>
                        <CheckCircle2 className="h-4 w-4 mr-1" /> 保存
                      </Button>
                    ) : (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => setEditingId(p.id)}>
                          <Pencil className="h-4 w-4 mr-1" /> 编辑
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deletePosition(p.id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> 删除
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 人员分配 */}
      <Card>
        <CardHeader>
          <CardTitle>人员分配</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <div className="text-sm mb-2">选择员工</div>
            <Select value={selectedEmp} onValueChange={setSelectedEmp}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockEmployees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-2">分配部门</div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="text-sm mb-2">分配岗位</div>
            <Select value={selectedPos} onValueChange={setSelectedPos}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {positions.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={assignEmp}>确认分配</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
