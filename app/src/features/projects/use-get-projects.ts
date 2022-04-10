import { queries } from "@apollo-client";
import { useQuery } from "@apollo/client";
import { toasts } from "@utils";

function useGetProjects() {
  const query = useQuery<GetProjectsData>(queries.projects.GET_PROJECTS, {
    onError: () => {
      toasts.onError("Error fetching projects");
    },
  });

  return query;
}

export default useGetProjects;
