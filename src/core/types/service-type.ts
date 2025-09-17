import { IAuthService } from '../services/IAuthService'
import { ICoffeeService } from '../services/ICoffeeService'
import { ILoggerService } from '../services/ILoggerService'
import TYPES from './type'

export type ServiceType = {
  [TYPES.AuthService]: IAuthService
  [TYPES.CoffeeService]: ICoffeeService
  [TYPES.LoggerService]: ILoggerService
}
