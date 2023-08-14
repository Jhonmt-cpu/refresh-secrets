import { sign } from "jsonwebtoken";
import auth from "../../../shared/config/auth";


class GenerateTokenProvider {
  execute(userId: number): string {
    const token = sign({}, auth.jwt.secret, {
      subject: String(userId),
      expiresIn: auth.jwt.expiresIn
    });

    return token;
  }
}

export { GenerateTokenProvider };
