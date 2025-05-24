import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export interface LoginResponse {
  jwt: string;
}
