import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { IMatchCredentials } from '../interfaces/imatch';

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

export const saveMatch = async (match: IMatchCredentials) => {
  const newMatch = await MatchModel.create({ ...match, inProgress: true });
  return newMatch;
};

export const finishMatch = async (id: number) => {
  await MatchModel.update({ inProgress: false }, { where: { id } });
};
