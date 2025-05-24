import { Body, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";

import { LoginRequest, LoginResponse } from "@/application/auth/auth.dto";
import { AuthService } from "@/application/auth/auth.service";

@JsonController("/auth")
@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  public login(@Body() request: LoginRequest): LoginResponse {
    return {
      jwt: this.authService.getToken(),
    };
  }
}
