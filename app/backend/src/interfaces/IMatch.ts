export interface IMatchCredentials {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IMatch {
  id: number,
  inProgress: boolean,
}
