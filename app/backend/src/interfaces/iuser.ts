export interface UserBody {
  email: string;
  password: string;
}

export interface UserCredentials extends UserBody {
  username: string;
  role: string;
}

export interface User extends UserCredentials {
  id: number;
}
