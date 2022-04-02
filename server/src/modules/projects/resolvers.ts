import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { IContext } from "../../types";
import ProjectModel, { Project } from "./models";
import { IsAuth } from "../../middlewares";
import { UserModel } from "../users";

@Resolver()
class ProjectResolver {
  @UseMiddleware(IsAuth)
  @Query(() => [Project])
  async getMyProjects(
    @Ctx("userID") userID: IContext["userID"]
  ): Promise<Project[]> {
    const projects = await ProjectModel.find({ author: userID }).populate(
      "author"
    );
    if (!projects) throw new Error("Projects not found");
    return projects;
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => Project)
  async createProject(
    @Arg("name") name: string,
    @Ctx("userID") userID: IContext["userID"]
  ) {
    if (!userID) throw new Error("User not found");

    const user = await UserModel.findById(userID);
    if (!user) throw new Error("User not found");

    const project = await ProjectModel.create({ name, author: userID });
    return { ...project.toJSON(), author: user };
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Ctx("userID") userID: IContext["userID"]
  ) {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { id, author: userID },
      { name },
      { new: true }
    );

    if (!updatedProject) throw new Error("Project not found");
    return updatedProject;
  }
}

export default ProjectResolver;
