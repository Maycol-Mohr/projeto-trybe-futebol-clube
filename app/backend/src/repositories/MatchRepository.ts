import { QueryTypes } from 'sequelize';
import { sequelize } from '../database/config/connection';
import LeaderBoard from '../classes/LeaderBoardClass';

const QUERY_MATCHES_HOME_SCORE = `SELECT team.team_name AS name,
    SUM(IF(math.home_team_goals > math.away_team_goals, 1,0) * 3
    + IF(math.home_team_goals = math.away_team_goals, 1,0)) AS totalPoints,
    COUNT(math.home_team_id) AS totalGames,
    SUM(IF(math.home_team_goals > math.away_team_goals, 1,0)) AS totalVictories,
    SUM(IF(math.home_team_goals = math.away_team_goals, 1,0)) AS totalDraws,
    SUM(IF(math.home_team_goals < math.away_team_goals, 1,0)) AS totalLosses,
    SUM(math.home_team_goals) AS goalsFavor,
    SUM(math.away_team_goals) AS goalsOwn,
    SUM(math.home_team_goals - math.away_team_goals) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.matches AS math 
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS team 
    ON math.home_team_id = team.id
    WHERE math.in_progress = 0
    GROUP BY team.team_name
    ORDER By totalPoints DESC, 
    totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC`;

const QUERY_MATCHES_AWAY_SCORE = `SELECT team.team_name AS name,
    SUM(IF(math.away_team_goals > math.home_team_goals, 1,0) * 3
    + IF(math.away_team_goals = math.home_team_goals, 1,0)) AS totalPoints,
    COUNT(math.away_team_id) AS totalGames,
    SUM(IF(math.away_team_goals > math.home_team_goals, 1,0)) AS totalVictories,
    SUM(IF(math.away_team_goals = math.home_team_goals, 1,0)) AS totalDraws,
    SUM(IF(math.away_team_goals < math.home_team_goals, 1,0)) AS totalLosses,
    SUM(math.away_team_goals) AS goalsFavor,
    SUM(math.home_team_goals) AS goalsOwn,
    SUM(math.away_team_goals - math.home_team_goals) AS goalsBalance
    FROM TRYBE_FUTEBOL_CLUBE.matches AS math 
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS team 
    ON math.away_team_id = team.id
    WHERE math.in_progress = 0
    GROUP BY team.team_name
    ORDER By totalPoints DESC, 
    totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC`;

const getHomeScore = async () => {
  const scores = await sequelize.query(
    QUERY_MATCHES_HOME_SCORE,
    { raw: true, type: QueryTypes.SELECT },
  ) as LeaderBoard[];

  return scores.map((score: LeaderBoard) => {
    const newScore = { ...score };
    newScore.efficiency = ((newScore.totalPoints / (newScore.totalGames * 3)) * 100).toFixed(2);
    return newScore;
  });
};

const getAwayScore = async () => {
  const scores = await sequelize.query(
    QUERY_MATCHES_AWAY_SCORE,
    { raw: true, type: QueryTypes.SELECT },
  ) as LeaderBoard[];

  return scores.map((scoreAway: LeaderBoard) => {
    const newScore = { ...scoreAway };
    newScore.efficiency = ((newScore.totalPoints / (newScore.totalGames * 3)) * 100).toFixed(2);
    return newScore;
  });
};

export default { getHomeScore, getAwayScore };
