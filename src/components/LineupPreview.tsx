import React from 'react';
import { useTeam } from '@/contexts/TeamContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Shirt, Crown } from 'lucide-react';

interface LineupPreviewProps {
  forExport?: boolean;
}

const LineupPreview: React.FC<LineupPreviewProps> = ({ forExport = false }) => {
  const { lineup, styleVariant } = useTeam();

  const getStyleClasses = () => {
    switch (styleVariant) {
      case 'classic':
        return 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200';
      case 'minimal':
        return 'bg-background border border-border';
      default: // modern
        return 'gradient-card border border-primary/20';
    }
  };

  const getJerseyColorClass = (color: string) => {
    switch (color) {
      case 'Blue': return 'text-white bg-blue-600 border-blue-600';
      case 'White': return 'text-gray-800 bg-gray-100 border-gray-300';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <Card 
      className={`p-8 ${getStyleClasses()} ${forExport ? 'max-w-4xl mx-auto' : ''}`} 
      id={forExport ? "export-preview" : "lineup-preview"}
    >
      <CardContent className="p-0">
        {/* Header with Logo and Info */}
        <div className="text-center mb-8 pb-6 border-b border-border">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-foreground mr-3" />
            <h2 className="text-5xl font-bold text-foreground">
              CCL Cricket
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span className="text-lg">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="text-3xl font-bold text-foreground">Match Lineup</div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Team A */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {lineup.teamA.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Shirt className="h-4 w-4" />
                <Badge className={`${getJerseyColorClass(lineup.teamA.jerseyColor)} border`}>
                  {lineup.teamA.jerseyColor} Jersey
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              {lineup.teamA.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    styleVariant === 'minimal' 
                      ? 'bg-background/50 border border-border' 
                      : 'bg-white/80 shadow-sm border border-gray-200'
                  } ${player.isCaptain ? 'ring-2 ring-yellow-400/50 bg-yellow-50/50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`${getJerseyColorClass(lineup.teamA.jerseyColor)} font-bold min-w-[3rem] justify-center`}
                    >
                      #{player.number}
                    </Badge>
                    <span className="font-medium text-lg text-foreground">{player.name}</span>
                  </div>
                  {player.isCaptain && (
                    <Crown className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team B */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {lineup.teamB.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Shirt className="h-4 w-4" />
                <Badge className={`${getJerseyColorClass(lineup.teamB.jerseyColor)} border`}>
                  {lineup.teamB.jerseyColor} Jersey
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              {lineup.teamB.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    styleVariant === 'minimal' 
                      ? 'bg-background/50 border border-border' 
                      : 'bg-white/80 shadow-sm border border-gray-200'
                  } ${player.isCaptain ? 'ring-2 ring-yellow-400/50 bg-yellow-50/50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className={`${getJerseyColorClass(lineup.teamB.jerseyColor)} font-bold min-w-[3rem] justify-center`}
                    >
                      #{player.number}
                    </Badge>
                    <span className="font-medium text-lg text-foreground">{player.name}</span>
                  </div>
                  {player.isCaptain && (
                    <Crown className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          Created with CCL Cricket Lineup Maker
        </div>
      </CardContent>
    </Card>
  );
};

export default LineupPreview;