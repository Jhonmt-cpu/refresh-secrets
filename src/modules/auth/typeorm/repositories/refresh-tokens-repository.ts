import { IsNull, LessThan, MoreThan } from 'typeorm';
import { AppDataSource } from '../../../../shared/database/data-source';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

interface IUpdateNextToken {
  refresh_token: string;
  next_token: string;
}
class RefreshTokensRepository {
  private repository = AppDataSource.getRepository(RefreshTokenEntity);

  async findByUserIdAndToken(
    user_id: number,
    token: string,
  ): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.repository.findOne({
      where: { user_id, refresh_token: token },
    });

    return refreshToken;
  }

  async findById(refresh_token: string): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.repository.findOne({
      where: { refresh_token },
    });

    return refreshToken;
  }

  async create(refreshToken: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    await this.repository.insert(refreshToken);

    return refreshToken;
  }

  async updateNextToken({
    refresh_token,
    next_token,
  }: IUpdateNextToken): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(RefreshTokenEntity)
      .set({ next_token })
      .where('refresh_token = :refresh_token', { refresh_token })
      .execute();
  }

  async findLastUserTokens(): Promise<RefreshTokenEntity[]> {
    const refreshTokens = await this.repository.find({
      where: {
        next_token: IsNull(),
        expires_in: MoreThan(new Date()),
      },
    });

    return refreshTokens;
  }

  async deleteAllByUserId(user_id: number): Promise<void> {
    await this.repository.delete({ user_id });
  }

  async deleteExpiredTokens(): Promise<void> {
    await this.repository.delete({ expires_in: LessThan(new Date()) });
  }
}

export { RefreshTokensRepository };
