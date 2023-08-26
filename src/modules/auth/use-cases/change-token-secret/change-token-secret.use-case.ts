import { GenerateTokenProvider } from '../../providers/generate-token.provider';
import { v4 as uuid } from 'uuid';

class ChangeTokenSecretUseCase {
  async execute() {
    GenerateTokenProvider.jwtSecret = uuid();
  }
}

export { ChangeTokenSecretUseCase };
