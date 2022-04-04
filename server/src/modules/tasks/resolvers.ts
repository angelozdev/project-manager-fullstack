import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { IsAuth } from "../../middlewares";
import { NewTaskInput, UpdateTaskInput } from "./inputs";
import TaskModel, { Task } from "./models";

@Resolver()
class TaskResolver {
  @UseMiddleware(IsAuth)
  @Query(() => [Task])
  async getTasksByProjectId(
    @Arg("projectId") projectId: string,
    @Ctx("userID") userID: string
  ) {
    const tasks = await TaskModel.find({ project: projectId, author: userID });
    return tasks;
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => Task)
  async createTask(
    @Arg("newTask") { name, project, completed = false }: NewTaskInput,
    @Ctx("userID") userID: string
  ) {
    const createdTask = await TaskModel.create({
      name,
      project,
      completed,
      author: userID,
    });

    const populatedTask = await createdTask.populate(["project", "author"]);
    return populatedTask;
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => Task)
  async updateTask(
    @Arg("taskId") taskId: string,
    @Arg("updatedTask") { name, completed }: UpdateTaskInput,
    @Ctx("userID") userID: string
  ) {
    const task = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        author: userID,
      },
      { name, completed },
      { new: true }
    );
    if (!task) throw new Error("Task not found");
    return task;
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => String)
  async deleteTask(
    @Arg("taskId") taskId: string,
    @Ctx("userID") userID: string
  ) {
    const task = await TaskModel.findOneAndDelete({
      _id: taskId,
      author: userID,
    });

    if (!task) throw new Error("Task not found");
    return task.id;
  }
}

export default TaskResolver;
