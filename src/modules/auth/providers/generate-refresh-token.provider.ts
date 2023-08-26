import dayjs from 'dayjs';
import auth from '../../../shared/config/auth';
import { RefreshTokenEntity } from '../typeorm/entities/refresh-token.entity';

interface IGenerateRefreshToken {
  user_id: number;
}

class GenerateRefreshTokenProvider {
  execute({ user_id }: IGenerateRefreshToken): RefreshTokenEntity {
    const expiresInDays = Number(auth.refresh.expiresIn);

    const expiresIn = dayjs().add(expiresInDays, 'days').toDate();

    const refreshToken = new RefreshTokenEntity();

    Object.assign(refreshToken, {
      user_id,
      expires_in: expiresIn,
    });

    return refreshToken;
  }
}

export { GenerateRefreshTokenProvider };
