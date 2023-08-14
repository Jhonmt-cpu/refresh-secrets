import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refresh-token.use-case";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = new RefreshTokenUseCase();

    const tokens = await refreshTokenUseCase.execute(refresh_token);

    return response.status(200).json(tokens);
  }
}

export { RefreshTokenController };
