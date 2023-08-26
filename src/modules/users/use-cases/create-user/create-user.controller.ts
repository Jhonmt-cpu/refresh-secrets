import { Request, Response } from 'express';
import { CreateUserUseCase } from './create-user.use-case';
import { instanceToPlain } from 'class-transformer';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({ name, email, password });

    return response.status(201).json(instanceToPlain(user));
  }
}

export { CreateUserController };
