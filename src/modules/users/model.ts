import { Field, ObjectType } from "type-graphql";
import { Types } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

@ObjectType()
export class User {
  @Field(() => String)
  readonly _id: Types.ObjectId;

  @prop({ required: true, trim: true, unique: true })
  @Field(() => String)
  email: string;

  @prop({ required: true, trim: true })
  @Field(() => String)
  name: string;

  @prop({ required: true, trim: true })
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
  options: { customName: "User" },
});

export default UserModel;
