import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function OnboardingTransfers() {
  const [contractSigned, setContractSigned] = useState(false);

  // 入职 - 账号注册
  const [reg, setReg] = useState({ name: "", idcard: "", phone: "", dept: "", title: "" });
  const [generated, setGenerated] = useState<{ empNo: string; password: string } | null>(null);

  // 门禁申请
  const [passType, setPassType] = useState("online");

  // 调岗流程
  const [transfer, setTransfer] = useState({ emp: "", fromDept: "", toDept: "", fromTitle: "", toTitle: "" });
  const approvalSteps = useMemo(() => [
    { key: "hr", name: "人力负责人", status: "待审批" },
    { key: "fromLead", name: "调出部门负责人", status: "待审批" },
    { key: "toLead", name: "调入部门负责人", status: "待审批" },
    { key: "gm", name: "总经理", status: "待审批" },
  ], []);

  // 离职流程
  const [leave, setLeave] = useState({ reason: "", items: [] as { name: string; receiver: string; confirmed?: boolean }[] });

  const signContract = () => {
    setContractSigned(true);
    alert("合同已签署，自动归档（仅管理员可见）");
  };

  const genAccount = () => {
    const empNo = `E${Math.floor(Math.random() * 900000 + 100000)}`;
    setGenerated({ empNo, password: "666666" });
  };

  return (
    <div className="space-y-6">
      {/* 入职流程 */}
      <Card>
        <CardHeader>
          <CardTitle>入职流程</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>电子合同</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-40 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                  PDF 合同预览（占位）
                </div>
                <Button onClick={signContract} disabled={contractSigned}>{contractSigned ? "已签署" : "签署"}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>账号注册（仅总经理/人事）</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="姓名" value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} />
                  <Input placeholder="身份证号" value={reg.idcard} onChange={(e) => setReg({ ...reg, idcard: e.target.value })} />
                  <Input placeholder="手机号" value={reg.phone} onChange={(e) => setReg({ ...reg, phone: e.target.value })} />
                  <Input placeholder="部门" value={reg.dept} onChange={(e) => setReg({ ...reg, dept: e.target.value })} />
                  <Input placeholder="岗位" value={reg.title} onChange={(e) => setReg({ ...reg, title: e.target.value })} />
                </div>
                <Button onClick={genAccount}>生成工号与初始密码</Button>
                {generated && (
                  <div className="text-sm text-muted-foreground">
                    工号：<Badge variant="secondary">{generated.empNo}</Badge> 初始密码：<Badge variant="outline">{generated.password}</Badge>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">员工可通过身份证号找回账号并修改密码（演示占位）。</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>门禁系统申请（仅总经理/人事）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">申请人信息（自动读取，占位展示）</div>
              <RadioGroup value={passType} onValueChange={setPassType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">线上卡</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entity" id="entity" />
                  <Label htmlFor="entity">实体卡</Label>
                </div>
              </RadioGroup>
              <Button>提交申请</Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* 调岗流程 */}
      <Card>
        <CardHeader>
          <CardTitle>调岗流程</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="员工姓名" value={transfer.emp} onChange={(e) => setTransfer({ ...transfer, emp: e.target.value })} />
            <Input placeholder="调出部门" value={transfer.fromDept} onChange={(e) => setTransfer({ ...transfer, fromDept: e.target.value })} />
            <Input placeholder="调入部门" value={transfer.toDept} onChange={(e) => setTransfer({ ...transfer, toDept: e.target.value })} />
            <Input placeholder="调出岗位" value={transfer.fromTitle} onChange={(e) => setTransfer({ ...transfer, fromTitle: e.target.value })} />
            <Input placeholder="调入岗位" value={transfer.toTitle} onChange={(e) => setTransfer({ ...transfer, toTitle: e.target.value })} />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">审批流程</div>
            <ol className="grid grid-cols-4 gap-3">
              {approvalSteps.map((s, idx) => (
                <li key={s.key} className="p-3 rounded border text-center">
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.status}</div>
                  {idx < approvalSteps.length - 1 && (
                    <div className="mt-2 text-xs text-muted-foreground">→</div>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <Button>提交调岗申请</Button>
          <p className="text-xs text-muted-foreground">审批完成后，系统将自动发送抄送通知（演示占位）。</p>
        </CardContent>
      </Card>

      {/* 离职流程 */}
      <Card>
        <CardHeader>
          <CardTitle>离职流程</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">离职申请</div>
            <Textarea placeholder="离职原因" value={leave.reason} onChange={(e) => setLeave({ ...leave, reason: e.target.value })} />
            <Button>提交离职申请（走部门负责人→人力负责人→总经理审批）</Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">离职交接</div>
            <div className="flex gap-2">
              <Input placeholder="交接物" onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setLeave((prev) => ({ ...prev, items: [...prev.items, { name: e.currentTarget.value, receiver: "" }] }));
                  e.currentTarget.value = "";
                }
              }} />
              <Button onClick={() => setLeave((prev) => ({ ...prev, items: [...prev.items, { name: "电脑", receiver: "张三" }] }))}>添加示例</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>交接物</TableHead>
                  <TableHead>接收人</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leave.items.map((i, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{i.name}</TableCell>
                    <TableCell>
                      <Input placeholder="接收人" value={i.receiver} onChange={(e) => setLeave((prev) => ({ ...prev, items: prev.items.map((it, id) => id === idx ? { ...it, receiver: e.target.value } : it) }))} />
                    </TableCell>
                    <TableCell>{i.confirmed ? <Badge variant="secondary">已确认</Badge> : <Badge variant="outline">待确认</Badge>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button>发起审批</Button>
          </div>

          <div>
            <Button variant="secondary">生成离职证明（完成全部流程后由人力操作）</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
