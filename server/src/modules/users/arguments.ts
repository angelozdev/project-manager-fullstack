import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LogInInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Length(6, 255)
  @Field(() => String)
  password: string;
}
