import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AssetManagement() {
  useEffect(() => {
    document.title = "资产管理 - 房产/合同/维护/办公用品/固定资产";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "资产管理模块：房产管理、合同管理、产业维护、办公用品、固定资产，统一资产台账与流程"
      );
    }
  }, []);

  return (
    <section>
      <header className="mb-4">
        <h1 className="text-2xl font-bold">资产管理</h1>
        <p className="text-sm text-muted-foreground mt-1">房产管理、合同管理、产业维护、办公用品与固定资产的统一入口。</p>
      </header>

      <Tabs defaultValue="property" className="w-full">
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="property">房产管理</TabsTrigger>
          <TabsTrigger value="contract">合同管理</TabsTrigger>
          <TabsTrigger value="maintenance">产业维护</TabsTrigger>
          <TabsTrigger value="supplies">办公用品</TabsTrigger>
          <TabsTrigger value="fixed">固定资产</TabsTrigger>
        </TabsList>

        <TabsContent value="property">
          <PropertyModule />
        </TabsContent>
        <TabsContent value="contract">
          <ContractModule />
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceModule />
        </TabsContent>
        <TabsContent value="supplies">
          <SuppliesModule />
        </TabsContent>
        <TabsContent value="fixed">
          <FixedAssetModule />
        </TabsContent>
      </Tabs>
    </section>
  );
}

// 模块一：房产管理（汇总表 + 明细/往期租赁占位）
function PropertyModule() {
  type Row = {
    id: number;
    index: number;
    door: string; // 门牌号
    addr: string; // 地址
    note?: string;
  };
  const [rows, setRows] = useState<Row[]>([]);
  const addRow = () => {
    setRows((prev) => {
      const nextIndex = (prev[prev.length - 1]?.index || 0) + 1;
      const id = Date.now();
      return [...prev, { id, index: nextIndex, door: "", addr: "", note: "" }];
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>房产汇总表</CardTitle>
          <Button size="sm" onClick={addRow}>添加行</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">序号</TableHead>
                <TableHead>门牌号</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.index}</TableCell>
                  <TableCell>
                    <Input
                      placeholder="如：1楼101室"
                      value={r.door}
                      onChange={(e) => setRows((prev) => prev.map((x) => x.id === r.id ? { ...x, door: e.target.value } : x))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="XX市XX区XX路XX号"
                      value={r.addr}
                      onChange={(e) => setRows((prev) => prev.map((x) => x.id === r.id ? { ...x, addr: e.target.value } : x))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="备注"
                      value={r.note}
                      onChange={(e) => setRows((prev) => prev.map((x) => x.id === r.id ? { ...x, note: e.target.value } : x))}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                    暂无数据，点击“添加行”开始录入。
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>房屋明细与往期租赁（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            后续将接入：房产证/土地证、面积、使用情况、往期租赁记录（含下期收租时间自动计算、租金提醒、历史欠费跳转等）。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// 模块二：合同管理（租赁合同/交接检查/催缴函 占位与基础清单）
function ContractModule() {
  type LeaseRow = { id: number; index: number; addr: string; code: string; start?: string; note?: string };
  const [leases, setLeases] = useState<LeaseRow[]>([]);
  const addLease = () => setLeases((prev) => [...prev, { id: Date.now(), index: (prev[prev.length-1]?.index||0)+1, addr: "", code: "" }]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>租赁合同汇总表</CardTitle>
          <Button size="sm" onClick={addLease}>添加行</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">序号</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>合同编号</TableHead>
                <TableHead>出租时间</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leases.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.index}</TableCell>
                  <TableCell>
                    <Input value={r.addr} onChange={(e)=>setLeases((p)=>p.map(x=>x.id===r.id?{...x,addr:e.target.value}:x))} />
                  </TableCell>
                  <TableCell>
                    <Input value={r.code} onChange={(e)=>setLeases((p)=>p.map(x=>x.id===r.id?{...x,code:e.target.value}:x))} />
                  </TableCell>
                  <TableCell>
                    <Input type="date" value={r.start||""} onChange={(e)=>setLeases((p)=>p.map(x=>x.id===r.id?{...x,start:e.target.value}:x))} />
                  </TableCell>
                  <TableCell>
                    <Input value={r.note||""} onChange={(e)=>setLeases((p)=>p.map(x=>x.id===r.id?{...x,note:e.target.value}:x))} />
                  </TableCell>
                </TableRow>
              ))}
              {leases.length===0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">暂无数据，点击“添加行”。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">后续将接入：电子模版、合同库图片上传与按出租时间排序。</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>房屋交接检查与费用催缴函（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">将提供电子模版、图片上传与汇总表。</p>
        </CardContent>
      </Card>
    </div>
  );
}

// 模块三：产业维护（申请/验收/汇总 占位 + 基础录入）
function MaintenanceModule() {
  type RequestRow = { id:number; index:number; addr:string; door:string; item:string; type:string; est:number; note?:string };
  const [reqs, setReqs] = useState<RequestRow[]>([]);
  const addReq = () => setReqs((prev)=>[...prev,{ id:Date.now(), index:(prev[prev.length-1]?.index||0)+1, addr:"", door:"", item:"", type:"", est:0 }]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>产业维护申请单</CardTitle>
          <Button size="sm" onClick={addReq}>添加行</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">序号</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>门牌号</TableHead>
                <TableHead>损坏物</TableHead>
                <TableHead>维护类型</TableHead>
                <TableHead>预估费用</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reqs.map((r)=> (
                <TableRow key={r.id}>
                  <TableCell>{r.index}</TableCell>
                  <TableCell><Input value={r.addr} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,addr:e.target.value}:x))}/></TableCell>
                  <TableCell><Input value={r.door} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,door:e.target.value}:x))}/></TableCell>
                  <TableCell><Input value={r.item} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,item:e.target.value}:x))}/></TableCell>
                  <TableCell><Input value={r.type} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,type:e.target.value}:x))}/></TableCell>
                  <TableCell><Input type="number" value={r.est} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,est:Number(e.target.value)||0}:x))}/></TableCell>
                  <TableCell><Input value={r.note||""} onChange={(e)=>setReqs(p=>p.map(x=>x.id===r.id?{...x,note:e.target.value}:x))}/></TableCell>
                </TableRow>
              ))}
              {reqs.length===0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">暂无数据，点击“添加行”。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">后续将接入：审批流（财务负责人→总经理）、抄送与验收单联动。</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>产业维护验收与汇总（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">将实现照片对比、费用、发票上传与自动写入汇总表（只读）。</p>
        </CardContent>
      </Card>
    </div>
  );
}

