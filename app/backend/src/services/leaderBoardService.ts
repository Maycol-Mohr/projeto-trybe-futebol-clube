// import TeamModel from '../database/models/TeamModel';
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

// const getLeaderboardClassification = async () => {
//   const teams = await MatchRepository.getLeaderboardClassification();
//   return teams;
// };

export default { getHomeClassification, getAwayClassification };
