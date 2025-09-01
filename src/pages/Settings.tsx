import { useState } from "react";
import { Save, Key, Bot, Target, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockScoringRules = [
  { id: 1, keyword: "искусственный интеллект", weight: 10 },
  { id: 2, keyword: "машинное обучение", weight: 8 },
  { id: 3, keyword: "нейронная сеть", weight: 7 },
  { id: 4, keyword: "глубокое обучение", weight: 9 },
  { id: 5, keyword: "робототехника", weight: 6 }
];

export default function Settings() {
  const [settings, setSettings] = useState({
    telegramToken: "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    channelId: "@ai_news_channel",
    openaiKey: "sk-...",
    geminiKey: "AIza...",
    stabilityKey: "sk-...",
    primaryLLM: "openai",
    fallbackLLM: "gemini",
    digestPrompt: `Вы - агрегатор AI новостей. Преобразуйте следующие статьи в интересные, информативные посты для Telegram канала, посвященного AI и технологическим новостям.

Рекомендации:
- Используйте эмодзи, чтобы сделать посты визуально привлекательными
- Делайте посты краткими, но информативными (максимум 500 символов)
- Включайте соответствующие хештеги
- Поддерживайте профессиональный, но увлекательный тон
- Сосредоточьтесь на наиболее важных аспектах каждой истории`,
    imagePrompt: "Создайте современную, технически ориентированную иллюстрацию для этой статьи об ИИ/технологиях. Используйте чистый профессиональный стиль с синими и фиолетовыми градиентами. Изображение должно быть визуально привлекательным для социальных сетей.",
    scraperInterval: "2",
    publishTime: "09:00"
  });

  const [scoringRules, setScoringRules] = useState(mockScoringRules);
  const [newRule, setNewRule] = useState({ keyword: "", weight: "" });
  const { toast } = useToast();

  const handleSaveGeneral = () => {
    toast({
      title: "Настройки сохранены",
      description: "Общие настройки были успешно обновлены.",
    });
  };

  const handleSaveAI = () => {
    toast({
      title: "Настройки ИИ сохранены", 
      description: "Настройки модели ИИ и промптов были обновлены.",
    });
  };

  const handleAddRule = () => {
    if (newRule.keyword && newRule.weight) {
      setScoringRules([...scoringRules, {
        id: Date.now(),
        keyword: newRule.keyword,
        weight: parseInt(newRule.weight)
      }]);
      setNewRule({ keyword: "", weight: "" });
      toast({
        title: "Правило добавлено",
        description: "Новое правило оценки было успешно добавлено.",
      });
    }
  };

  const handleDeleteRule = (id: number) => {
    setScoringRules(scoringRules.filter(rule => rule.id !== id));
    toast({
      title: "Правило удалено",
      description: "Правило оценки было удалено.",
    });
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Расписание обновлено",
      description: "Расписание автоматизации было сохранено.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
          <p className="text-muted-foreground">
            Настройте вашу систему агрегации AI новостей.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>Общие</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>ИИ и Промпты</span>
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Правила оценки</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Расписание</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>
                Настройте API ключи и основные системные параметры.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="telegram-token">Токен Telegram бота</Label>
                    <Input
                      id="telegram-token"
                      type="password"
                      value={settings.telegramToken}
                      onChange={(e) => setSettings({...settings, telegramToken: e.target.value})}
                      placeholder="Введите токен вашего Telegram бота"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channel-id">ID Telegram канала</Label>
                    <Input
                      id="channel-id"
                      value={settings.channelId}
                      onChange={(e) => setSettings({...settings, channelId: e.target.value})}
                      placeholder="@ваш_канал"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">API ключ OpenAI</Label>
                    <Input
                      id="openai-key"
                      type="password"
                      value={settings.openaiKey}
                      onChange={(e) => setSettings({...settings, openaiKey: e.target.value})}
                      placeholder="sk-..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key">API ключ Gemini</Label>
                    <Input
                      id="gemini-key"
                      type="password" 
                      value={settings.geminiKey}
                      onChange={(e) => setSettings({...settings, geminiKey: e.target.value})}
                      placeholder="AIza..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stability-key">Ключ Stability AI</Label>
                    <Input
                      id="stability-key"
                      type="password"
                      value={settings.stabilityKey}
                      onChange={(e) => setSettings({...settings, stabilityKey: e.target.value})}
                      placeholder="sk-..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral} className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить общие настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI & Prompts */}
        <TabsContent value="ai">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Настройка модели ИИ</CardTitle>
              <CardDescription>
                Настройте модели ИИ и кастомизируйте промпты для генерации контента.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-llm">Основная LLM</Label>
                  <Select value={settings.primaryLLM} onValueChange={(value) => setSettings({...settings, primaryLLM: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                      <SelectItem value="gemini">Google Gemini Pro</SelectItem>
                      <SelectItem value="claude">Anthropic Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fallback-llm">Резервная LLM</Label>
                  <Select value={settings.fallbackLLM} onValueChange={(value) => setSettings({...settings, fallbackLLM: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini Pro</SelectItem>
                      <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                      <SelectItem value="claude">Anthropic Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="digest-prompt">Промпт для генерации контента</Label>
                <Textarea
                  id="digest-prompt"
                  value={settings.digestPrompt}
                  onChange={(e) => setSettings({...settings, digestPrompt: e.target.value})}
                  className="min-h-32"
                  placeholder="Введите ваш системный промпт для генерации контента..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-prompt">Промпт для генерации изображений</Label>
                <Textarea
                  id="image-prompt"
                  value={settings.imagePrompt}
                  onChange={(e) => setSettings({...settings, imagePrompt: e.target.value})}
                  className="min-h-24"
                  placeholder="Введите ваш шаблон промпта для генерации изображений..."
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAI} className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки ИИ
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scoring Rules */}
        <TabsContent value="scoring">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Правила оценки контента</CardTitle>
              <CardDescription>
                Определите ключевые слова и их веса для приоритизации контента по релевантности.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Rule */}
              <div className="flex space-x-4 p-4 bg-secondary/30 rounded-lg">
                <Input
                  placeholder="Ключевое слово (например, искусственный интеллект)"
                  value={newRule.keyword}
                  onChange={(e) => setNewRule({...newRule, keyword: e.target.value})}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Вес"
                  value={newRule.weight}
                  onChange={(e) => setNewRule({...newRule, weight: e.target.value})}
                  className="w-24"
                />
                <Button onClick={handleAddRule} className="gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить правило
                </Button>
              </div>

              {/* Rules List */}
              <div className="space-y-3">
                {scoringRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{rule.keyword}</span>
                      <Badge variant="outline">Вес: {rule.weight}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить правила оценки
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="schedule">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Расписание автоматизации</CardTitle>
              <CardDescription>
                Настройте, когда ваша система должна автоматически собирать и публиковать контент.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="scraper-interval">Интервал парсера (часы)</Label>
                  <Select value={settings.scraperInterval} onValueChange={(value) => setSettings({...settings, scraperInterval: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Каждый час</SelectItem>
                      <SelectItem value="2">Каждые 2 часа</SelectItem>
                      <SelectItem value="4">Каждые 4 часа</SelectItem>
                      <SelectItem value="6">Каждые 6 часов</SelectItem>
                      <SelectItem value="12">Каждые 12 часов</SelectItem>
                      <SelectItem value="24">Раз в день</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publish-time">Время ежедневной публикации</Label>
                  <Input
                    id="publish-time"
                    type="time"
                    value={settings.publishTime}
                    onChange={(e) => setSettings({...settings, publishTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-2">Текущее расписание</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Парсинг контента: Каждые {settings.scraperInterval} час(ов)</li>
                  <li>• Ежедневная публикация: {settings.publishTime}</li>
                  <li>• Следующий парсинг: Через 1 час 23 минуты</li>
                  <li>• Следующая публикация: Сегодня в {settings.publishTime}</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSchedule} className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить расписание
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}