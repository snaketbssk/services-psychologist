import { injectable } from 'inversify'
import { ILoggerService } from './ILoggerService'

@injectable()
export class LoggerService implements ILoggerService {
  random: number
  constructor() {
    this.random = Math.random()
  }

  log(message: string) {
    console.log(`[Logger]: ${message} random number: ${this.random}`)
  }
}
