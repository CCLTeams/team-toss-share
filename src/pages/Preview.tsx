import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/contexts/TeamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Crown, Eye, Palette } from 'lucide-react';
import { StyleVariant } from '@/types/team';

const Preview = () => {
  const navigate = useNavigate();
  const { lineup, styleVariant, setStyleVariant } = useTeam();

  const styleOptions: { value: StyleVariant; label: string }[] = [
    { value: 'classic', label: 'Classic' },
    { value: 'modern', label: 'Modern' },
    { value: 'minimal', label: 'Minimal' }
  ];

  const getStyleClasses = () => {
    switch (styleVariant) {
      case 'classic':
        return 'bg-gradient-to-br from-green-900/20 to-green-700/20 border border-green-500/30';
      case 'minimal':
        return 'bg-background/50 border border-border';
      default: // modern
        return 'gradient-card border border-primary/20';
    }
  };

  return (
    <div className="min-h-screen field-bg p-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Eye className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Preview Lineup</h1>
          </div>
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <Select value={styleVariant} onValueChange={setStyleVariant}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Match Preview */}
        <Card className={`mb-8 p-8 ${getStyleClasses()}`} id="lineup-preview">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
                Match Lineup
              </h2>
              <div className="flex items-center justify-center gap-6 text-2xl font-semibold">
                <span className="text-team-a">{lineup.teamA.name}</span>
                <span className="text-muted-foreground">VS</span>
                <span className="text-team-b">{lineup.teamB.name}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Team A */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-team-a border-b border-team-a/20 pb-2">
                  {lineup.teamA.name}
                </h3>
                <div className="space-y-2">
                  {lineup.teamA.players.map((player) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        styleVariant === 'minimal' 
                          ? 'bg-background/30' 
                          : 'player-card'
                      } ${player.isCaptain ? 'ring-2 ring-yellow-500/50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-team-a/20 text-team-a font-bold min-w-[2.5rem] justify-center"
                        >
                          #{player.number}
                        </Badge>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      {player.isCaptain && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team B */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-team-b border-b border-team-b/20 pb-2">
                  {lineup.teamB.name}
                </h3>
                <div className="space-y-2">
                  {lineup.teamB.players.map((player) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        styleVariant === 'minimal' 
                          ? 'bg-background/30' 
                          : 'player-card'
                      } ${player.isCaptain ? 'ring-2 ring-yellow-500/50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-team-b/20 text-team-b font-bold min-w-[2.5rem] justify-center"
                        >
                          #{player.number}
                        </Badge>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      {player.isCaptain && (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Match Info */}
            <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
              Created with Team Lineup Maker • {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/teams')}
            className="btn-bounce"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Edit Teams
          </Button>
          <Button
            onClick={() => navigate('/export')}
            className="btn-bounce gradient-primary"
          >
            Export & Share
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;