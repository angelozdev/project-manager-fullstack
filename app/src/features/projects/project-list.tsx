import React from "react";
import { FlatList, View } from "native-base";

// components
import CreateProjectForm from "./create-project-form";

// hooks
import useGetProjects from "./use-get-projects";
import ProjectItem from "./project-item";

export default function ProjectList() {
  const { data } = useGetProjects();

  return (
    <View>
      <FlatList
        data={data?.getMyProjects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProjectItem _id={item._id} name={item.name} />
        )}
        ListHeaderComponent={CreateProjectForm}
      />
    </View>
  );
}
