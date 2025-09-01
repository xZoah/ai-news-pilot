import { useState } from "react";
import { Plus, Edit, Trash2, Globe, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockSources = [
  { 
    id: 1, 
    name: "TechCrunch", 
    url: "https://techcrunch.com/feed/", 
    type: "rss", 
    isActive: true,
    lastSync: "2 minutes ago",
    articles: 156
  },
  { 
    id: 2, 
    name: "AI News Channel", 
    url: "https://t.me/ainewschannel", 
    type: "telegram", 
    isActive: true,
    lastSync: "5 minutes ago",
    articles: 89
  },
  { 
    id: 3, 
    name: "BBC Technology", 
    url: "https://feeds.bbci.co.uk/news/technology/rss.xml", 
    type: "rss", 
    isActive: false,
    lastSync: "2 hours ago",
    articles: 234
  },
  { 
    id: 4, 
    name: "The Verge", 
    url: "https://www.theverge.com/rss/index.xml", 
    type: "rss", 
    isActive: true,
    lastSync: "10 minutes ago",
    articles: 78
  }
];

function SourceIcon({ type }: { type: string }) {
  return type === 'telegram' ? 
    <MessageSquare className="w-4 h-4" /> : 
    <Globe className="w-4 h-4" />;
}

function SourceDialog({ source, onSave, onClose }: { 
  source?: any; 
  onSave: (data: any) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: source?.name || '',
    url: source?.url || '',
    type: source?.type || 'rss'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{source ? 'Edit Source' : 'Add New Source'}</DialogTitle>
        <DialogDescription>
          Configure a news source for your AI aggregation system.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Source Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., TechCrunch"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com/feed.xml"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Source Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rss">RSS Feed</SelectItem>
                <SelectItem value="telegram">Telegram Channel</SelectItem>
                <SelectItem value="website">Website Scraper</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="gradient-primary">
            {source ? 'Update' : 'Add'} Source
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default function Sources() {
  const [sources, setSources] = useState(mockSources);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);

  const handleToggleActive = (id: number) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, isActive: !source.isActive } : source
    ));
  };

  const handleEdit = (source: any) => {
    setEditingSource(source);
    setDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSources(sources.filter(source => source.id !== id));
  };

  const handleSave = (data: any) => {
    if (editingSource) {
      setSources(sources.map(source => 
        source.id === editingSource.id ? { ...source, ...data } : source
      ));
    } else {
      const newSource = {
        id: Date.now(),
        ...data,
        isActive: true,
        lastSync: "Never",
        articles: 0
      };
      setSources([...sources, newSource]);
    }
    setEditingSource(null);
  };

  const handleAddNew = () => {
    setEditingSource(null);
    setDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News Sources</h1>
          <p className="text-muted-foreground">
            Manage and configure your news sources for content aggregation.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="gradient-primary shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </DialogTrigger>
          <SourceDialog 
            source={editingSource} 
            onSave={handleSave}
            onClose={() => setDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sources.length}</div>
            <p className="text-sm text-muted-foreground">Total Sources</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sources.filter(s => s.isActive).length}</div>
            <p className="text-sm text-muted-foreground">Active Sources</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sources.reduce((sum, s) => sum + s.articles, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Articles</p>
          </CardContent>
        </Card>
      </div>

      {/* Sources Table */}
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Configured Sources</CardTitle>
          <CardDescription>
            All news sources currently configured in your system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sources.map((source) => (
              <div 
                key={source.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 transition-smooth hover:bg-secondary/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <SourceIcon type={source.type} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{source.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {source.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {source.url}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>Last sync: {source.lastSync}</span>
                      <span>Articles: {source.articles}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`active-${source.id}`} className="text-sm">
                      Active
                    </Label>
                    <Switch
                      id={`active-${source.id}`}
                      checked={source.isActive}
                      onCheckedChange={() => handleToggleActive(source.id)}
                    />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(source.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(source)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(source.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}