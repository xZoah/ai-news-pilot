import { Activity, Globe, FileText, AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const stats = [
  {
    title: "Постов создано сегодня",
    value: "24",
    change: "+12%",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Активных источников",
    value: "15",
    change: "+2",
    icon: Globe,
    trend: "up"
  },
  {
    title: "Ошибок (24ч)",
    value: "2",
    change: "-5",
    icon: AlertTriangle,
    trend: "down"
  },
  {
    title: "Время обработки",
    value: "1.2с",
    change: "-0.3с",
    icon: Clock,
    trend: "down"
  }
];

const services = [
  { name: "Генератор AI контента", status: "online", lastActive: "2 минуты назад" },
  { name: "Парсер новостей", status: "online", lastActive: "30 секунд назад" },
  { name: "Публикатор контента", status: "warning", lastActive: "15 минут назад" },
  { name: "База данных", status: "online", lastActive: "1 минута назад" }
];

const recentActivity = [
  { action: "Создан новый пост", source: "TechCrunch", time: "2 мин назад", status: "success" },
  { action: "Статьи спаршены", source: "Несколько источников", time: "5 мин назад", status: "success" },
  { action: "Пост опубликован", source: "Telegram канал", time: "8 мин назад", status: "success" },
  { action: "Ошибка обработки", source: "BBC News", time: "12 мин назад", status: "error" },
  { action: "Обновлена конфигурация источника", source: "Настройки", time: "1 час назад", status: "info" }
];

function StatusBadge({ status }: { status: string }) {
  const variants = {
    online: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    offline: "bg-destructive/10 text-destructive border-destructive/20"
  };
  
  return (
    <Badge variant="outline" className={variants[status as keyof typeof variants]}>
      <div className={`w-2 h-2 rounded-full mr-2 ${
        status === 'online' ? 'bg-success' : 
        status === 'warning' ? 'bg-warning' : 'bg-destructive'
      }`} />
      {status === 'online' ? 'Онлайн' : 
       status === 'warning' ? 'Предупреждение' : 'Оффлайн'}
    </Badge>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
          <p className="text-muted-foreground">
            Добро пожаловать! Вот что происходит с вашей системой AI новостей.
          </p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Activity className="w-4 h-4 mr-2" />
          Просмотр аналитики
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="gradient-card border-border/50 shadow-card">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold mb-2">Агрегация новостей с помощью ИИ</h2>
              <p className="text-muted-foreground mb-4">
                Ваша интеллектуальная система агрегации новостей работает исправно, обрабатывая статьи 
                из множества источников и создавая привлекательный контент для вашей аудитории.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline">Просмотр источников</Button>
                <Button className="gradient-primary">Управление контентом</Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={dashboardHero} 
                alt="AI Dashboard" 
                className="w-80 h-48 object-cover rounded-r-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="gradient-card border-border/50 transition-smooth hover:shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {stat.change} с вчерашнего дня
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Состояние системы</CardTitle>
            <CardDescription>
              Текущее состояние всех системных сервисов
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.lastActive}</p>
                </div>
                <StatusBadge status={service.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Недавняя активность</CardTitle>
            <CardDescription>
              Последние действия и события в вашей системе
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'error' ? 'bg-destructive' :
                  'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.source} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Next Post Preview */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Следующий запланированный пост</CardTitle>
          <CardDescription>
            Предварительный просмотр следующего поста, запланированного для публикации
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  🤖 Прорыв в ИИ: новая языковая модель достигает человеческого уровня производительности
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Исследователи разработали революционную систему ИИ, которая демонстрирует 
                  беспрецедентные возможности в понимании и генерации естественного языка...
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>📅 Запланировано на: Сегодня, 14:00</span>
                  <span>📊 Ожидаемый охват: 1200+ подписчиков</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">Редактировать</Button>
              <Button size="sm" className="gradient-primary">Опубликовать сейчас</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}