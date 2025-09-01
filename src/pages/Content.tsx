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
    title: "OpenAI Announces GPT-5 with Revolutionary Capabilities",
    source: "TechCrunch",
    status: "new",
    timestamp: "5 minutes ago",
    content: "OpenAI has unveiled GPT-5, marking a significant leap forward in artificial intelligence..."
  },
  {
    id: 2,
    title: "Meta's New AR Glasses Hit the Market",
    source: "The Verge",
    status: "new", 
    timestamp: "12 minutes ago",
    content: "Meta has officially launched their highly anticipated AR glasses, promising to revolutionize..."
  }
];

const mockPosts = [
  {
    id: 1,
    title: "🤖 AI Breakthrough: New Language Model Achieves Human-Level Performance",
    content: `Researchers have developed a revolutionary AI system that demonstrates unprecedented capabilities in natural language understanding and generation.

The new model shows remarkable improvements in:
• Complex reasoning tasks (+40% accuracy)
• Multilingual comprehension (95+ languages)
• Creative content generation
• Code writing and debugging

This breakthrough could transform industries from education to healthcare, opening new possibilities for human-AI collaboration.

#AI #MachineLearning #Technology #Innovation`,
    source: "AI Research Labs",
    status: "draft",
    timestamp: "30 minutes ago",
    scheduledFor: "Today, 14:00",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80"
  },
  {
    id: 2, 
    title: "🚀 Space Tech Update: Mars Mission Gets Major Funding Boost",
    content: `Breaking: NASA announces $2.5B additional funding for the upcoming Mars mission, accelerating timeline by 18 months.

Key developments:
• Advanced propulsion systems ready for testing
• New life detection instruments deployed
• International partnerships strengthened
• Crew selection process begins next month

This historic mission aims to establish the first permanent human presence on Mars by 2030.

#Space #Mars #NASA #Exploration #Future`,
    source: "Space News Network",
    status: "draft",
    timestamp: "1 hour ago",
    scheduledFor: "Tomorrow, 09:00",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&q=80"
  }
];

const publishedPosts = [
  {
    id: 1,
    title: "🔬 Quantum Computing Milestone: 1000-Qubit Processor Achieved",
    publishedAt: "2 hours ago",
    engagement: { views: 1250, likes: 89, shares: 23 }
  },
  {
    id: 2,
    title: "🌱 Green Tech Revolution: Solar Efficiency Breaks 30% Barrier",
    publishedAt: "6 hours ago", 
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
          <DialogTitle>Post Preview</DialogTitle>
          <DialogDescription>
            This is how your post will appear in Telegram
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
            <span>AI News Channel</span>
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
          <h1 className="text-3xl font-bold tracking-tight">Content Pipeline</h1>
          <p className="text-muted-foreground">
            Monitor and manage your content from raw articles to published posts.
          </p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Send className="w-4 h-4 mr-2" />
          Force Process Articles
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockArticles.length}</div>
            <p className="text-sm text-muted-foreground">New Articles</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockPosts.length}</div>
            <p className="text-sm text-muted-foreground">Ready to Publish</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
            <p className="text-sm text-muted-foreground">Published Today</p>
          </CardContent>
        </Card>
        <Card className="gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">94%</div>
            <p className="text-sm text-muted-foreground">Processing Success</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* New Articles Column */}
        <KanbanColumn 
          title="New Articles" 
          items={mockArticles}
          status="new"
          badge={`${mockArticles.length} items`}
        >
          {mockArticles.map((article) => (
            <div 
              key={article.id}
              className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  New
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
          title="Ready to Publish" 
          items={mockPosts}
          status="draft"
          badge={`${mockPosts.length} drafts`}
        >
          {mockPosts.map((post) => (
            <div 
              key={post.id}
              className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Draft
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
                Scheduled: {post.scheduledFor}
              </p>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePreview(post)}
                  className="flex-1 h-7 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
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
                  Publish
                </Button>
              </div>
            </div>
          ))}
        </KanbanColumn>

        {/* Published Column */}
        <KanbanColumn 
          title="Published" 
          items={publishedPosts}
          status="published"
          badge={`${publishedPosts.length} today`}
        >
          {publishedPosts.map((post) => (
            <div 
              key={post.id}
              className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Published
                </Badge>
                <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
              </div>
              <h4 className="font-medium text-sm mb-3 line-clamp-2">{post.title}</h4>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Views</span>
                  <span>{post.engagement.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Likes</span>
                  <span>{post.engagement.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shares</span>
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