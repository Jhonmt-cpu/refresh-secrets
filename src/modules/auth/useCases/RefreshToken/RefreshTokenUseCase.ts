import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { RefreshTokenEntity } from '../../infra/typeorm/entities/RefreshTokenEntity';
import { IRefreshTokensRepository } from '../../repositories/IRefreshTokensRepository';
import { ITokenCacheProvider } from '../../../../shared/container/providers/TokenCacheProvider/ITokenCacheProvider';
import { IGenerateTokenProvider } from '../../providers/GenerateTokenProvider/IGenerateTokenProvider';
import { IGenerateRefreshTokenProvider } from '../../providers/GenerateRefreshTokenProvider/IGenerateRefreshTokenProvider';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('TokenCacheProvider')
    private tokenCacheProvider: ITokenCacheProvider,
    @inject('GenerateTokenProvider')
    private generateTokenProvider: IGenerateTokenProvider,
    @inject('GenerateRefreshTokenProvider')
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
  ) {}

  async execute(refreshToken: string) {
    const refreshTokenExists = await this.tokenCacheProvider.get(refreshToken);

    if (!refreshTokenExists) {
      throw new AppError('Refresh token invalid.');
    }

    const userId = Number(refreshTokenExists);

    const refresh_token =
      this.generateRefreshTokenProvider.generateRefreshToken(userId);

    this.insertNewToken(refresh_token, refreshToken);

    await this.tokenCacheProvider.del(refreshToken);

    const expiresInDays = Number(process.env.JWT_REFRESH_EXPIRES_IN);

    await this.tokenCacheProvider.set({
      key: refresh_token.refresh_token,
      value: userId.toString(),
      expireTime: expiresInDays * 24 * 60 * 60,
    });

    const token = this.generateTokenProvider.generateToken(userId);

    return {
      token,
      refresh_token: refresh_token.refresh_token,
    };
  }

  async insertNewToken(refreshToken: RefreshTokenEntity, token: string) {
    await this.refreshTokensRepository.create(refreshToken);

    this.refreshTokensRepository.updateNextToken({
      refresh_token: token,
      next_token: refreshToken.refresh_token,
    });
  }
}

export { RefreshTokenUseCase };
