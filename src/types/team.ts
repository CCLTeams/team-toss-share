export interface Player {
  id: string;
  name: string;
  number: number;
  isCaptain: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface TeamLineup {
  teamA: Team;
  teamB: Team;
}

export type StyleVariant = 'classic' | 'modern' | 'minimal';