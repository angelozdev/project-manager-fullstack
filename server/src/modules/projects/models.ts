import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "../users";

@ObjectType()
export class Project {
  @Field(() => ID)
  readonly _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: "User" })
  @Field(() => User)
  author: Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, trim: true })
  name: String;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

const ProjectModel = getModelForClass(Project, {
  schemaOptions: { timestamps: true },
});

export default ProjectModel;
