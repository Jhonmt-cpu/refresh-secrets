import dayjs from "dayjs";
import { AppError } from "../../../../shared/errors/app-error";
import { RefreshTokensRepository } from "../../typeorm/repositories/refresh-tokens-repository";
import { GenerateRefreshTokenProvider } from "../../providers/generate-refresh-token.provider";
import { GenerateTokenProvider } from "../../providers/generate-token.provider";

class RefreshTokenUseCase {
  async execute(refreshToken: string) {
    const refreshTokenRepository = new RefreshTokensRepository();

    const refreshTokenExists = await refreshTokenRepository.findById(refreshToken);

    console.log(refreshTokenExists);

    if (!refreshTokenExists) {
      throw new AppError('Refresh token invalid.');
    }

    const expiredToken = refreshTokenExists.expires_in < dayjs().toDate();

    if (expiredToken) {
      await refreshTokenRepository.deleteAllByUserId(refreshTokenExists.user_id);
      throw new AppError('Refresh token expired.');
    }

    const tokenAlreadyUsed = await refreshTokenRepository.findByPreviousToken(refreshToken);

    if (tokenAlreadyUsed) {
      await refreshTokenRepository.deleteAllByUserId(refreshTokenExists.user_id);
      throw new AppError('Refresh token already used.');
    }

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

    const generateTokenProvider = new GenerateTokenProvider();

    const refresh_token = await generateRefreshTokenProvider.execute({
      user_id: refreshTokenExists.user_id,
      previous_token: refreshToken,
    });

    const token = generateTokenProvider.execute(refreshTokenExists.user_id);

    return {
      token,
      refresh_token,
    }
  }
}

export { RefreshTokenUseCase };
