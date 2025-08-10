import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function AffairsManagement() {
  // 简化演示：统一审批列表
  const approvals = [
    { id: "t1", type: "调岗", title: "王小明 调入设计部", status: "待我审批" },
    { id: "t2", type: "离职", title: "陈阳 离职申请", status: "我的审批" },
  ];

  return (
    <div className="space-y-6">
      {/* 审批模块 */}
      <Card>
        <CardHeader>
          <CardTitle>审批中心（我的审批 / 待我审批）</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>类型</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>{a.title}</TableCell>
                  <TableCell><Badge variant="secondary">{a.status}</Badge></TableCell>
                  <TableCell><Button size="sm" variant="outline">查看详情</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 资料库（按部门） */}
      <Card>
        <CardHeader>
          <CardTitle>资料库（按部门）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground">权限：员工仅查看自己；部门负责人查看本部门；管理层查看全部；下载仅总经理。</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>部门</TableHead>
                <TableHead>标题</TableHead>
                <TableHead>录入时间</TableHead>
                <TableHead>修改时间/人</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>市场部</TableCell>
                <TableCell>宣讲资料模板</TableCell>
                <TableCell>2025-08-01</TableCell>
                <TableCell>2025-08-05 / 张三</TableCell>
                <TableCell><Button size="sm" variant="ghost">编辑</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 任务派发 */}
      <Card>
        <CardHeader>
          <CardTitle>任务派发</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input type="month" className="w-48" />
            <Button>筛选</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>任务</TableHead>
                <TableHead>接收人</TableHead>
                <TableHead>接收时间</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>9 月市场活动策划</TableCell>
                <TableCell>王小明</TableCell>
                <TableCell>2025-08-02 10:30</TableCell>
                <TableCell><Badge variant="outline">已确认</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 资产与报销管理 （占位表单） */}
      <Card>
        <CardHeader>
          <CardTitle>资产与报销管理</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>办公用品与固定资产</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="物品名称（领用/保养/报废）" />
              <Textarea placeholder="说明" />
              <Input type="file" accept="image/*" />
              <Button>提交</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>出差/报销申请</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="申请标题" />
              <Textarea placeholder="费用明细及补贴标准（系统自动关联展示占位）" />
              <Input type="file" accept="image/*" multiple />
              <Button>提交报销</Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* 绩效与薪酬管理 （占位） */}
      <Card>
        <CardHeader>
          <CardTitle>绩效与薪酬管理</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">月度考核：部门负责人与总经理打分（总经理评分覆盖部门负责人评分）。</div>
          <div className="text-sm">工资条：发放日自动推送，员工在线确认；3 天内无异议自动确认（演示占位）。</div>
          <Button variant="secondary">打开考核表（占位）</Button>
        </CardContent>
      </Card>
    </div>
  );
}
