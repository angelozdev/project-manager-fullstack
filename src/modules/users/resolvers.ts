import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { LogAccess } from "../../middlewares";
import { LogInArgs } from "./arguments";
import { NewUserInput } from "./inputs";
import UserModel, { UserWithToken, User } from "./model";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("data") { email, name, password }: NewUserInput) {
    const user = new UserModel();
    user.email = email;
    user.password = await user.hashPassword(password);
    user.name = name;

    const createdUser = await user.save();
    return createdUser;
  }

  @UseMiddleware(LogAccess)
  @Query(() => UserWithToken)
  async logIn(@Args() { email, password }: LogInArgs) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    const isValid = await user.comparePassword(password);
    if (!isValid) throw new Error("Invalid password");

    const accessToken = user.generateJWT();
    return Object.assign(user, { accessToken });
  }
}

export default UserResolver;
