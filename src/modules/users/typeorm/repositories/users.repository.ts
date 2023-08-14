import { AppDataSource } from "../../../../shared/database/data-source";
import { User } from "../entities/user.entity";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class UsersRepository {
  private repository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  async findById(user_id: number): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { user_id }
    });

    return user;
  }

  async createUser({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.insert(user);

    return user;
  }
}

export { UsersRepository };
