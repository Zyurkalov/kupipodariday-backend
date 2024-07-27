import { PartialType } from "@nestjs/mapped-types";
import { SigninAuthDto } from "src/auth/dto/signin-auth.dto";

export class UserDto extends PartialType(SigninAuthDto) {}
