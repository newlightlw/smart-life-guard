import { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// 简化角色：gm、assistant、hr、lead、staff
const canViewAll = (role: string) => ["gm", "assistant", "hr"].includes(role);

export function PersonnelRecords() {
  const [role] = useState<string>("gm");
  const [locked, setLocked] = useState<boolean>(false);

  // 个人档案
  const [profile, setProfile] = useState({
    name: "王小明",
    gender: "男",
    dept: "市场部",
    title: "市场专员",
    education: "本科",
    status: "在职",
  });
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [eduURL, setEduURL] = useState<string | null>(null);
  const [certURLs, setCertURLs] = useState<string[]>([]);

  // 不可修改字段在提交后锁定
  const [salaryCard, setSalaryCard] = useState("");
  const [socialCard, setSocialCard] = useState("");
  const [healthReport, setHealthReport] = useState("");

  const certInputRef = useRef<HTMLInputElement>(null);

  const submitProfile = () => {
    setLocked(true);
    alert("档案已提交，部分字段已锁定");
  };

  const addCerts = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setCertURLs((prev) => [...urls, ...prev]);
  };

  const records = useMemo(() => ([
    { id: 1, name: "王小明", gender: "男", dept: "市场部", title: "市场专员", edu: "本科", status: "在职" },
    { id: 2, name: "刘佳", gender: "女", dept: "设计部", title: "设计师", edu: "本科", status: "在职" },
    { id: 3, name: "陈阳", gender: "男", dept: "售后部", title: "客服", edu: "大专", status: "离职" },
  ]), []);

  return (
    <div className="space-y-6">
      {/* 个人档案 */}
      <Card>
        <CardHeader>
          <CardTitle>个人档案</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="姓名" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              <Input placeholder="性别" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} />
              <Input placeholder="部门" value={profile.dept} onChange={(e) => setProfile({ ...profile, dept: e.target.value })} />
              <Input placeholder="岗位" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
              <Input placeholder="学历" value={profile.education} onChange={(e) => setProfile({ ...profile, education: e.target.value })} />
              <Input placeholder="工作状况" value={profile.status} onChange={(e) => setProfile({ ...profile, status: e.target.value })} />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">照片与证明</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="photo">员工照片</Label>
                  <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoURL(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
                  {photoURL && (
                    <img src={photoURL} alt="员工照片缩略图" className="mt-2 h-24 w-24 object-cover rounded" />
                  )}
                </div>
                <div>
                  <Label htmlFor="edu">学历证明</Label>
                  <Input id="edu" type="file" accept="image/*" onChange={(e) => setEduURL(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
                  {eduURL && (
                    <img src={eduURL} alt="学历证明缩略图" className="mt-2 h-24 w-24 object-cover rounded" />
                  )}
                </div>
                <div>
                  <Label>技术证书</Label>
                  <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={() => certInputRef.current?.click()}>上传</Button>
                    <input ref={certInputRef} type="file" accept="image/*" className="hidden" multiple onChange={(e) => addCerts(e.target.files)} />
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {certURLs.map((url, idx) => (
                      <img key={idx} src={url} alt={`证书${idx}`} className="h-16 w-16 object-cover rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">不可更改字段（提交后锁定）</div>
              <Input placeholder="工资卡号" value={salaryCard} onChange={(e) => setSalaryCard(e.target.value)} disabled={locked} />
              <Input placeholder="社保卡号" value={socialCard} onChange={(e) => setSocialCard(e.target.value)} disabled={locked} />
              <Textarea placeholder="体检报告单编号/摘要" value={healthReport} onChange={(e) => setHealthReport(e.target.value)} disabled={locked} />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitProfile} disabled={locked}>提交档案</Button>
              {locked && <Badge variant="outline">关键字段已锁定</Badge>}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">备注</div>
            <Textarea placeholder="填写与岗位职责相关的补充说明" rows={12} />
          </div>
        </CardContent>
      </Card>

      {/* 档案库 */}
      <Card>
        <CardHeader>
          <CardTitle>档案库</CardTitle>
        </CardHeader>
        <CardContent>
          {!canViewAll(role) && (
            <p className="text-sm text-muted-foreground mb-2">您仅可查看和编辑自己的档案</p>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>序号</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>岗位</TableHead>
                <TableHead>学历</TableHead>
                <TableHead>工作状况</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(canViewAll(role) ? records : records.filter((r) => r.name === profile.name)).map((r, idx) => (
                <TableRow key={r.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.gender}</TableCell>
                  <TableCell>{r.dept}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.edu}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "在职" ? "secondary" : "destructive"}>{r.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
