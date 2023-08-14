import dayjs from "dayjs";
import { RefreshTokensRepository } from "../typeorm/repositories/refresh-tokens-repository";
import auth from "../../../shared/config/auth";

interface IGenerateRefreshToken {
  user_id: number;
  previous_token?: string;
}

class GenerateRefreshTokenProvider {
  async execute({
    user_id,
    previous_token,
  }: IGenerateRefreshToken): Promise<string> {
    const expiresInDays = Number(auth.refresh.expiresIn);

    const expiresIn = dayjs().add(expiresInDays, "days").toDate();

    const refreshTokensRepository = new RefreshTokensRepository();

    const refreshToken = await refreshTokensRepository.create({
      user_id,
      expires_in: expiresIn,
      previous_token,
    });

    return refreshToken.refresh_token;
  }
}

export { GenerateRefreshTokenProvider };
