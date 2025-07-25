import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MessageSquare, Phone, Smartphone, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationSettingsDialog({ open, onOpenChange }: NotificationSettingsDialogProps) {
  const { toast } = useToast();
  
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    server: "smtp.company.com",
    port: "587",
    username: "alerts@company.com",
    password: "********",
    ssl: true,
    recipients: ["admin@company.com", "manager@company.com"]
  });

  const [smsSettings, setSmsSettings] = useState({
    enabled: true,
    provider: "aliyun",
    accessKey: "LTA*******",
    accessSecret: "********",
    signature: "智能运维",
    template: "SMS_123456789",
    recipients: ["13800138000", "13900139000"]
  });

  const [pushSettings, setPushSettings] = useState({
    enabled: true,
    appId: "wx1234567890",
    appSecret: "********",
    adminUsers: ["user001", "user002"]
  });

  const [notificationRules, setNotificationRules] = useState([
    { level: "low", email: true, sms: false, push: true, voice: false },
    { level: "medium", email: true, sms: true, push: true, voice: false },
    { level: "high", email: true, sms: true, push: true, voice: true },
    { level: "critical", email: true, sms: true, push: true, voice: true }
  ]);

  const levelLabels = {
    low: "低级",
    medium: "中级", 
    high: "高级",
    critical: "严重"
  };

  const handleSaveSettings = () => {
    toast({
      title: "设置已保存",
      description: "通知设置已成功更新"
    });
  };

  const handleTestNotification = (type: string) => {
    toast({
      title: "测试通知已发送",
      description: `${type}测试通知已发送，请检查接收情况`
    });
  };

  const updateNotificationRule = (level: string, channel: string, enabled: boolean) => {
    setNotificationRules(rules => 
      rules.map(rule => 
        rule.level === level 
          ? { ...rule, [channel]: enabled }
          : rule
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>通知设置</DialogTitle>
          <DialogDescription>
            配置告警通知的发送方式和接收人员
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="channels">通知渠道</TabsTrigger>
            <TabsTrigger value="rules">通知规则</TabsTrigger>
            <TabsTrigger value="contacts">联系人管理</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-4">
            <div className="max-h-[400px] overflow-y-auto space-y-6">
              {/* 邮件设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    邮件通知
                    <Switch
                      checked={emailSettings.enabled}
                      onCheckedChange={(enabled) => setEmailSettings({...emailSettings, enabled})}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMTP服务器</Label>
                      <Input
                        value={emailSettings.server}
                        onChange={(e) => setEmailSettings({...emailSettings, server: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>端口</Label>
                      <Input
                        value={emailSettings.port}
                        onChange={(e) => setEmailSettings({...emailSettings, port: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>用户名</Label>
                      <Input
                        value={emailSettings.username}
                        onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>密码</Label>
                      <Input
                        type="password"
                        value={emailSettings.password}
                        onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={emailSettings.ssl}
                      onCheckedChange={(ssl) => setEmailSettings({...emailSettings, ssl})}
                    />
                    <Label>启用SSL</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleTestNotification("邮件")}>
                      发送测试邮件
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 短信设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    短信通知
                    <Switch
                      checked={smsSettings.enabled}
                      onCheckedChange={(enabled) => setSmsSettings({...smsSettings, enabled})}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>服务商</Label>
                      <Select value={smsSettings.provider} onValueChange={(provider) => setSmsSettings({...smsSettings, provider})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aliyun">阿里云</SelectItem>
                          <SelectItem value="tencent">腾讯云</SelectItem>
                          <SelectItem value="qiniu">七牛云</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>签名</Label>
                      <Input
                        value={smsSettings.signature}
                        onChange={(e) => setSmsSettings({...smsSettings, signature: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Access Key</Label>
                      <Input
                        value={smsSettings.accessKey}
                        onChange={(e) => setSmsSettings({...smsSettings, accessKey: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>模板ID</Label>
                      <Input
                        value={smsSettings.template}
                        onChange={(e) => setSmsSettings({...smsSettings, template: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleTestNotification("短信")}>
                    发送测试短信
                  </Button>
                </CardContent>
              </Card>

              {/* 应用推送设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    应用推送
                    <Switch
                      checked={pushSettings.enabled}
                      onCheckedChange={(enabled) => setPushSettings({...pushSettings, enabled})}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>应用ID</Label>
                      <Input
                        value={pushSettings.appId}
                        onChange={(e) => setPushSettings({...pushSettings, appId: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>应用密钥</Label>
                      <Input
                        type="password"
                        value={pushSettings.appSecret}
                        onChange={(e) => setPushSettings({...pushSettings, appSecret: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleTestNotification("推送")}>
                    发送测试推送
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>按告警级别配置通知方式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationRules.map((rule) => (
                    <div key={rule.level} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-16 justify-center">
                          {levelLabels[rule.level as keyof typeof levelLabels]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <Switch
                            checked={rule.email}
                            onCheckedChange={(checked) => updateNotificationRule(rule.level, 'email', checked)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Switch
                            checked={rule.sms}
                            onCheckedChange={(checked) => updateNotificationRule(rule.level, 'sms', checked)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <Switch
                            checked={rule.push}
                            onCheckedChange={(checked) => updateNotificationRule(rule.level, 'push', checked)}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <Switch
                            checked={rule.voice}
                            onCheckedChange={(checked) => updateNotificationRule(rule.level, 'voice', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>邮件接收人</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {emailSettings.recipients.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{email}</span>
                      <Button variant="ghost" size="sm">删除</Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input placeholder="添加邮箱地址" />
                    <Button size="sm">添加</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>短信接收人</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {smsSettings.recipients.map((phone, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{phone}</span>
                      <Button variant="ghost" size="sm">删除</Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input placeholder="添加手机号码" />
                    <Button size="sm">添加</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSaveSettings}>
            保存设置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}