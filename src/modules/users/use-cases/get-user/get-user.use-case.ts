import { UsersRepository } from '../../typeorm/repositories/users.repository';

class GetUserUseCase {
  async execute(id: number) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}

export { GetUserUseCase };
