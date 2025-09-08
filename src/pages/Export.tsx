import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/contexts/TeamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Download, 
  MessageSquare, 
  Copy, 
  Share2, 
  Crown,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

const Export = () => {
  const navigate = useNavigate();
  const { lineup } = useTeam();
  const { toast } = useToast();
  const [textFormat, setTextFormat] = useState('');

  React.useEffect(() => {
    generateTextFormat();
  }, [lineup]);

  const generateTextFormat = () => {
    const formatTeam = (team: typeof lineup.teamA) => {
      return team.players.map((player) => 
        `${player.number}. ${player.name}${player.isCaptain ? ' ⭐ (Captain)' : ''}`
      ).join('\n');
    };

    const text = `🏆 MATCH LINEUP 🏆

🔵 ${lineup.teamA.name.toUpperCase()}
${formatTeam(lineup.teamA)}

🔴 ${lineup.teamB.name.toUpperCase()}  
${formatTeam(lineup.teamB)}

📅 ${new Date().toLocaleDateString()}
⚽ Created with Team Lineup Maker`;

    setTextFormat(text);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textFormat);
      toast({
        title: "Copied to clipboard!",
        description: "The lineup has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const shareViaWhatsApp = () => {
    const encodedText = encodeURIComponent(textFormat);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Team Lineup',
          text: textFormat,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          toast({
            title: "Share failed",
            description: "Please copy and share manually.",
            variant: "destructive",
          });
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const downloadAsImage = () => {
    // For now, we'll show a toast indicating this feature is coming
    toast({
      title: "Image export coming soon!",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen field-bg p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Share2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Export & Share</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Text Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={textFormat}
                onChange={(e) => setTextFormat(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Generated text format will appear here..."
              />
              
              <div className="space-y-2">
                <Button
                  onClick={copyToClipboard}
                  className="w-full btn-bounce"
                  variant="outline"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                
                <Button
                  onClick={shareViaWhatsApp}
                  className="w-full btn-bounce bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Share via WhatsApp
                </Button>
                
                <Button
                  onClick={shareViaNative}
                  className="w-full btn-bounce gradient-primary"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {navigator.share ? 'Share' : 'Copy & Share'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Image Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview of lineup in compact format */}
              <div className="gradient-card p-6 rounded-lg border border-primary/20">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                    Match Lineup
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-sm font-semibold mt-2">
                    <span className="text-team-a">{lineup.teamA.name}</span>
                    <span className="text-muted-foreground">VS</span>
                    <span className="text-team-b">{lineup.teamB.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-team-a mb-2">{lineup.teamA.name}</h4>
                    {lineup.teamA.players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between mb-1">
                        <span>#{player.number} {player.name}</span>
                        {player.isCaptain && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-bold text-team-b mb-2">{lineup.teamB.name}</h4>
                    {lineup.teamB.players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between mb-1">
                        <span>#{player.number} {player.name}</span>
                        {player.isCaptain && <Crown className="h-3 w-3 text-yellow-500" />}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center text-xs text-muted-foreground mt-4 pt-2 border-t border-border">
                  {new Date().toLocaleDateString()} • Team Lineup Maker
                </div>
              </div>

              <Button
                onClick={downloadAsImage}
                className="w-full btn-bounce"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download as Image
                <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-team-a">{lineup.teamA.players.length}</div>
                <div className="text-sm text-muted-foreground">{lineup.teamA.name} Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-team-b">{lineup.teamB.players.length}</div>
                <div className="text-sm text-muted-foreground">{lineup.teamB.name} Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {lineup.teamA.players.filter(p => p.isCaptain).length + lineup.teamB.players.filter(p => p.isCaptain).length}
                </div>
                <div className="text-sm text-muted-foreground">Captains</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {lineup.teamA.players.length + lineup.teamB.players.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Players</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/preview')}
            className="btn-bounce"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Preview
          </Button>
          <Button
            onClick={() => navigate('/teams')}
            className="btn-bounce"
            variant="outline"
          >
            Create New Lineup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Export;