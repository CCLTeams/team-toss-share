import React, { createContext, useContext, useState } from 'react';
import { TeamLineup, StyleVariant } from '@/types/team';

interface TeamContextType {
  lineup: TeamLineup;
  styleVariant: StyleVariant;
  updateTeamName: (teamId: 'teamA' | 'teamB', name: string) => void;
  updateTeamJerseyColor: (teamId: 'teamA' | 'teamB', color: string) => void;
  addPlayer: (teamId: 'teamA' | 'teamB', name: string) => void;
  removePlayer: (teamId: 'teamA' | 'teamB', playerId: string) => void;
  toggleCaptain: (teamId: 'teamA' | 'teamB', playerId: string) => void;
  updatePlayerName: (teamId: 'teamA' | 'teamB', playerId: string, name: string) => void;
  setStyleVariant: (variant: StyleVariant) => void;
  resetLineup: () => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const initialLineup: TeamLineup = {
  teamA: {
    id: 'teamA',
    name: 'Team A',
    players: [],
    jerseyColor: 'Blue'
  },
  teamB: {
    id: 'teamB',
    name: 'Team B', 
    players: [],
    jerseyColor: 'White'
  }
};

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lineup, setLineup] = useState<TeamLineup>(initialLineup);
  const [styleVariant, setStyleVariant] = useState<StyleVariant>('modern');

  const updateTeamName = (teamId: 'teamA' | 'teamB', name: string) => {
    setLineup(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        name
      }
    }));
  };

  const updateTeamJerseyColor = (teamId: 'teamA' | 'teamB', color: string) => {
    setLineup(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        jerseyColor: color
      }
    }));
  };

  const addPlayer = (teamId: 'teamA' | 'teamB', name: string) => {
    setLineup(prev => {
      const team = prev[teamId];
      const newNumber = team.players.length + 1;
      const newPlayer = {
        id: `${teamId}-${Date.now()}`,
        name,
        number: newNumber,
        isCaptain: false
      };
      
      return {
        ...prev,
        [teamId]: {
          ...team,
          players: [...team.players, newPlayer]
        }
      };
    });
  };

  const removePlayer = (teamId: 'teamA' | 'teamB', playerId: string) => {
    setLineup(prev => {
      const team = prev[teamId];
      const filteredPlayers = team.players
        .filter(p => p.id !== playerId)
        .map((player, index) => ({ ...player, number: index + 1 }));
      
      return {
        ...prev,
        [teamId]: {
          ...team,
          players: filteredPlayers
        }
      };
    });
  };

  const toggleCaptain = (teamId: 'teamA' | 'teamB', playerId: string) => {
    setLineup(prev => {
      const team = prev[teamId];
      const updatedPlayers = team.players.map(player => ({
        ...player,
        isCaptain: player.id === playerId ? !player.isCaptain : false
      }));
      
      return {
        ...prev,
        [teamId]: {
          ...team,
          players: updatedPlayers
        }
      };
    });
  };

  const updatePlayerName = (teamId: 'teamA' | 'teamB', playerId: string, name: string) => {
    setLineup(prev => {
      const team = prev[teamId];
      const updatedPlayers = team.players.map(player => 
        player.id === playerId ? { ...player, name } : player
      );
      
      return {
        ...prev,
        [teamId]: {
          ...team,
          players: updatedPlayers
        }
      };
    });
  };

  const resetLineup = () => {
    setLineup(initialLineup);
  };

  return (
    <TeamContext.Provider value={{
      lineup,
      styleVariant,
      updateTeamName,
      updateTeamJerseyColor,
      addPlayer,
      removePlayer,
      toggleCaptain,
      updatePlayerName,
      setStyleVariant,
      resetLineup
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};