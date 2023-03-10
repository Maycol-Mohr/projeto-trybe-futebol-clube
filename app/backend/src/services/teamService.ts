import TeamModel from '../database/models/TeamModel';

export const getTeams = async () => {
  const teams = await TeamModel.findAll();
  return teams;
};

export const getTeamId = async (id: number) => {
  const team = await TeamModel.findByPk(id);
  return team;
};
