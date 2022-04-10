type GetProjectsData = {
  getMyProjects: {
    name: string;
    _id: string;
    author: IUser;
  }[];
};

type GetTasksByProjectIdData = {
  getTasksByProjectId: {
    name: string;
    completed: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    project: { _id: string };
  }[];
};

type GetTasksByProjectIdVars = {
  projectId: string;
};
