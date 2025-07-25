import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings,
  Bell,
  Shield,
  Database,
  Smartphone,
  Mail,
  MessageSquare,
  Wifi,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus
} from "lucide-react";

// 系统配置数据
const systemConfig = {
  basic: {
    systemName: "智能生活卫士",
    version: "v1.2.0",
    timezone: "Asia/Shanghai",
    language: "zh-CN",
    maxUsers: 100,
    sessionTimeout: 30
  },
  notification: {
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    emailServer: "smtp.smartlife.com",
    smsProvider: "阿里云短信",
    webhookUrl: "https://hooks.slack.com/services/..."
  },
  security: {
    passwordMinLength: 8,
    requireSpecialChar: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorAuth: false,
    allowedIPs: ["192.168.1.0/24", "10.0.0.0/8"]
  },
  maintenance: {
    autoBackup: true,
    backupInterval: "daily",
    logRetention: 30,
    debugMode: false,
    performanceMonitoring: true
  }
};

const deviceTypes = [
  { id: 1, name: "智能门锁", category: "安防设备", icon: "🔐", enabled: true },
  { id: 2, name: "监控摄像头", category: "安防设备", icon: "📹", enabled: true },
  { id: 3, name: "智能空调", category: "环境控制", icon: "❄️", enabled: true },
  { id: 4, name: "烟雾探测器", category: "安全设备", icon: "🚨", enabled: true },
  { id: 5, name: "智能水表", category: "计量设备", icon: "💧", enabled: true },
  { id: 6, name: "充电桩", category: "能源设备", icon: "🔌", enabled: false }
];

const alertRules = [
  { id: 1, name: "设备离线告警", condition: "设备离线时间 > 5分钟", level: "warning", enabled: true },
  { id: 2, name: "设备故障告警", condition: "设备状态 = 故障", level: "critical", enabled: true },
  { id: 3, name: "电池电量低", condition: "电池电量 < 20%", level: "info", enabled: true },
  { id: 4, name: "温度异常", condition: "温度偏差 > 5度", level: "warning", enabled: true },
  { id: 5, name: "网络延迟高", condition: "网络延迟 > 100ms", level: "warning", enabled: false }
];

