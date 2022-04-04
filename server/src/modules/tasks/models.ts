import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Types } from "mongoose";
import { Project } from "../projects";
import { User } from "../users";

@ObjectType()
export class Task {
  @Field(() => ID)
  readonly _id: string;

  @Field(() => String)
  @Prop({ required: true, trim: true })
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Boolean)
  @Prop({ default: false })
  completed?: boolean;

  @Field(() => Project)
  @Prop({ required: true, ref: "Project" })
  project: Types.ObjectId;

  @Field(() => User)
  @Prop({ required: true, ref: "User" })
  author: Types.ObjectId;
}

const TaskModel = getModelForClass(Task, {
  schemaOptions: { timestamps: true },
});

export default TaskModel;
