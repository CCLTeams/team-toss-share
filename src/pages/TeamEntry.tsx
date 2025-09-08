import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '@/contexts/TeamContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Crown, Trash2, ArrowRight, Users, Shirt } from 'lucide-react';

const TeamEntry = () => {
  const navigate = useNavigate();
  const { lineup, updateTeamName, updateTeamJerseyColor, addPlayer, removePlayer, toggleCaptain, updatePlayerName } = useTeam();
  const [newPlayerNames, setNewPlayerNames] = useState({ teamA: '', teamB: '' });

  const jerseyColors = [
    { value: 'Blue', label: '🔵 Blue' },
    { value: 'Red', label: '🔴 Red' },
    { value: 'Green', label: '🟢 Green' },
    { value: 'Yellow', label: '🟡 Yellow' },
    { value: 'Orange', label: '🟠 Orange' },
    { value: 'Purple', label: '🟣 Purple' }
  ];

  const handleAddPlayer = (teamId: 'teamA' | 'teamB') => {
    const name = newPlayerNames[teamId].trim();
    if (name) {
      addPlayer(teamId, name);
      setNewPlayerNames(prev => ({ ...prev, [teamId]: '' }));
    }
  };

  const canProceed = lineup.teamA.players.length > 0 && lineup.teamB.players.length > 0;

  return (
    <div className="min-h-screen field-bg p-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Team Lineup Maker
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Create your team lineups and share them instantly
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Team A */}
          <Card className="team-card border-team-a/20">
            <CardHeader className="bg-team-a/10 border-b border-team-a/20">
              <CardTitle className="flex items-center justify-between">
                <span className="text-team-a">Team A</span>
                <Badge variant="outline" className="border-team-a text-team-a">
                  {lineup.teamA.players.length} players
                </Badge>
              </CardTitle>
              <Input
                placeholder="Enter team name..."
                value={lineup.teamA.name}
                onChange={(e) => updateTeamName('teamA', e.target.value)}
                className="bg-background/50 border-team-a/30 focus:border-team-a"
              />
              <div className="flex items-center gap-2">
                <Shirt className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={lineup.teamA.jerseyColor} 
                  onValueChange={(value) => updateTeamJerseyColor('teamA', value)}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Jersey Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {jerseyColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* Add Player */}
              <div className="flex gap-2">
                <Input
                  placeholder="Player name..."
                  value={newPlayerNames.teamA}
                  onChange={(e) => setNewPlayerNames(prev => ({ ...prev, teamA: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer('teamA')}
                  className="bg-background/50"
                />
                <Button 
                  onClick={() => handleAddPlayer('teamA')}
                  size="icon"
                  className="btn-bounce bg-team-a hover:bg-team-a/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Players List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lineup.teamA.players.map((player) => (
                  <div
                    key={player.id}
                    className={`player-card p-3 rounded-lg flex items-center justify-between ${
                      player.isCaptain ? 'captain-glow' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-team-a/20 text-team-a">
                        #{player.number}
                      </Badge>
                      <Input
                        value={player.name}
                        onChange={(e) => updatePlayerName('teamA', player.id, e.target.value)}
                        className="bg-transparent border-none p-0 h-auto text-foreground font-medium"
                      />
                      {player.isCaptain && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => toggleCaptain('teamA', player.id)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-yellow-500/20"
                      >
                        <Crown className={`h-3 w-3 ${player.isCaptain ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        onClick={() => removePlayer('teamA', player.id)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team B */}
          <Card className="team-card border-team-b/20">
            <CardHeader className="bg-team-b/10 border-b border-team-b/20">
              <CardTitle className="flex items-center justify-between">
                <span className="text-team-b">Team B</span>
                <Badge variant="outline" className="border-team-b text-team-b">
                  {lineup.teamB.players.length} players
                </Badge>
              </CardTitle>
              <Input
                placeholder="Enter team name..."
                value={lineup.teamB.name}
                onChange={(e) => updateTeamName('teamB', e.target.value)}
                className="bg-background/50 border-team-b/30 focus:border-team-b"
              />
              <div className="flex items-center gap-2">
                <Shirt className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={lineup.teamB.jerseyColor} 
                  onValueChange={(value) => updateTeamJerseyColor('teamB', value)}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Jersey Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {jerseyColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* Add Player */}
              <div className="flex gap-2">
                <Input
                  placeholder="Player name..."
                  value={newPlayerNames.teamB}
                  onChange={(e) => setNewPlayerNames(prev => ({ ...prev, teamB: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer('teamB')}
                  className="bg-background/50"
                />
                <Button 
                  onClick={() => handleAddPlayer('teamB')}
                  size="icon"
                  className="btn-bounce bg-team-b hover:bg-team-b/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Players List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lineup.teamB.players.map((player) => (
                  <div
                    key={player.id}
                    className={`player-card p-3 rounded-lg flex items-center justify-between ${
                      player.isCaptain ? 'captain-glow' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-team-b/20 text-team-b">
                        #{player.number}
                      </Badge>
                      <Input
                        value={player.name}
                        onChange={(e) => updatePlayerName('teamB', player.id, e.target.value)}
                        className="bg-transparent border-none p-0 h-auto text-foreground font-medium"
                      />
                      {player.isCaptain && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => toggleCaptain('teamB', player.id)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-yellow-500/20"
                      >
                        <Crown className={`h-3 w-3 ${player.isCaptain ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        onClick={() => removePlayer('teamB', player.id)}
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="btn-bounce"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => navigate('/preview')}
            disabled={!canProceed}
            className="btn-bounce gradient-primary"
          >
            Preview Lineup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {!canProceed && (
          <p className="text-center text-muted-foreground mt-4">
            Add at least one player to each team to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamEntry;