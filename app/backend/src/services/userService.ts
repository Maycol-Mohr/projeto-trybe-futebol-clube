import { compareSync } from 'bcryptjs';
import { UserCredentials, User } from '../interfaces/iuser';
import createToken from '../auth/createToken';
import UserModel from '../database/models/UserModel';

export async function login(userCredentials: UserCredentials) {
  const user = await UserModel.findOne({ where: { email: userCredentials.email } });

  if (!user) {
    return { status: 401, error: { message: 'Incorrect email or password' } };
  }

  const compare = compareSync(userCredentials.password, user.password);

  if (!compare) {
    return { status: 401, error: { message: 'Incorrect email or password' } };
  }

  const token = createToken(user as User);

  return { status: 200, data: { token } };
}

export default login;
