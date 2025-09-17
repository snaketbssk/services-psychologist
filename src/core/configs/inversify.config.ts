import { AuthService } from '@/core/services/AuthService'
import { CoffeeService } from '@/core/services/CoffeeService'
import { IAuthService } from '@/core/services/IAuthService'
import { ICoffeeService } from '@/core/services/ICoffeeService'
import { LoggerService } from '@/core/services/LoggerService'
import { Container } from 'inversify'
import { ILoggerService } from '../services/ILoggerService'
import TYPES from '../types/type'

const container = new Container()

container.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope()
container.bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope()
container.bind<ICoffeeService>(TYPES.CoffeeService).to(CoffeeService).inSingletonScope()

export { container }
