import { hash } from "bcryptjs";
import { CreateUserDTO } from "../../dtos/create-user.dto";
import { UsersRepository } from "../../typeorm/repositories/users.repository";
import { User } from "../../typeorm/entities/user.entity";
import { AppError } from "../../../../shared/errors/app-error";

class CreateUserUseCase {
  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const usersRepository = new UsersRepository();

    const userAlreadyExists = await usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = await usersRepository.createUser({ name, email, password: passwordHash });

    return user;
  }
}

export { CreateUserUseCase };
