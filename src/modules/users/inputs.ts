import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Create new user" })
export class NewUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Length(2, 20)
  @Field(() => String)
  name: string;

  @Length(5, 20)
  @Field(() => String)
  password: string;
}
