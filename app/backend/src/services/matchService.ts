import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export const getMatches = async (inProgress: string | undefined) => {
  const matches = await MatchModel.findAll({
    include: [
      {
        model: Team,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });
  const filteredMatches = matches.filter((match) => inProgress === undefined
    || match.inProgress.toString() === inProgress);
  return filteredMatches;
};

export const saveMatch = async (id: number) => {
  const team = await MatchModel.findByPk(id);
  return team;
};
