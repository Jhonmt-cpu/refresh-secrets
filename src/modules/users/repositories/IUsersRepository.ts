import { UserEntity } from '../infra/typeorm/entities/UserEntity';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(user_id: number): Promise<UserEntity | null>;
  createUser({ name, email, password }: ICreateUser): Promise<UserEntity>;
}

export { IUsersRepository, ICreateUser };
