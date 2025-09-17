import { inject, injectable } from 'inversify'
import { ICoffeeService } from './ICoffeeService'
import { LoggerService } from './LoggerService'

@injectable()
export class CoffeeService implements ICoffeeService {
  constructor(@inject(LoggerService) private logger: LoggerService) {}

  makeCoffee(): string {
    this.logger.log('Making coffee...')
    return 'Here is your ☕ coffee!'
  }
}
