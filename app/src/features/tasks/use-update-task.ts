import { mutations, queries } from "@apollo-client";
import { useMutation } from "@apollo/client";
import { toasts } from "@utils";

function useUpdateTask() {
  const mutation = useMutation<UpdateTaskData, UpdateTaskVars>(
    mutations.tasks.UPDATE_TASK,
    {
      onError: (error) => {
        toasts.onError(error.message);
      },
      update: (cache, { data }) => {
        if (!data) return;

        const { getTasksByProjectId = [] } =
          cache.readQuery<GetTasksByProjectIdData>({
            query: queries.tasks.GET_TASKS_BY_PROJECT_ID,
            variables: { projectId: data.updateTask.project._id },
          }) || {};

        cache.writeQuery({
          query: queries.tasks.GET_TASKS_BY_PROJECT_ID,
          variables: { projectId: data.updateTask.project._id },
          data: {
            getTasksByProjectId: getTasksByProjectId.map((task) => {
              if (task._id === data.updateTask._id) {
                return data.updateTask;
              }

              return task;
            }),
          },
        });
      },
    }
  );

  return mutation;
}

export default useUpdateTask;
