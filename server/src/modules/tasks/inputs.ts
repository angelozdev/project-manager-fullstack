import { Field, InputType } from "type-graphql";

@InputType()
export class NewTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  project: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  completed?: boolean;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Boolean, { defaultValue: false, nullable: true })
  completed: boolean;
}
