export interface IAuthService {
  login(username: string, password: string): { token: string }
}
