import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class LogInArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
