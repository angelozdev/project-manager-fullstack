import { Field, ID, ObjectType } from "type-graphql";
import { Types } from "mongoose";
import { getModelForClass, Prop } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { JWT } from "../../utils";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
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

  generateJWT(): string {
    return JWT.generateJWT(
      {
        _id: this._id,
        email: this.email,
        name: this.name,
      },
      "5m"
    );
  }

  generateRefreshToken(): string {
    return JWT.generateJWT(
      {
        _id: this._id,
      },
      "1d"
    );
  }
}

@ObjectType()
export class UserWithToken extends User {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class AccessToken {
  @Field(() => String)
  accessToken: string;
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
  options: { customName: "User" },
});

export default UserModel;
