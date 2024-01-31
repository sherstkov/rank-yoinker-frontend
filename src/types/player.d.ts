type RankInfo = {
  tierName: string;
  smallIcon: string;
  largeIcon: string;
};

type AgentInfo = {
  displayName: string;
  displayIcon: string;
  killfeedPortrait: string;
};

type MatchInfo = {
  isWon: boolean;
  Agent: AgentInfo;
  matchID: string;
};

export type PlayerInfo = {
  uuid: string;
  name: string;
  rank: RankInfo;
  peakRank: RankInfo;
  previous_rank: RankInfo;
  rr: number;
  kd: number;
  level: number;
  wr: number | string;
  games_played: number;
  agent: AgentInfo;
  adr: number;
  matches: MatchInfo[];
  party_id: string;
  color: string;
  teamID: "Blue" | "Red";
  peakRankAct: "string";
};

export type AlreadyPlayed = {
  times: number;
  name: string;
  agent: string;
  time_diff: number;
  matchesIDs: string[];
};

export type IngameData = {
  players: PlayerInfo[];
  server: string;
  gameState: "In-Game" | "Menus" | "Pre-Game";
  already_played_with: AlreadyPlayed[];
  type?: "matchStats";
};

export type MatchStatsLoading = {
  totalPlayers: number;
  loadedPlayers: number;
  status: "active" | "idle";
  type?: "matchStatsLoading";
};

export type ReplayData = {
  roundsData: Round[][];
  map: ReplayMapInfo;
  type?: "replayMatch";
};

export type ReplayMapInfo = {
  image: string;
  name: string;
  startTime: number;
};

export type Round = {
  eventTime: number;
  playerLocations: PlayerReplayInfo[];
};

export type PlayerReplayInfo = {
  coords: { x: number; y: number };
  subjectInfo: SubjectInfo;
  viewRadians?: number;
};

export type SubjectInfo = {
  agentImage: string;
  team?: "Red" | "Blue";
};
