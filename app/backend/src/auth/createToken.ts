import * as jwt from 'jsonwebtoken';
// import IToken from '../interfaces/itoken';
import { UserBody } from '../interfaces/iuser';
import jwtConfig from '../middlewares/jwtConfig';

require('dotenv/config');

const secret = process.env.JWT_SECRET;

export default (user: UserBody) => {
  const token = jwt.sign({ ...user }, secret as jwt.Secret, jwtConfig);
  return token;
};
