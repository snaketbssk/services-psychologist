import { inject, injectable } from 'inversify'
import TYPES from '../types/type'
import { IAuthService } from './IAuthService'
import type { ILoggerService } from './ILoggerService'

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(username: string, password: string) {
    this.logger.log(`User ${username} logged in`)
    return { token: 'fake-jwt-token' }
  }
}
