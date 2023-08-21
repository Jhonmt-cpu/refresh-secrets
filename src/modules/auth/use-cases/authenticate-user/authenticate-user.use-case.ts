import { compare } from "bcryptjs";
import { AppError } from "../../../../shared/errors/app-error";
import { GenerateTokenProvider } from "../../providers/generate-token.provider";
import { UsersRepository } from "../../../users/typeorm/repositories/users.repository";
import { GenerateRefreshTokenProvider } from "../../providers/generate-refresh-token.provider";
import { RefreshTokensRepository } from "../../typeorm/repositories/refresh-tokens-repository";
import { redisSet } from "../../../../shared/config/redis";

class AuthenticateUserUseCase {
  async execute({email, password}: AuthenticateUserDTO) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect.');
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

    const refreshTokensRepository = new RefreshTokensRepository();

    const token = generateTokenProvider.execute(user.user_id);

    const refresh_token = generateRefreshTokenProvider.execute({
      user_id: user.user_id,
    });

    await refreshTokensRepository.deleteAllByUserId(user.user_id)

    await refreshTokensRepository.create(refresh_token)

    const expiresInSeconds = Number(process.env.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60;

    await redisSet(refresh_token.refresh_token, user.user_id.toString(), expiresInSeconds);

    return {
      name: user.name,
      email: user.email,
      token,
      refresh_token: refresh_token.refresh_token,
    }
  }
}

export { AuthenticateUserUseCase };
