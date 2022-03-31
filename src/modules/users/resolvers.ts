import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { LogInArgs } from "./arguments";
import { NewUserInput } from "./inputs";
import UserModel, { User } from "./model";

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

  @Query(() => User)
  async logIn(@Args() { email, password }: LogInArgs) {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) throw new Error("User not found");
    const isValid = await user.comparePassword(password);
    if (!isValid) throw new Error("Invalid password");
    return user;
  }
}

export default UserResolver;
