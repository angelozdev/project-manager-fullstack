import { useQuery } from "@apollo/client";
import { queries } from "@apollo-client";
import { toasts } from "@utils";

function useGetTasksByProjectId(projectId: string) {
  const query = useQuery<GetTasksByProjectIdData, GetTasksByProjectIdVars>(
    queries.tasks.GET_TASKS_BY_PROJECT_ID,
    {
      onError: (error) => {
        toasts.onError(error.message);
      },
      variables: { projectId },
    }
  );

  return query;
}

export default useGetTasksByProjectId;
