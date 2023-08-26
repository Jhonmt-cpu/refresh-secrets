import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({ email, password });

    return response.status(200).json(token);
  }
}

export { AuthenticateUserController };
