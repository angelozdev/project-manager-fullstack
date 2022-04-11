import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { LogAccess } from "../../middlewares";
import { JWT, Logger } from "../../utils";
import { LogInInput } from "./arguments";
import { NewUserInput } from "./inputs";
import UserModel, { UserWithToken, User, AccessToken } from "./model";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("data") { email, name, password }: NewUserInput) {
    const isAlreadyExist = await UserModel.findOne({ email });
    if (isAlreadyExist) throw new Error("User already exist");

    const user = new UserModel();
    user.email = email;
    user.password = await user.hashPassword(password);
    user.name = name;

    const createdUser = await user.save();
    return createdUser;
  }

  @UseMiddleware(LogAccess)
  @Mutation(() => UserWithToken)
  async logIn(@Arg("data") { email, password }: LogInInput) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    const isValid = await user.comparePassword(password);
    if (!isValid) throw new Error("Invalid password");

    const accessToken = user.generateJWT();
    const refreshToken = user.generateRefreshToken();
    return { ...user.toJSON(), accessToken, refreshToken };
  }

  @Query(() => AccessToken)
  async refreshToken(@Arg("refreshToken") refreshToken: string) {
    const { _id } = JWT.decodeJWT<{ _id: string }>(refreshToken);
    Logger.success("AccessToken", _id);
    const user = await UserModel.findById(_id);
    if (!user) throw new Error("User not found");

    const accessToken = user.generateJWT();
    return { accessToken };
  }
}

export default UserResolver;
