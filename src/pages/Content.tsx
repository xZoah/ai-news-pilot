import { useState } from "react";
import { Eye, Edit, Trash2, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockArticles = [
  {
    id: 1,
    title: "OpenAI представляет GPT-5 с революционными возможностями",
    source: "TechCrunch",
    status: "new",
    timestamp: "5 минут назад",
    content: "OpenAI представил GPT-5, отмечающий значительный прорыв в искусственном интеллекте..."
  },
  {
    id: 2,
    title: "Новые AR-очки Meta поступили на рынок",
    source: "The Verge",
    status: "new", 
    timestamp: "12 минут назад",
    content: "Meta официально запустила свои долгожданные AR-очки, обещая революционизировать..."
  }
];

const mockPosts = [
  {
    id: 1,
    title: "🤖 Прорыв в ИИ: новая языковая модель достигает человеческого уровня производительности",
    content: `Исследователи разработали революционную систему ИИ, которая демонстрирует беспрецедентные возможности в понимании и генерации естественного языка.

Новая модель показывает замечательные улучшения в:
• Сложных задачах рассуждения (+40% точности)
• Многоязычном понимании (95+ языков)
• Креативной генерации контента
• Написании и отладке кода

Этот прорыв может трансформировать отрасли от образования до здравоохранения, открывая новые возможности для сотрудничества человека и ИИ.

#AI #MachineLearning #Технологии #Инновации`,
    source: "Лаборатории исследований ИИ",
    status: "draft",
    timestamp: "30 минут назад",
    scheduledFor: "Сегодня, 14:00",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80"
  },
  {
    id: 2, 
    title: "🚀 Обновления космических технологий: миссия на Марс получает значительное увеличение финансирования",
    content: `Срочно: NASA объявляет о дополнительном финансировании в размере $2.5 млрд для предстоящей миссии на Марс, ускоряя график на 18 месяцев.

Ключевые разработки:
• Передовые системы движения готовы к тестированию
• Новые инструменты обнаружения жизни развернуты
• Международные партнерства укреплены
• Отбор экипажа начинается в следующем месяце

Эта историческая миссия нацелена на создание первого постоянного человеческого присутствия на Марсе к 2030 году.

#Космос #Марс #NASA #Исследования #Будущее`,
    source: "Сеть космических новостей",
    status: "draft",
    timestamp: "1 час назад",
    scheduledFor: "Завтра, 09:00",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80"
  }
];

const publishedPosts = [
  {
    id: 1,
    title: "🔬 Веха квантовых вычислений: достигнут 1000-кубитный процессор",
    publishedAt: "2 часа назад",
    engagement: { views: 1250, likes: 89, shares: 23 }
  },
  {
    id: 2,
    title: "🌱 Революция зеленых технологий: эффективность солнечных панелей преодолела 30% барьер",
    publishedAt: "6 часов назад", 
    engagement: { views: 2100, likes: 156, shares: 45 }
  }
];

function PostPreviewDialog({ post, open, onClose }: { 
  post: any; 
  open: boolean; 
  onClose: () => void; 
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Предварительный просмотр поста</DialogTitle>
        <DialogDescription>
          Так будет выглядеть ваш пост в Telegram
        </DialogDescription>
      </DialogHeader>
        
        <div className="bg-secondary/20 rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
          {post?.image && (
            <img 
              src={post.image} 
              alt="Post image"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
          
          <div className="space-y-2">
            <h3 className="font-bold text-lg">{post?.title}</h3>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {post?.content}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            <span>Канал AI Новостей</span>
            <span>{post?.scheduledFor}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KanbanColumn({ 
  title, 
  items, 
  status, 
  badge,
  children 
}: { 
  title: string; 
  items: any[];
  status: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="gradient-card border-border/50 flex-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}

export default function Content() {
  const [previewPost, setPreviewPost] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = (post: any) => {
    setPreviewPost(post);
    setPreviewOpen(true);
  };

  const handlePublish = (id: number) => {
    console.log("Publishing post", id);
    // In real app, this would call the API
  };

  const handleEdit = (post: any) => {
    console.log("Editing post", post.id);
    // In real app, this would open an edit dialog
  };

  const handleDelete = (id: number) => {
    console.log("Deleting post", id);
    // In real app, this would call the API
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Конвейер контента</h1>
          <p className="text-muted-foreground">
            Отслеживайте и управляйте вашим контентом от сырых статей до опубликованных постов.
          </p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Send className="w-4 h-4 mr-2" />
          Принудительно обработать статьи
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockArticles.length}</div>
            <p className="text-sm text-muted-foreground">Новых статей</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockPosts.length}</div>
            <p className="text-sm text-muted-foreground">Готовы к публикации</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
            <p className="text-sm text-muted-foreground">Опубликовано сегодня</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94%</div>
            <p className="text-sm text-muted-foreground">Успех обработки</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* New Articles Column */}
        <KanbanColumn 
          title="Новые статьи" 
          items={mockArticles}
          status="new"
          badge={`${mockArticles.length} элементов`}
        >
          {mockArticles.map((article) => (
            <div 
              key={article.id}
              className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Новая
                </Badge>
                <span className="text-xs text-muted-foreground">{article.timestamp}</span>
              </div>
              <h4 className="font-medium text-sm mb-2 line-clamp-2">{article.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {article.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.source}</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </KanbanColumn>

        {/* Ready to Publish Column */}
        <KanbanColumn 
          title="Готово к публикации" 
          items={mockPosts}
          status="draft"
          badge={`${mockPosts.length} черновиков`}
        >
          {mockPosts.map((post) => (
            <div 
              key={post.id}
              className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Черновик
                </Badge>
                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
              </div>
              
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post preview"
                  className="w-full h-20 object-cover rounded mb-3"
                />
              )}
              
              <h4 className="font-medium text-sm mb-2 line-clamp-2">{post.title}</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Запланировано: {post.scheduledFor}
              </p>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePreview(post)}
                  className="flex-1 h-7 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Просмотр
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(post)}
                  className="h-7 w-7 p-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handlePublish(post.id)}
                  className="gradient-primary h-7 px-2 text-xs"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Опубликовать
                </Button>
              </div>
            </div>
          ))}
        </KanbanColumn>

        {/* Published Column */}
        <KanbanColumn 
          title="Опубликовано" 
          items={publishedPosts}
          status="published"
          badge={`${publishedPosts.length} сегодня`}
        >
          {publishedPosts.map((post) => (
            <div 
              key={post.id}
              className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Опубликовано
                </Badge>
                <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
              </div>
              <h4 className="font-medium text-sm mb-3 line-clamp-2">{post.title}</h4>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Просмотры</span>
                  <span>{post.engagement.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Лайки</span>
                  <span>{post.engagement.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Репосты</span>
                  <span>{post.engagement.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </KanbanColumn>
      </div>

      <PostPreviewDialog
        post={previewPost}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
}