export function SystemSettings() {
  const [config, setConfig] = useState(systemConfig);
  const [activeTab, setActiveTab] = useState("basic");

  const handleConfigChange = (section: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // 保存配置逻辑
    console.log("保存配置:", config);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">系统设置</h2>
          <p className="text-muted-foreground">配置系统参数、设备类型和告警规则</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            保存配置
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">基础设置</TabsTrigger>
          <TabsTrigger value="devices">设备管理</TabsTrigger>
          <TabsTrigger value="notifications">通知配置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="maintenance">维护配置</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                基础配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="systemName">系统名称</Label>
                  <Input 
                    id="systemName"
                    value={config.basic.systemName}
                    onChange={(e) => handleConfigChange('basic', 'systemName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="version">系统版本</Label>
                  <Input 
                    id="version"
                    value={config.basic.version}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区设置</Label>
                  <Select value={config.basic.timezone} onValueChange={(value) => handleConfigChange('basic', 'timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">北京时间 (UTC+8)</SelectItem>
                      <SelectItem value="UTC">协调世界时 (UTC)</SelectItem>
                      <SelectItem value="America/New_York">纽约时间 (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">系统语言</Label>
                  <Select value={config.basic.language} onValueChange={(value) => handleConfigChange('basic', 'language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English</SelectItem>
                      <SelectItem value="zh-TW">繁體中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxUsers">最大用户数</Label>
                  <Input 
                    id="maxUsers"
                    type="number"
                    value={config.basic.maxUsers}
                    onChange={(e) => handleConfigChange('basic', 'maxUsers', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">会话超时(分钟)</Label>
                  <Input 
                    id="sessionTimeout"
                    type="number"
                    value={config.basic.sessionTimeout}
                    onChange={(e) => handleConfigChange('basic', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  设备类型管理
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  添加设备类型
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceTypes.map((deviceType) => (
                  <div key={deviceType.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{deviceType.icon}</span>
                      <div>
                        <div className="font-medium">{deviceType.name}</div>
                        <div className="text-sm text-muted-foreground">{deviceType.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={deviceType.enabled} />
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>告警规则配置</span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  添加规则
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{rule.name}</span>
                        <Badge variant={rule.level === 'critical' ? 'destructive' : rule.level === 'warning' ? 'secondary' : 'outline'}>
                          {rule.level === 'critical' ? '严重' : rule.level === 'warning' ? '警告' : '信息'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{rule.condition}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={rule.enabled} />
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                通知方式配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">邮件通知</div>
                      <div className="text-sm text-muted-foreground">通过邮件发送告警通知</div>
                    </div>
                  </div>
                  <Switch 
                    checked={config.notification.emailEnabled}
                    onCheckedChange={(checked) => handleConfigChange('notification', 'emailEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">短信通知</div>
                      <div className="text-sm text-muted-foreground">通过短信发送紧急告警</div>
                    </div>
                  </div>
                  <Switch 
                    checked={config.notification.smsEnabled}
                    onCheckedChange={(checked) => handleConfigChange('notification', 'smsEnabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">推送通知</div>
                      <div className="text-sm text-muted-foreground">移动设备推送通知</div>
                    </div>
                  </div>
                  <Switch 
                    checked={config.notification.pushEnabled}
                    onCheckedChange={(checked) => handleConfigChange('notification', 'pushEnabled', checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="emailServer">邮件服务器</Label>
                  <Input 
                    id="emailServer"
                    value={config.notification.emailServer}
                    onChange={(e) => handleConfigChange('notification', 'emailServer', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">短信服务商</Label>
                  <Select value={config.notification.smsProvider} onValueChange={(value) => handleConfigChange('notification', 'smsProvider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="阿里云短信">阿里云短信</SelectItem>
                      <SelectItem value="腾讯云短信">腾讯云短信</SelectItem>
                      <SelectItem value="华为云短信">华为云短信</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="webhookUrl">Webhook地址</Label>
                  <Input 
                    id="webhookUrl"
                    value={config.notification.webhookUrl}
                    onChange={(e) => handleConfigChange('notification', 'webhookUrl', e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                安全策略
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">密码最小长度</Label>
                  <Input 
                    id="passwordMinLength"
                    type="number"
                    value={config.security.passwordMinLength}
                    onChange={(e) => handleConfigChange('security', 'passwordMinLength', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">最大登录尝试次数</Label>
                  <Input 
                    id="maxLoginAttempts"
                    type="number"
                    value={config.security.maxLoginAttempts}
                    onChange={(e) => handleConfigChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">锁定时长(分钟)</Label>
                  <Input 
                    id="lockoutDuration"
                    type="number"
                    value={config.security.lockoutDuration}
                    onChange={(e) => handleConfigChange('security', 'lockoutDuration', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">密码复杂度要求</div>
                    <div className="text-sm text-muted-foreground">要求密码包含特殊字符</div>
                  </div>
                  <Switch 
                    checked={config.security.requireSpecialChar}
                    onCheckedChange={(checked) => handleConfigChange('security', 'requireSpecialChar', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">双因子认证</div>
                    <div className="text-sm text-muted-foreground">启用两步验证增强安全性</div>
                  </div>
                  <Switch 
                    checked={config.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleConfigChange('security', 'twoFactorAuth', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedIPs">允许访问的IP段</Label>
                <Textarea 
                  id="allowedIPs"
                  value={config.security.allowedIPs.join('\n')}
                  onChange={(e) => handleConfigChange('security', 'allowedIPs', e.target.value.split('\n'))}
                  placeholder="192.168.1.0/24"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                维护配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">自动备份</div>
                    <div className="text-sm text-muted-foreground">定期自动备份系统数据</div>
                  </div>
                  <Switch 
                    checked={config.maintenance.autoBackup}
                    onCheckedChange={(checked) => handleConfigChange('maintenance', 'autoBackup', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">性能监控</div>
                    <div className="text-sm text-muted-foreground">监控系统性能指标</div>
                  </div>
                  <Switch 
                    checked={config.maintenance.performanceMonitoring}
                    onCheckedChange={(checked) => handleConfigChange('maintenance', 'performanceMonitoring', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">调试模式</div>
                    <div className="text-sm text-muted-foreground">启用详细日志记录</div>
                  </div>
                  <Switch 
                    checked={config.maintenance.debugMode}
                    onCheckedChange={(checked) => handleConfigChange('maintenance', 'debugMode', checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backupInterval">备份间隔</Label>
                  <Select value={config.maintenance.backupInterval} onValueChange={(value) => handleConfigChange('maintenance', 'backupInterval', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">每小时</SelectItem>
                      <SelectItem value="daily">每天</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                      <SelectItem value="monthly">每月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logRetention">日志保留天数</Label>
                  <Input 
                    id="logRetention"
                    type="number"
                    value={config.maintenance.logRetention}
                    onChange={(e) => handleConfigChange('maintenance', 'logRetention', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出配置
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  导入配置
                </Button>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  立即备份
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}