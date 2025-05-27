import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";

import { LoginRequest, LoginResponse } from "@/application/auth/auth.dto";
import { AuthService } from "@/application/auth/auth.service";

@JsonController("/auth")
@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  @OpenAPI({ summary: "Authenticate user and retrieve a JWT" })
  @ResponseSchema(LoginResponse)
  public login(@Body() request: LoginRequest): LoginResponse {
    return {
      jwt: this.authService.getToken(),
    };
  }
}
