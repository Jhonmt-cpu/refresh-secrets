import { AppError } from "../../../../shared/errors/app-error";
import { RefreshTokensRepository } from "../../typeorm/repositories/refresh-tokens-repository";
import { GenerateRefreshTokenProvider } from "../../providers/generate-refresh-token.provider";
import { GenerateTokenProvider } from "../../providers/generate-token.provider";
import { redisDel, redisGet, redisSet } from "../../../../shared/config/redis";
import { RefreshTokenEntity } from "../../typeorm/entities/refresh-token.entity";

class RefreshTokenUseCase {
  refreshTokenRepository = new RefreshTokensRepository();

  async execute(refreshToken: string) {
    const refreshTokenExists = await redisGet(refreshToken);

    if (!refreshTokenExists) {
      throw new AppError('Refresh token invalid.');
    }

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

    const generateTokenProvider = new GenerateTokenProvider();

    const userId = Number(refreshTokenExists);

    const refresh_token = generateRefreshTokenProvider.execute({
      user_id: userId,
    });

    this.insertNewToken(refresh_token, refreshToken);

    await redisDel(refreshToken);

    const expiresInDays = Number(process.env.JWT_REFRESH_EXPIRES_IN);

    await redisSet(refresh_token.refresh_token, userId.toString(), expiresInDays * 24 * 60 * 60);

    const token = generateTokenProvider.execute(userId);

    return {
      token,
      refresh_token: refresh_token.refresh_token,
    }
  }

  async insertNewToken(refreshToken: RefreshTokenEntity, token: string) {
    await this.refreshTokenRepository.create(refreshToken);

    this.refreshTokenRepository.updateNextToken({
      refresh_token: token,
      next_token: refreshToken.refresh_token,
    });
  }
}

export { RefreshTokenUseCase };
