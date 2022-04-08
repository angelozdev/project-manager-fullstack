import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  NotContains,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType({ description: "Create new user" })
export class NewUserInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @Length(2, 20)
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Length(6, 20)
  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
