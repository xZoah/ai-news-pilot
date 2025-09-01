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
  { id: 1, keyword: "artificial intelligence", weight: 10 },
  { id: 2, keyword: "machine learning", weight: 8 },
  { id: 3, keyword: "neural network", weight: 7 },
  { id: 4, keyword: "deep learning", weight: 9 },
  { id: 5, keyword: "robotics", weight: 6 }
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
    digestPrompt: `You are an AI news aggregator. Transform the following articles into engaging, informative posts for a Telegram channel focused on AI and technology news.

Guidelines:
- Use emojis to make posts visually appealing
- Keep posts concise but informative (max 500 characters)
- Include relevant hashtags
- Maintain a professional yet engaging tone
- Focus on the most important aspects of each story`,
    imagePrompt: "Create a modern, tech-focused illustration for this AI/technology news article. Use a clean, professional style with blue and purple gradients. The image should be visually appealing for social media.",
    scraperInterval: "2",
    publishTime: "09:00"
  });

  const [scoringRules, setScoringRules] = useState(mockScoringRules);
  const [newRule, setNewRule] = useState({ keyword: "", weight: "" });
  const { toast } = useToast();

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully.",
    });
  };

  const handleSaveAI = () => {
    toast({
      title: "AI settings saved", 
      description: "AI model and prompt settings have been updated.",
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
        title: "Rule added",
        description: "New scoring rule has been added successfully.",
      });
    }
  };

  const handleDeleteRule = (id: number) => {
    setScoringRules(scoringRules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "Scoring rule has been removed.",
    });
  };

  const handleSaveSchedule = () => {
    toast({
      title: "Schedule updated",
      description: "Automation schedule has been saved.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your AI news aggregation system.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>AI & Prompts</span>
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Scoring Rules</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Schedule</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>General Configuration</CardTitle>
              <CardDescription>
                Configure API keys and basic system settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                    <Input
                      id="telegram-token"
                      type="password"
                      value={settings.telegramToken}
                      onChange={(e) => setSettings({...settings, telegramToken: e.target.value})}
                      placeholder="Enter your Telegram bot token"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channel-id">Telegram Channel ID</Label>
                    <Input
                      id="channel-id"
                      value={settings.channelId}
                      onChange={(e) => setSettings({...settings, channelId: e.target.value})}
                      placeholder="@your_channel_name"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <Input
                      id="openai-key"
                      type="password"
                      value={settings.openaiKey}
                      onChange={(e) => setSettings({...settings, openaiKey: e.target.value})}
                      placeholder="sk-..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key">Gemini API Key</Label>
                    <Input
                      id="gemini-key"
                      type="password" 
                      value={settings.geminiKey}
                      onChange={(e) => setSettings({...settings, geminiKey: e.target.value})}
                      placeholder="AIza..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stability-key">Stability AI Key</Label>
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
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI & Prompts */}
        <TabsContent value="ai">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>AI Model Configuration</CardTitle>
              <CardDescription>
                Configure AI models and customize prompts for content generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-llm">Primary LLM</Label>
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
                  <Label htmlFor="fallback-llm">Fallback LLM</Label>
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
                <Label htmlFor="digest-prompt">Content Generation Prompt</Label>
                <Textarea
                  id="digest-prompt"
                  value={settings.digestPrompt}
                  onChange={(e) => setSettings({...settings, digestPrompt: e.target.value})}
                  className="min-h-32"
                  placeholder="Enter your system prompt for content generation..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-prompt">Image Generation Prompt</Label>
                <Textarea
                  id="image-prompt"
                  value={settings.imagePrompt}
                  onChange={(e) => setSettings({...settings, imagePrompt: e.target.value})}
                  className="min-h-24"
                  placeholder="Enter your prompt template for image generation..."
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAI} className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scoring Rules */}
        <TabsContent value="scoring">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Content Scoring Rules</CardTitle>
              <CardDescription>
                Define keywords and their weights to prioritize content based on relevance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Rule */}
              <div className="flex space-x-4 p-4 bg-secondary/30 rounded-lg">
                <Input
                  placeholder="Keyword (e.g., artificial intelligence)"
                  value={newRule.keyword}
                  onChange={(e) => setNewRule({...newRule, keyword: e.target.value})}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={newRule.weight}
                  onChange={(e) => setNewRule({...newRule, weight: e.target.value})}
                  className="w-24"
                />
                <Button onClick={handleAddRule} className="gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </Button>
              </div>

              {/* Rules List */}
              <div className="space-y-3">
                {scoringRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{rule.keyword}</span>
                      <Badge variant="outline">Weight: {rule.weight}</Badge>
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
                  Save Scoring Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="schedule">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Automation Schedule</CardTitle>
              <CardDescription>
                Configure when your system should automatically scrape and publish content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="scraper-interval">Scraper Interval (hours)</Label>
                  <Select value={settings.scraperInterval} onValueChange={(value) => setSettings({...settings, scraperInterval: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every hour</SelectItem>
                      <SelectItem value="2">Every 2 hours</SelectItem>
                      <SelectItem value="4">Every 4 hours</SelectItem>
                      <SelectItem value="6">Every 6 hours</SelectItem>
                      <SelectItem value="12">Every 12 hours</SelectItem>
                      <SelectItem value="24">Once per day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publish-time">Daily Publish Time</Label>
                  <Input
                    id="publish-time"
                    type="time"
                    value={settings.publishTime}
                    onChange={(e) => setSettings({...settings, publishTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-2">Current Schedule</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Content scraping: Every {settings.scraperInterval} hour(s)</li>
                  <li>• Daily publication: {settings.publishTime}</li>
                  <li>• Next scrape: In 1 hour 23 minutes</li>
                  <li>• Next publication: Today at {settings.publishTime}</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSchedule} className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}