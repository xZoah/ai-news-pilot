import { useState } from "react";
import { Eye, EyeOff, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    navigate("/");
  };

  const handleGuestMode = () => {
    // Navigate to dashboard in read-only mode
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 gradient-glow">
      <div className="w-full max-w-md">
        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">AI News Aggregator</CardTitle>
            <CardDescription>
              Sign in to your admin panel to manage your AI news system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ai-news.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full gradient-primary shadow-glow">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue as
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGuestMode}
              className="w-full"
            >
              Continue as Guest
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Guest mode provides read-only access to the dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}