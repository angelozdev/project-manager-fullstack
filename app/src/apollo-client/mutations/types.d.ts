type LoginData = {
  logIn: {
    accessToken: string;
    name: string;
    email: string;
    _id: string;
  };
};

type LoginVars = {
  data: {
    email: string;
    password: string;
  };
};

type SignUpData = {
  SignUp: {
    name: string;
  };
};

type SignUpVars = {
  data: {
    name: string;
    email: string;
    password: string;
  };
};

type CreateProjectData = {
  createProject: {
    name: string;
    _id: string;
  };
};

type CreateProjectVars = {
  name: string;
};

type CreateTaskData = {
  createTask: {
    name: string;
    _id: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    project: { _id: string };
  };
};

type CreateTaskVars = {
  newTask: {
    name: string;
    project: string;
    completed: boolean;
  };
};

type UpdateTaskData = {
  updateTask: {
    name: string;
    _id: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    project: { _id: string };
  };
};

type UpdateTaskVars = {
  updatedTask: {
    name?: string;
    completed?: boolean;
  };
  taskId: string;
};
