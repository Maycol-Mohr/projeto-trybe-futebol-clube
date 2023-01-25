// import TeamModel from '../database/models/TeamModel';
import LeaderBoard from '../classes/LeaderBoardClass';
import MatchRepository from '../repositories/MatchRepository';
// import MatchModel from '../database/models/MatchModel';

const getHomeClassification = async () => {
  const teams = await MatchRepository.getHomeScore();
  return teams;
};

const getAwayClassification = async () => {
  const teams = await MatchRepository.getAwayScore();
  return teams;
};

const classification = (array: LeaderBoard[]) : LeaderBoard[] => array.sort((a, b) => {
  if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
  if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
  if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
  return b.goalsFavor - a.goalsFavor;
});

const sumClassifications = (arrayHomeScore: LeaderBoard[], arrayAwayScore: LeaderBoard[])
: LeaderBoard[] =>
  arrayHomeScore.map((home: LeaderBoard) => {
    const homeTeam = { ...home };
    const awayTeam = arrayAwayScore.find((away: LeaderBoard) => away.name === home.name);
    if (awayTeam) {
      homeTeam.totalPoints += awayTeam.totalPoints;
      homeTeam.totalGames += awayTeam.totalGames;
      homeTeam.totalVictories += awayTeam.totalVictories;
      homeTeam.totalDraws += awayTeam.totalDraws;
      homeTeam.totalLosses += awayTeam.totalLosses;
      homeTeam.goalsFavor += awayTeam.goalsFavor;
      homeTeam.goalsOwn += awayTeam.goalsOwn;
      homeTeam.goalsBalance += awayTeam.goalsBalance;
      homeTeam.efficiency = ((homeTeam.totalPoints
        / (homeTeam.totalGames * 3)) * 100).toFixed(2);
    }
    return homeTeam;
  });

const getLeaderboardClassification = async () => {
  const home = await MatchRepository.getHomeScore();
  const away = await MatchRepository.getAwayScore();
  const teams = classification(sumClassifications(home, away));
  return teams;
};

export default { getHomeClassification, getAwayClassification, getLeaderboardClassification };
