import { Service } from "typedi";

@Service()
export class AuthService {
  public getToken(): string {
    return "12345";
  }
}
