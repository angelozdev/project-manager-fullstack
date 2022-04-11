import { mutations, queries } from "@apollo-client";
import { useMutation } from "@apollo/client";
import { toasts } from "@utils";

export default function useCreateProject(name: string) {
  const mutation = useMutation<CreateProjectData, CreateProjectVars>(
    mutations.projects.CREATE_PROJECT,
    {
      variables: { name },
      onError: (error) => {
        toasts.onError(error.message);
      },
      update: (cache, { data }) => {
        const { getMyProjects = [] } =
          cache.readQuery<GetProjectsData>({
            query: queries.projects.GET_PROJECTS,
          }) || {};

        if (!data) return;

        cache.writeQuery({
          query: queries.projects.GET_PROJECTS,
          data: {
            getMyProjects: [...getMyProjects, data.createProject],
          },
        });
      },
      onCompleted: ({ createProject }) => {
        toasts.onSuccess(`Project '${createProject.name}' created`);
      },
      optimisticResponse: {
        createProject: {
          _id: Math.random().toString(36).replace(/\./g, ""),
          name,
        },
      },
    }
  );

  return mutation;
}
