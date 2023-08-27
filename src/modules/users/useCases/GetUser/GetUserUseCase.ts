import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class GetUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: number) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}

export { GetUserUseCase };
