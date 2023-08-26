import { Request, Response } from 'express';
import { GetUserUseCase } from './get-user.use-case';
import { instanceToPlain } from 'class-transformer';

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = request.user;

    const getUserUseCase = new GetUserUseCase();

    const userFound = await getUserUseCase.execute(Number(user.id));

    return response.status(200).json(instanceToPlain(userFound));
  }
}

export { GetUserController };
