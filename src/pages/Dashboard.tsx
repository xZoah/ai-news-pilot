import { Activity, Globe, FileText, AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const stats = [
  {
    title: "Posts Generated Today",
    value: "24",
    change: "+12%",
    icon: FileText,
    trend: "up"
  },
  {
    title: "Active Sources",
    value: "15",
    change: "+2",
    icon: Globe,
    trend: "up"
  },
  {
    title: "Errors (24h)",
    value: "2",
    change: "-5",
    icon: AlertTriangle,
    trend: "down"
  },
  {
    title: "Processing Time",
    value: "1.2s",
    change: "-0.3s",
    icon: Clock,
    trend: "down"
  }
];

const services = [
  { name: "AI Content Generator", status: "online", lastActive: "2 minutes ago" },
  { name: "News Scraper", status: "online", lastActive: "30 seconds ago" },
  { name: "Content Publisher", status: "warning", lastActive: "15 minutes ago" },
  { name: "Database", status: "online", lastActive: "1 minute ago" }
];

const recentActivity = [
  { action: "Generated new post", source: "TechCrunch", time: "2 min ago", status: "success" },
  { action: "Scraped articles", source: "Multiple sources", time: "5 min ago", status: "success" },
  { action: "Published post", source: "Telegram Channel", time: "8 min ago", status: "success" },
  { action: "Failed to process", source: "BBC News", time: "12 min ago", status: "error" },
  { action: "Updated source config", source: "Settings", time: "1 hour ago", status: "info" }
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
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your AI News system.
          </p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Activity className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Hero Section */}
      <Card className="gradient-card border-border/50 shadow-card">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold mb-2">AI-Powered News Aggregation</h2>
              <p className="text-muted-foreground mb-4">
                Your intelligent news aggregation system is running smoothly, processing articles 
                from multiple sources and generating engaging content for your audience.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline">View Sources</Button>
                <Button className="gradient-primary">Manage Content</Button>
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
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of all system services
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and events from your system
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
          <CardTitle>Next Scheduled Post</CardTitle>
          <CardDescription>
            Preview of the next post scheduled for publication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  🤖 AI Breakthrough: New Language Model Achieves Human-Level Performance
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Researchers have developed a revolutionary AI system that demonstrates 
                  unprecedented capabilities in natural language understanding and generation...
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>📅 Scheduled for: Today, 14:00</span>
                  <span>📊 Estimated reach: 1,200+ subscribers</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm" className="gradient-primary">Publish Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}