import { sign } from 'jsonwebtoken';
import auth from '../../../shared/config/auth';
import { v4 as uuid } from 'uuid';

class GenerateTokenProvider {
  static jwtSecret = uuid();

  execute(userId: number): string {
    console.log(GenerateTokenProvider.jwtSecret);

    const token = sign({}, GenerateTokenProvider.jwtSecret, {
      subject: String(userId),
      expiresIn: auth.jwt.expiresIn,
    });

    return token;
  }
}

export { GenerateTokenProvider };
