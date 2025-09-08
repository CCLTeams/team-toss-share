import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  Share2, 
  Play, 
  Trophy,
  Zap,
  ArrowRight 
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen field-bg">
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="h-12 w-12 text-primary" />
            <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
              Team Lineup
            </h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Create • Preview • Share
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The fastest way to create professional team lineups and share them instantly 
            via WhatsApp, Telegram, or any messaging app.
          </p>
          
          <Button 
            onClick={() => navigate('/teams')}
            size="lg"
            className="btn-bounce gradient-primary text-lg px-8 py-6"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="team-card border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-team-a mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy Team Building</h3>
              <p className="text-muted-foreground">
                Add players, assign numbers, and mark captains with just a few clicks.
              </p>
            </CardContent>
          </Card>

          <Card className="team-card border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Live Preview</h3>
              <p className="text-muted-foreground">
                See exactly how your lineup will look with multiple style options.
              </p>
            </CardContent>
          </Card>

          <Card className="team-card border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center">
              <Share2 className="h-12 w-12 text-team-b mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Sharing</h3>
              <p className="text-muted-foreground">
                Export as text or image and share directly to WhatsApp and more.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-team-a/20 text-team-a border-team-a px-4 py-2 text-lg">
                Step 1
              </Badge>
              <div className="player-card p-6 rounded-lg">
                <Users className="h-8 w-8 text-team-a mx-auto mb-3" />
                <h4 className="font-bold mb-2">Create Teams</h4>
                <p className="text-sm text-muted-foreground">
                  Enter team names and add players with automatic numbering
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary px-4 py-2 text-lg">
                Step 2
              </Badge>
              <div className="player-card p-6 rounded-lg">
                <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">Preview & Style</h4>
                <p className="text-sm text-muted-foreground">
                  Choose from different styles and see your lineup preview
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Badge variant="outline" className="bg-team-b/20 text-team-b border-team-b px-4 py-2 text-lg">
                Step 3
              </Badge>
              <div className="player-card p-6 rounded-lg">
                <Share2 className="h-8 w-8 text-team-b mx-auto mb-3" />
                <h4 className="font-bold mb-2">Export & Share</h4>
                <p className="text-sm text-muted-foreground">
                  Share via WhatsApp, copy text, or download as image
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <Card className="gradient-card border-primary/20 mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose Team Lineup Maker?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Lightning-fast lineup creation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Automatic player numbering</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Captain selection with visual indicators</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <span>Multiple preview styles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-primary" />
                  <span>Direct WhatsApp integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>No registration required</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to create your first lineup?
          </p>
          <Button 
            onClick={() => navigate('/teams')}
            size="lg"
            className="btn-bounce gradient-primary text-lg px-8 py-6"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
