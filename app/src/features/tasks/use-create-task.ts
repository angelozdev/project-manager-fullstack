import { mutations, queries } from "@apollo-client";
import { useMutation } from "@apollo/client";
import { toasts } from "@utils";

function useCreateTask(newTask: CreateTaskVars["newTask"]) {
  const mutation = useMutation<CreateTaskData, CreateTaskVars>(
    mutations.tasks.CREATE_TASK,
    {
      variables: { newTask },
      onError: (error) => {
        toasts.onError(error.message);
      },
      update: (cache, { data }) => {
        const { getTasksByProjectId = [] } =
          cache.readQuery<GetTasksByProjectIdData, GetTasksByProjectIdVars>({
            query: queries.tasks.GET_TASKS_BY_PROJECT_ID,
            variables: { projectId: newTask.project },
          }) || {};

        if (!data?.createTask) return;

        cache.writeQuery<GetTasksByProjectIdData, GetTasksByProjectIdVars>({
          query: queries.tasks.GET_TASKS_BY_PROJECT_ID,
          variables: { projectId: newTask.project },
          data: {
            getTasksByProjectId: [...getTasksByProjectId, data.createTask],
          },
        });
      },
    }
  );

  return mutation;
}

export default useCreateTask;