// 模块二：办公用品（入库 + 库存占位）
function SuppliesModule() {
  type InRow = { id:number; index:number; name:string; code:string; qty:number; unit:string; price:number; total:number; note?:string };
  const [items,setItems] = useState<InRow[]>([]);
  const addItem = ()=> setItems((prev)=>[...prev,{ id:Date.now(), index:(prev[prev.length-1]?.index||0)+1, name:"", code:"", qty:0, unit:"件", price:0, total:0 }]);

  useEffect(()=>{
    setItems((prev)=> prev.map((x)=> ({...x, total: Number((x.qty * x.price).toFixed(2)) })));
  },[items.length]);

  const update = (id:number, patch:Partial<InRow>)=> setItems((p)=> p.map(x=> x.id===id? { ...x, ...patch, total: patch.qty!==undefined || patch.price!==undefined ? Number((((patch.qty??x.qty) * (patch.price??x.price))).toFixed(2)) : x.total } : x));

  const sum = useMemo(()=> items.reduce((acc,cur)=> acc + cur.total, 0),[items]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>办公用品入库单</CardTitle>
          <Button size="sm" onClick={addItem}>添加行</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">序号</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>编号</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>单位</TableHead>
                <TableHead>单价</TableHead>
                <TableHead>总价</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r)=> (
                <TableRow key={r.id}>
                  <TableCell>{r.index}</TableCell>
                  <TableCell><Input value={r.name} onChange={(e)=>update(r.id,{name:e.target.value})}/></TableCell>
                  <TableCell><Input value={r.code} onChange={(e)=>update(r.id,{code:e.target.value})}/></TableCell>
                  <TableCell><Input type="number" value={r.qty} onChange={(e)=>update(r.id,{qty:Number(e.target.value)||0})}/></TableCell>
                  <TableCell><Input value={r.unit} onChange={(e)=>update(r.id,{unit:e.target.value})}/></TableCell>
                  <TableCell><Input type="number" value={r.price} onChange={(e)=>update(r.id,{price:Number(e.target.value)||0})}/></TableCell>
                  <TableCell>{r.total.toFixed(2)}</TableCell>
                  <TableCell><Input value={r.note||""} onChange={(e)=>update(r.id,{note:e.target.value})}/></TableCell>
                </TableRow>
              ))}
              {items.length===0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground">暂无数据，点击“添加行”。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-3 text-sm">合计：<span className="font-medium">{sum.toFixed(2)}</span></div>
          <p className="text-xs text-muted-foreground mt-1">后续将接入：发票上传、财务审批流与库存联动。</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>办公用品库存单（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">将根据入库与领用自动计算，提供合计统计与下载。</p>
        </CardContent>
      </Card>
    </div>
  );
}

// 模块三：固定资产（采购/入库/调拨/清单 占位）
function FixedAssetModule() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>固定资产采购与入库（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">将提供采购单与入库单（自动编号、合计、发票上传、审批流）。</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>固定资产调拨与清单（占位）</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">将支持库存校验、调拨审批与清单自动生成（只读统计字段）。</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AssetManagement;
