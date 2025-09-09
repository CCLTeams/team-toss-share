import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/contexts/TeamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, MessageSquare, Copy, Share2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

const Export = () => {
  const navigate = useNavigate();
  const { lineup } = useTeam();
  const { toast } = useToast();

  const formatLineupText = () => {
    const formatTeam = (team: typeof lineup.teamA) => {
      return team.players.map((player) => 
        `${player.number}. ${player.name}${player.isCaptain ? ' ⭐ (Captain)' : ''}`
      ).join('\n');
    };

    return `🏆 CCL CRICKET LINEUP 🏆

🔵 ${lineup.teamA.name.toUpperCase()} (${lineup.teamA.jerseyColor} Jersey)
${formatTeam(lineup.teamA)}

⚪ ${lineup.teamB.name.toUpperCase()} (${lineup.teamB.jerseyColor} Jersey)
${formatTeam(lineup.teamB)}

📅 ${new Date().toLocaleDateString()}
🏏 Created with CCL Cricket Lineup Maker`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatLineupText());
      toast({
        title: "Copied!",
        description: "Lineup copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareToWhatsApp = () => {
    const encodedText = encodeURIComponent(formatLineupText());
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const downloadImage = async () => {
    const previewElement = document.getElementById('lineup-preview');
    if (!previewElement) {
      toast({
        title: "Error",
        description: "Preview element not found",
        variant: "destructive",
      });
      return;
    }

    try {
      const canvas = await html2canvas(previewElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `ccl-cricket-lineup-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Lineup image saved to downloads",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen field-bg p-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Share2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Export & Share</h1>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          <Card className="team-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5" />
                Text Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">{formatLineupText()}</pre>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </Button>
                <Button onClick={shareToWhatsApp} variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="team-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download the lineup as an image to share on WhatsApp, social media, or save for later.
              </p>
              <Button onClick={downloadImage} className="w-full gradient-primary">
                <Download className="mr-2 h-4 w-4" />
                Download PNG Image
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