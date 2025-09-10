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
    if (forExport) {
      return 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 shadow-2xl border-2 border-blue-600/50';
    }
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
      case 'White': return 'text-gray-900 bg-white border-gray-300';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <Card 
      className={`p-8 ${getStyleClasses()} ${forExport ? 'max-w-5xl mx-auto' : ''}`} 
      id={forExport ? "export-preview" : "lineup-preview"}
    >
      <CardContent className="p-0">
        {/* Header with Logo and Info */}
        <div className={`text-center mb-8 pb-6 ${forExport ? 'border-b border-white/30' : 'border-b border-border'}`}>
          {forExport && (
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
          )}
          <div className="flex items-center justify-center mb-6 relative">
            <Trophy className={`h-16 w-16 ${forExport ? 'text-yellow-400' : 'text-foreground'} mr-4`} />
            <h2 className={`text-6xl font-bold ${forExport ? 'text-white' : 'text-foreground'}`}>
              CCL Cricket
            </h2>
          </div>
          <div className={`flex items-center justify-center gap-4 ${forExport ? 'text-blue-200' : 'text-muted-foreground'} mb-4`}>
            <Calendar className="h-5 w-5" />
            <span className="text-xl font-medium">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className={`text-4xl font-bold ${forExport ? 'text-white' : 'text-foreground'}`}>
            {forExport ? 'OFFICIAL MATCH LINEUP' : 'Match Lineup'}
          </div>
          {forExport && (
            <div className="text-blue-200 text-lg mt-2 font-medium">
              {lineup.teamA.name} vs {lineup.teamB.name}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Team A */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-3xl font-bold mb-3 ${forExport ? 'text-white' : 'text-foreground'}`}>
                {lineup.teamA.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Shirt className={`h-5 w-5 ${forExport ? 'text-blue-200' : ''}`} />
                <Badge className={`${getJerseyColorClass(lineup.teamA.jerseyColor)} border font-medium px-3 py-1`}>
                  {lineup.teamA.jerseyColor} Jersey
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              {lineup.teamA.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    forExport 
                      ? 'bg-white/10 border border-white/20 backdrop-blur-sm' 
                      : styleVariant === 'minimal' 
                        ? 'bg-background/50 border border-border' 
                        : 'bg-white/80 shadow-sm border border-gray-200'
                  } ${player.isCaptain ? 'ring-2 ring-yellow-400/50 bg-yellow-400/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant="secondary" 
                      className={`${getJerseyColorClass(lineup.teamA.jerseyColor)} font-bold min-w-[3rem] justify-center text-sm`}
                    >
                      #{player.number}
                    </Badge>
                    <span className={`font-medium text-lg ${forExport ? 'text-white' : 'text-foreground'}`}>
                      {player.name}
                    </span>
                  </div>
                  {player.isCaptain && (
                    <div className="flex items-center gap-2">
                      <Crown className="h-6 w-6 text-yellow-400" />
                      {forExport && <span className="text-yellow-400 text-sm font-bold">CAPTAIN</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team B */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className={`text-3xl font-bold mb-3 ${forExport ? 'text-white' : 'text-foreground'}`}>
                {lineup.teamB.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <Shirt className={`h-5 w-5 ${forExport ? 'text-blue-200' : ''}`} />
                <Badge className={`${getJerseyColorClass(lineup.teamB.jerseyColor)} border font-medium px-3 py-1`}>
                  {lineup.teamB.jerseyColor} Jersey
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              {lineup.teamB.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    forExport 
                      ? 'bg-white/10 border border-white/20 backdrop-blur-sm' 
                      : styleVariant === 'minimal' 
                        ? 'bg-background/50 border border-border' 
                        : 'bg-white/80 shadow-sm border border-gray-200'
                  } ${player.isCaptain ? 'ring-2 ring-yellow-400/50 bg-yellow-400/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant="secondary" 
                      className={`${getJerseyColorClass(lineup.teamB.jerseyColor)} font-bold min-w-[3rem] justify-center text-sm`}
                    >
                      #{player.number}
                    </Badge>
                    <span className={`font-medium text-lg ${forExport ? 'text-white' : 'text-foreground'}`}>
                      {player.name}
                    </span>
                  </div>
                  {player.isCaptain && (
                    <div className="flex items-center gap-2">
                      <Crown className="h-6 w-6 text-yellow-400" />
                      {forExport && <span className="text-yellow-400 text-sm font-bold">CAPTAIN</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 pt-6 ${forExport ? 'border-t border-white/30' : 'border-t border-border'} text-center`}>
          {forExport ? (
            <div className="space-y-2">
              <div className="text-white font-bold text-lg">CCL CRICKET CHAMPIONSHIP</div>
              <div className="text-blue-200 text-sm">Official Match Lineup • {new Date().getFullYear()}</div>
              <div className="text-blue-300 text-xs">Created with CCL Cricket Lineup Maker</div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Created with CCL Cricket Lineup Maker
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LineupPreview;