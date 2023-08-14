import { AppDataSource } from "../../../../shared/database/data-source";
import { RefreshTokenEntity } from "../entities/refresh-token.entity";

interface ICreateRefreshToken {
  user_id: number;
  expires_in: Date;
  previous_token?: string;
}

class RefreshTokensRepository {
  private repository = AppDataSource.getRepository(RefreshTokenEntity);

  async findByUserIdAndToken(user_id: number, token: string): Promise<RefreshTokenEntity | null> {
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

  async findByPreviousToken(previous_token: string): Promise<RefreshTokenEntity | null> {
    const refreshToken = await this.repository.findOne({
      where: { previous_token },
    });

    return refreshToken;
  }

  async create({
    user_id,
    expires_in,
    previous_token,
  } : ICreateRefreshToken): Promise<RefreshTokenEntity> {
    const refreshToken = this.repository.create({
      user_id,
      expires_in,
      previous_token,
    });

    await this.repository.insert(refreshToken);

    return refreshToken;
  }

  async deleteAllByUserId(user_id: number): Promise<void> {
    await this.repository.delete({ user_id });
  }
}

export { RefreshTokensRepository };
